import React from "react";
import Link from "next/link";
import { COMMERCIAL_PROPERTIES } from "@/data/mockData";
import { CommercialCard } from "@/components/commercial/CommercialCard";
import { ArrowRight, Store, Building2, Coffee, Sparkles } from "lucide-react";

export const CommercialSpotlight: React.FC = () => {
  const featuredCommercial = COMMERCIAL_PROPERTIES.slice(0, 4);

  const categories = [
    { label: "Retail Spaces", count: "12 Spaces", href: "/commercial?type=Retail+Space" },
    { label: "QSR Locations", count: "8 Locations", href: "/commercial?type=QSR+Location" },
    { label: "Office Spaces", count: "14 Tech Parks", href: "/commercial?type=Grade+A+Office" },
    { label: "Showrooms", count: "6 Sites", href: "/commercial?type=Showroom" },
    { label: "High Street", count: "9 Assets", href: "/commercial?type=High+Street+Property" },
    { label: "Commercial Buildings", count: "5 Buildings", href: "/commercial?type=Commercial+Building" },
    { label: "Land Parcels", count: "4 Parcels", href: "/commercial?type=Land+Parcel" },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Commercial & Brand Leasing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Strategic Commercial Spaces
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              High-visibility retail frontage, QSR hubs, and corporate workspaces ready for immediate fitout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/landlords"
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
            >
              List Commercial Property
            </Link>
            <Link
              href="/commercial"
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Commercial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Categories Pill Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
          {categories.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-colors text-xs flex items-center gap-2 group"
            >
              <span className="font-semibold text-slate-200 group-hover:text-white">
                {c.label}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                {c.count}
              </span>
            </Link>
          ))}
        </div>

        {/* Featured Commercial Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCommercial.map((property) => (
            <CommercialCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};
