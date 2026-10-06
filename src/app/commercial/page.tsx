"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { COMMERCIAL_PROPERTIES } from "@/data/mockData";
import { CommercialProperty } from "@/types";
import { CommercialCard } from "@/components/commercial/CommercialCard";
import { LocationIntelligenceFlow } from "@/components/commercial/LocationIntelligenceFlow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Briefcase,
  Store,
  Building2,
  Coffee,
  Car,
  Landmark,
  Activity,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  TrendingUp,
} from "lucide-react";

function CommercialPageContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "All";
  const initialLoc = searchParams.get("location") || "All";

  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialLoc);
  const [selectedFitout, setSelectedFitout] = useState<string>("All");

  const categories = [
    { label: "All Properties", value: "All" },
    { label: "High Street", value: "High Street Property", icon: Store },
    { label: "QSR & Café", value: "QSR Location", icon: Coffee },
    { label: "Grade A Office", value: "Grade A Office", icon: Building2 },
    { label: "Showrooms", value: "Showroom", icon: Car },
    { label: "Retail Spaces", value: "Retail Space", icon: Store },
    { label: "Commercial Buildings", value: "Commercial Building", icon: Building2 },
    { label: "Land Parcels", value: "Land Parcel", icon: Briefcase },
  ];

  const locations = [
    "All",
    "Indiranagar",
    "Koramangala",
    "Outer Ring Road",
    "Whitefield",
    "HSR Layout",
    "MG Road",
    "Devanahalli",
    "Sarjapur Road",
  ];

  const filtered = useMemo(() => {
    return COMMERCIAL_PROPERTIES.filter((p) => {
      if (selectedType !== "All" && p.commercialType !== selectedType) return false;
      if (selectedLocation !== "All" && !p.location.micromarket.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (selectedFitout !== "All" && p.fitoutStatus !== selectedFitout) return false;
      return true;
    });
  }, [selectedType, selectedLocation, selectedFitout]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. COMMERCIAL HERO SECTION */}
      <section className="relative py-24 sm:py-32 bg-[#070e1b] text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Commercial Real Estate"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Institutional Commercial & Brand Advisory
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white">
            Find the Right Location for Your Business
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From location identification to brand expansion, SSR Realty connects commercial properties with business opportunities.
          </p>

          {/* Primary Dual CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/landlords">
              <Button
                variant="gold"
                size="lg"
                className="px-8 font-bold shadow-lg shadow-amber-600/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                I Have a Property
              </Button>
            </Link>

            <Link href="/brands">
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-white border-white/20 bg-white/5 hover:bg-white/10 font-bold"
              >
                I Need a Location
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. COMMERCIAL PROPERTY EXPLORER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Available Commercial Assets
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing <strong>{filtered.length}</strong> spaces vetted for road frontage, electrical load, and footfall density
            </p>
          </div>

          {/* Location filter dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Location:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-900 font-bold"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedType(c.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === c.value
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Commercial Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <h3 className="text-lg font-bold text-slate-800">No properties matched this filter</h3>
            <p className="text-xs text-slate-500">Try switching category or viewing all locations.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedType("All");
                setSelectedLocation("All");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <CommercialCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 3. LOCATION INTELLIGENCE FLOW INTEGRATION */}
      <LocationIntelligenceFlow />
    </div>
  );
}

export default function CommercialPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading commercial platform...</div>}>
      <CommercialPageContent />
    </Suspense>
  );
}
