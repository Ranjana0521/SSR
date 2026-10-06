"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Search,
  MapPin,
  Building2,
  DollarSign,
  Home,
  Briefcase,
  Store,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const HeroSearch: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "commercial">("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [configuration, setConfiguration] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "commercial") {
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (propertyType) params.append("type", propertyType);
      router.push(`/commercial?${params.toString()}`);
    } else {
      const params = new URLSearchParams();
      params.append("tx", activeTab === "buy" ? "Buy" : "Rent");
      if (location) params.append("location", location);
      if (propertyType) params.append("type", propertyType);
      if (configuration) params.append("bhk", configuration);
      if (budget) params.append("budget", budget);
      router.push(`/residential?${params.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Floating Search Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-4 sm:p-6 text-slate-800 transition-all">
        {/* Search Tab Switcher */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab("buy");
                setPropertyType("");
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "buy"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Buy Homes
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("rent");
                setPropertyType("");
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "rent"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Rent Luxury
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("commercial");
                setPropertyType("");
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "commercial"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Commercial & Brands
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <Link
              href="/landlords"
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium border border-slate-200 transition-colors flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5 text-blue-600" />
              I&apos;m a Landlord
            </Link>
            <Link
              href="/brands"
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium border border-amber-200 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              I&apos;m an Expanding Brand
            </Link>
          </div>
        </div>

        {/* Dynamic Search Fields Form */}
        <form onSubmit={handleSearch} className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Field 1: Location */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
            >
              <option value="">All Bengaluru</option>
              <option value="Whitefield">Whitefield</option>
              <option value="Sarjapur Road">Sarjapur Road</option>
              <option value="Electronic City">Electronic City</option>
              <option value="Hebbal">Hebbal & North BLR</option>
              <option value="Indiranagar">Indiranagar (100ft/12th Main)</option>
              <option value="Koramangala">Koramangala</option>
              <option value="HSR Layout">HSR Layout (27th Main)</option>
              <option value="Outer Ring Road">Outer Ring Road (ORR)</option>
              <option value="Devanahalli">Devanahalli Airport Zone</option>
            </select>
          </div>

          {/* Field 2: Property Type */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
            >
              {activeTab === "commercial" ? (
                <>
                  <option value="">All Commercial</option>
                  <option value="High Street Property">High Street Property</option>
                  <option value="QSR Location">QSR & Café Space</option>
                  <option value="Retail Space">Retail Store</option>
                  <option value="Grade A Office">Grade A Tech Park</option>
                  <option value="Showroom">Automobile Showroom</option>
                  <option value="Commercial Building">Commercial Building</option>
                  <option value="Land Parcel">Commercial Land</option>
                </>
              ) : (
                <>
                  <option value="">All Residential</option>
                  <option value="Apartment">Luxury Apartment</option>
                  <option value="Gated Villa">Gated Estate Villa</option>
                  <option value="Luxury Penthouse">Sky Penthouse</option>
                  <option value="Duplex">Terrace Duplex</option>
                </>
              )}
            </select>
          </div>

          {/* Field 3: Budget Range */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-blue-600" />
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
            >
              {activeTab === "commercial" ? (
                <>
                  <option value="">Any Commercial Rent</option>
                  <option value="under_500000">Under ₹5 Lakhs / mo</option>
                  <option value="500000_1500000">₹5 L - ₹15 Lakhs / mo</option>
                  <option value="1500000_above">₹15 Lakhs+ / mo</option>
                </>
              ) : activeTab === "rent" ? (
                <>
                  <option value="">Any Rental Budget</option>
                  <option value="under_50000">Under ₹50,000 / mo</option>
                  <option value="50000_150000">₹50,000 - ₹1.5 Lakhs / mo</option>
                  <option value="150000_above">₹1.5 Lakhs+ / mo (Ultra Luxury)</option>
                </>
              ) : (
                <>
                  <option value="">Any Purchase Budget</option>
                  <option value="under_15000000">Under ₹1.5 Cr</option>
                  <option value="15000000_30000000">₹1.5 Cr - ₹3.0 Cr</option>
                  <option value="30000000_60000000">₹3.0 Cr - ₹6.0 Cr</option>
                  <option value="60000000_above">₹6.0 Cr+ (Ultra HNI)</option>
                </>
              )}
            </select>
          </div>

          {/* Field 4: Configuration / Search CTA */}
          <div className="space-y-1.5 flex flex-col justify-end">
            {activeTab !== "commercial" ? (
              <>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 text-blue-600" />
                  Configuration
                </label>
                <div className="flex gap-2">
                  <select
                    value={configuration}
                    onChange={(e) => setConfiguration(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="">Any BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-4 py-2.5 shadow-md shadow-blue-600/30 font-semibold"
                    title="Search Properties"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Button
                type="submit"
                variant="gold"
                className="w-full py-3 shadow-md shadow-amber-600/30 font-semibold"
                rightIcon={<Search className="w-4 h-4" />}
              >
                Search Commercial
              </Button>
            )}
          </div>
        </form>

        {/* Mobile Secondary Entry Points */}
        <div className="flex md:hidden items-center justify-between gap-2 pt-4 mt-3 border-t border-slate-100 text-xs">
          <Link
            href="/landlords"
            className="flex-1 text-center py-2 rounded-xl bg-slate-50 text-slate-700 font-semibold border border-slate-200"
          >
            I&apos;m a Landlord
          </Link>
          <Link
            href="/brands"
            className="flex-1 text-center py-2 rounded-xl bg-amber-50 text-amber-900 font-semibold border border-amber-200"
          >
            I&apos;m an Expanding Brand
          </Link>
        </div>
      </div>
    </div>
  );
};
