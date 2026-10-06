"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CommercialProperty } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EnquiryModal } from "@/components/forms/EnquiryModal";
import {
  MapPin,
  Maximize2,
  Car,
  Eye,
  Store,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export interface CommercialCardProps {
  property: CommercialProperty;
}

export const CommercialCard: React.FC<CommercialCardProps> = ({ property }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const detailsUrl = `/commercial/${property.slug}`;

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          <Image
            src={property.images[0] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <Badge variant="gold" size="sm" className="shadow-sm">
              {property.commercialType}
            </Badge>
            <Badge variant="navy" size="sm" className="bg-slate-950/90 backdrop-blur-sm">
              {property.fitoutStatus}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-lg backdrop-blur-sm flex items-center gap-1">
              <Eye className="w-3 h-3 text-emerald-400" />
              {property.visibilityScore}
            </span>
          </div>

          {/* Bottom Bar: Price & Rate */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
            <div>
              <span className="text-xl font-bold font-heading tracking-tight drop-shadow-md text-white">
                {property.priceDisplay}
              </span>
              {property.pricePerSqFt && (
                <span className="text-[11px] text-slate-200 ml-1.5 font-medium opacity-90">
                  (₹{property.pricePerSqFt}/sq.ft)
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-slate-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
              Footfall: {property.footfallDensity}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <Link href={detailsUrl} className="block group-hover:text-blue-600 transition-colors">
              <h3 className="text-base font-bold text-slate-900 leading-snug font-heading line-clamp-1">
                {property.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{property.location.micromarket}, {property.location.city}</span>
            </p>
          </div>

          {/* Commercial Specs Strip */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Carpet Area</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                {property.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Frontage</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5">
                {property.frontageFeet} ft road
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Parking</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Car className="w-3.5 h-3.5 text-blue-600" />
                {property.parkingSpaces} bays
              </span>
            </div>
          </div>

          {/* Suitable for Tags */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400">Suitable For</span>
            <div className="flex flex-wrap gap-1">
              {property.suitableFor.slice(0, 4).map((brandType, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {brandType}
                </span>
              ))}
              {property.suitableFor.length > 4 && (
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  +{property.suitableFor.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEnquiryOpen(true)}
              className="flex-1 text-xs py-2 font-medium"
            >
              Express Interest
            </Button>
            <Link href={detailsUrl} className="flex-1">
              <Button
                variant="dark"
                size="sm"
                className="w-full text-xs py-2 font-semibold"
                rightIcon={<ArrowRight className="w-3 h-3" />}
              >
                View Asset
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCategory="commercial"
        propertyTitle={property.title}
        propertyId={property.id}
      />
    </>
  );
};
