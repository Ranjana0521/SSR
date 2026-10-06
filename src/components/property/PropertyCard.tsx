"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResidentialProperty } from "@/types";
import { slugify, formatCurrencyINR, formatSqFt } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EnquiryModal } from "@/components/forms/EnquiryModal";
import {
  Heart,
  Scale,
  MapPin,
  BedDouble,
  Maximize2,
  Calendar,
  Building,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export interface PropertyCardProps {
  property: ResidentialProperty;
  onCompareToggle?: (property: ResidentialProperty) => void;
  isCompared?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onCompareToggle,
  isCompared = false,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const locationSlug = slugify(property.location.micromarket);
  const detailsUrl = `/residential/${locationSlug}/${property.slug}`;

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={property.images[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Gradient Overlay for badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.featured && (
              <Badge variant="gold" size="sm" className="shadow-sm">
                ★ FEATURED
              </Badge>
            )}
            <Badge variant="navy" size="sm" className="bg-slate-900/90 backdrop-blur-sm">
              {property.possession}
            </Badge>
          </div>

          {/* Top Right Action Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsSaved(!isSaved);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isSaved
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
              aria-label="Save property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
            </button>
            {onCompareToggle && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onCompareToggle(property);
                }}
                className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                  isCompared
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-black/40 text-white hover:bg-black/60"
                }`}
                aria-label="Compare property"
              >
                <Scale className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom Bar on Image: Price & Transaction */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
            <div>
              <span className="text-xl font-bold font-heading tracking-tight drop-shadow-md text-white">
                {property.priceDisplay}
              </span>
              {property.pricePerSqFt && (
                <span className="text-[11px] text-slate-200 ml-1.5 font-medium opacity-90">
                  (₹{property.pricePerSqFt.toLocaleString("en-IN")}/sq.ft)
                </span>
              )}
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            {/* Developer & RERA tag */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                {property.developer.name}
              </span>
              {property.reraId && (
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RERA Approved
                </span>
              )}
            </div>

            {/* Title */}
            <Link href={detailsUrl} className="block group-hover:text-blue-600 transition-colors">
              <h3 className="text-base font-bold text-slate-900 leading-snug font-heading line-clamp-1">
                {property.title}
              </h3>
            </Link>

            {/* Location */}
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{property.location.micromarket}, {property.location.city}</span>
            </p>
          </div>

          {/* Spec Strip */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Config</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <BedDouble className="w-3.5 h-3.5 text-blue-600" />
                {property.bhk} BHK
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Area</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                {property.areaSqFt} sq.ft
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Facing</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5">
                {property.facing}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEnquiryOpen(true)}
              className="flex-1 text-xs py-2 font-medium"
            >
              Quick Enquire
            </Button>
            <Link href={detailsUrl} className="flex-1">
              <Button
                variant="dark"
                size="sm"
                className="w-full text-xs py-2 font-semibold"
                rightIcon={<ArrowRight className="w-3 h-3" />}
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCategory="residential"
        propertyTitle={property.title}
        propertyId={property.id}
      />
    </>
  );
};
