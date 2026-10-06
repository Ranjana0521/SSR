"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { RESIDENTIAL_PROPERTIES } from "@/data/mockData";
import { ResidentialProperty } from "@/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Home,
  Check,
  RotateCcw,
  Scale,
} from "lucide-react";

function ResidentialListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filters state initialized from URL params if present
  const [selectedTx, setSelectedTx] = useState<string>(searchParams.get("tx") || "All");
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get("location") || "All");
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("type") || "All");
  const [selectedBhk, setSelectedBhk] = useState<string>(searchParams.get("bhk") || "All");
  const [selectedPossession, setSelectedPossession] = useState<string>(searchParams.get("possession") || "All");
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>("All");
  const [budgetRange, setBudgetRange] = useState<string>(searchParams.get("budget") || "All");
  const [selectedAmenity, setSelectedAmenity] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compare Drawer state
  const [comparedProperties, setComparedProperties] = useState<ResidentialProperty[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const locationsList = [
    "All",
    "Whitefield",
    "Sarjapur Road",
    "Electronic City",
    "Hebbal",
    "Yelahanka",
    "Indiranagar",
    "Koramangala",
    "HSR Layout",
    "Lavelle Road",
    "Hennur Road",
    "Devanahalli",
  ];

  const typesList = [
    "All",
    "Apartment",
    "Gated Villa",
    "Luxury Penthouse",
    "Duplex",
  ];

  const possessionList = [
    "All",
    "Ready to Move",
    "Under Construction",
    "New Launch",
  ];

  const bhkList = ["All", "2", "3", "4", "5"];

  const amenitiesList = [
    "All",
    "Rooftop Infinity Pool",
    "25,000 sq.ft Clubhouse",
    "Tennis & Squash Courts",
    "Private Heated Pool",
    "EV Fast Charging Bays",
  ];

  // Filtering logic
  const filteredProperties = useMemo(() => {
    return RESIDENTIAL_PROPERTIES.filter((p) => {
      // Transaction Type
      if (selectedTx !== "All" && p.transactionType.toLowerCase() !== selectedTx.toLowerCase()) {
        return false;
      }
      // Location
      if (selectedLocation !== "All" && !p.location.micromarket.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      // Property Type
      if (selectedType !== "All" && p.propertyType !== selectedType) {
        return false;
      }
      // BHK
      if (selectedBhk !== "All") {
        if (selectedBhk === "5" && p.bhk < 5) return false;
        if (selectedBhk !== "5" && p.bhk !== parseInt(selectedBhk)) return false;
      }
      // Possession
      if (selectedPossession !== "All" && p.possession !== selectedPossession) {
        return false;
      }
      // Furnishing
      if (selectedFurnishing !== "All" && p.furnishing !== selectedFurnishing) {
        return false;
      }
      // Amenity
      if (selectedAmenity !== "All" && !p.amenities.includes(selectedAmenity)) {
        return false;
      }
      // Budget range
      if (budgetRange === "under_15000000" && p.price > 15000000) return false;
      if (budgetRange === "15000000_30000000" && (p.price < 15000000 || p.price > 30000000)) return false;
      if (budgetRange === "30000000_60000000" && (p.price < 30000000 || p.price > 60000000)) return false;
      if (budgetRange === "60000000_above" && p.price < 60000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "newest") return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      // recommended default
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    selectedTx,
    selectedLocation,
    selectedType,
    selectedBhk,
    selectedPossession,
    selectedFurnishing,
    selectedAmenity,
    budgetRange,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedTx("All");
    setSelectedLocation("All");
    setSelectedType("All");
    setSelectedBhk("All");
    setSelectedPossession("All");
    setSelectedFurnishing("All");
    setBudgetRange("All");
    setSelectedAmenity("All");
    setSortBy("recommended");
  };

  const handleCompareToggle = (property: ResidentialProperty) => {
    if (comparedProperties.some((p) => p.id === property.id)) {
      setComparedProperties(comparedProperties.filter((p) => p.id !== property.id));
    } else {
      if (comparedProperties.length >= 3) {
        alert("You can compare up to 3 properties at once.");
        return;
      }
      setComparedProperties([...comparedProperties, property]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Residential Properties</span>
        </nav>

        {/* Page Heading & Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Explore Properties
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Showing <strong>{filteredProperties.length}</strong> verified luxury residences in Bengaluru
            </p>
          </div>

          {/* Sort Control & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters ({[selectedTx, selectedLocation, selectedType, selectedBhk].filter((v) => v !== "All").length})</span>
            </button>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300 shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content: Left Filter Sidebar + Right Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  Filter Properties
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Filter 1: Buy / Rent */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Purpose
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                  {["All", "Buy", "Rent"].map((tx) => (
                    <button
                      key={tx}
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className={`py-1.5 rounded-lg transition-all ${
                        selectedTx === tx
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tx}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Micro-market Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  {locationsList.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "All Micro-markets" : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter 3: Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  {typesList.map((t) => (
                    <option key={t} value={t}>
                      {t === "All" ? "All Property Types" : t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter 4: Bedrooms (BHK) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Bedrooms (BHK)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {bhkList.map((bhk) => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setSelectedBhk(bhk)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        selectedBhk === bhk
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {bhk === "All" ? "All" : `${bhk}${bhk === "5" ? "+" : ""}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 5: Budget Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Budget (INR)
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="All">Any Budget</option>
                  <option value="under_15000000">Under ₹1.5 Cr</option>
                  <option value="15000000_30000000">₹1.5 Cr - ₹3.0 Cr</option>
                  <option value="30000000_60000000">₹3.0 Cr - ₹6.0 Cr</option>
                  <option value="60000000_above">₹6.0 Cr+ (Ultra Luxury)</option>
                </select>
              </div>

              {/* Filter 6: Possession Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Possession Status
                </label>
                <select
                  value={selectedPossession}
                  onChange={(e) => setSelectedPossession(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  {possessionList.map((p) => (
                    <option key={p} value={p}>
                      {p === "All" ? "Any Possession" : p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter 7: Amenities */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Amenity
                </label>
                <select
                  value={selectedAmenity}
                  onChange={(e) => setSelectedAmenity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  {amenitiesList.map((a) => (
                    <option key={a} value={a}>
                      {a === "All" ? "Any Amenity" : a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* RIGHT PROPERTIES GRID */}
          <main className="lg:col-span-3 space-y-6">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-slate-400">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  No properties matched your criteria
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try widening your budget range or clearing micro-market filters to see more available residences.
                </p>
                <Button variant="primary" size="sm" onClick={resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onCompareToggle={handleCompareToggle}
                    isCompared={comparedProperties.some((p) => p.id === property.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-base font-bold text-slate-900">Filter Properties</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Purpose</label>
                <select
                  value={selectedTx}
                  onChange={(e) => setSelectedTx(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                >
                  <option value="All">All (Buy & Rent)</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                >
                  {locationsList.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                >
                  {typesList.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Bedrooms (BHK)</label>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                >
                  <option value="All">Any BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING COMPARE BAR IF PROPERTIES SELECTED */}
      {comparedProperties.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-3.5 flex items-center gap-4 border border-white/20 animate-slide-up">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>Comparing <strong>{comparedProperties.length}</strong> / 3 properties</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="gold"
              size="sm"
              onClick={() => setShowCompareModal(true)}
              className="text-xs font-semibold"
            >
              Compare Now
            </Button>
            <button
              onClick={() => setComparedProperties([])}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* COMPARE MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Compare Selected Properties
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparedProperties.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">{p.title}</h4>
                  <div className="text-base font-extrabold text-blue-600">{p.priceDisplay}</div>
                  <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                    <div><strong>Type:</strong> {p.propertyType}</div>
                    <div><strong>BHK:</strong> {p.bhk} BHK</div>
                    <div><strong>Area:</strong> {p.areaSqFt} sq.ft</div>
                    <div><strong>Location:</strong> {p.location.micromarket}</div>
                    <div><strong>Possession:</strong> {p.possession}</div>
                    <div><strong>Developer:</strong> {p.developer.name}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="dark" onClick={() => setShowCompareModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResidentialPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading residential portfolio...</div>}>
      <ResidentialListingContent />
    </Suspense>
  );
}
