"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMMERCIAL_PROPERTIES } from "@/data/mockData";
import { CommercialProperty, Lead } from "@/types";
import { saveLeadToStorage } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import {
  MapPin,
  ChevronRight,
  Maximize2,
  Car,
  Eye,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  PhoneCall,
  Clock,
  Shield,
  MessageCircle,
} from "lucide-react";

export function CommercialDetailsClient({ slug }: { slug: string }) {
  const property =
    COMMERCIAL_PROPERTIES.find((p) => p.slug === slug) ||
    COMMERCIAL_PROPERTIES[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCategory, setLeadCategory] = useState("Retail");
  const [leadNotes, setLeadNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [refCode, setRefCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadEmail) {
      alert("Please provide your name, phone number, and corporate email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `SSR-L-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        code,
        fullName: `${leadName} (${leadCompany || "Commercial Tenant"})`,
        email: leadEmail,
        phone: leadPhone,
        requirementType: "Commercial Lease",
        propertyCategory: "commercial",
        preferredLocations: [property.location.micromarket],
        targetBudget: { min: property.price, max: property.price, display: property.priceDisplay },
        configuration: `${property.commercialType} (${property.areaSqFt} sq.ft)`,
        propertyId: property.id,
        propertyTitle: property.title,
        source: "Commercial Landing",
        assignedTo: {
          id: "usr-2",
          name: "Ananya Iyer",
          email: "ananya.i@ssrrealty.com",
          role: "Commercial BDM Lead",
        },
        status: "NEW",
        timeline: "Next 30-45 days",
        notes: [
          {
            id: `n-${Date.now()}`,
            author: "Commercial Inquiry",
            content: `Brand/Company: ${leadCompany}. Category: ${leadCategory}. Details: ${leadNotes}`,
            createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
        ],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      saveLeadToStorage(newLead);
      setRefCode(code);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 700);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/commercial" className="hover:text-blue-600">Commercial</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="navy" size="md">{property.commercialType}</Badge>
              <Badge variant="gold" size="md">{property.fitoutStatus}</Badge>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                Visibility: {property.visibilityScore}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              {property.title}
            </h1>

            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>{property.location.address}</span>
            </p>
          </div>

          <div className="flex flex-col md:items-end space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              {property.priceDisplay}
            </div>
            {property.pricePerSqFt && (
              <span className="text-xs text-slate-500">
                (₹{property.pricePerSqFt}/sq.ft per month)
              </span>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl">
            <Image
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-28 h-18 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIndex === idx ? "border-blue-600 scale-105" : "border-transparent opacity-70"
                }`}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Commercial Specifications Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="p-2 space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Carpet Area</span>
            <div className="text-base font-bold text-slate-900">{property.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Road Frontage</span>
            <div className="text-base font-bold text-slate-900">{property.frontageFeet} Feet</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Ceiling Height</span>
            <div className="text-base font-bold text-slate-900">{property.ceilingHeightFeet} Feet Clear</div>
          </div>
          <div className="p-2 space-y-0.5 sm:border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Sanctioned Power</span>
            <div className="text-base font-bold text-slate-900">{property.powerLoadKva} kVA</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Customer Parking</span>
            <div className="text-base font-bold text-slate-900">{property.parkingSpaces} Bays</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Footfall Profile</span>
            <div className="text-base font-bold text-emerald-600">{property.footfallDensity}</div>
          </div>
        </div>

        {/* Two Columns: Left Details + Right Commercial Enquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Asset Profile & Commercial Potential
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {property.description}
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Site Highlights & Permissions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable Categories */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ideal Brand / Commercial Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {property.suitableFor.map((brand, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard Lease Terms */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Standard Commercial Lease Terms
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold">Lock-in Period</span>
                  <div className="text-base font-bold text-slate-900 mt-1">{property.lockInPeriodYears || 3} Years</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold">Security Deposit</span>
                  <div className="text-base font-bold text-slate-900 mt-1">{property.securityDepositMonths || 6} Months Rent</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold">Annual Escalation</span>
                  <div className="text-base font-bold text-slate-900 mt-1">{property.escalationPercent || 5}% per year</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Enquiry Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5 sticky top-24">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Commercial Leasing Desk
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-2">
                  Express Interest in this Location
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our dedicated Commercial BDM Lead.
                </p>
              </div>

              {submissionSuccess ? (
                <div className="py-6 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">LOI Inquiry Logged</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Our commercial leasing team will review your business parameters and share the site dossier.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                    <div className="text-slate-400 uppercase font-semibold text-[10px]">Reference Code</div>
                    <div className="font-mono font-bold text-slate-900 text-sm">{refCode}</div>
                    <div className="text-slate-500 pt-1">Commercial Lead: Ananya Iyer</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSubmissionSuccess(false)}
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <Input
                    label="Authorized Representative Name"
                    required
                    placeholder="e.g. Pooja Hegde"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />

                  <Input
                    label="Brand / Company Name"
                    required
                    placeholder="e.g. Third Wave Coffee / Retail Brand"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Contact Phone"
                      required
                      placeholder="+91 98200 44109"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                    />
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Category
                      </label>
                      <select
                        className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs"
                        value={leadCategory}
                        onChange={(e) => setLeadCategory(e.target.value)}
                      >
                        <option value="QSR / Café">QSR / Café</option>
                        <option value="Retail Fashion">Retail Fashion</option>
                        <option value="Bank / Wealth">Bank / Wealth</option>
                        <option value="Automobile / EV">Automobile / EV</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Other">Other Business</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Corporate Email"
                    required
                    type="email"
                    placeholder="expansion@brand.com"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                  />

                  <Textarea
                    label="Specific Requirements / Queries"
                    rows={2}
                    placeholder="Target opening timeline, required electrical load, frontage preference..."
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                  />

                  <div className="pt-2 space-y-2">
                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full py-3 font-semibold shadow-md shadow-amber-600/20"
                      isLoading={isSubmitting}
                    >
                      Request Commercial Dossier
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        const msg = encodeURIComponent(`Hi SSR Commercial Team, regarding commercial space: ${property.title} in ${property.location.micromarket}`);
                        window.open(`https://wa.me/919845018420?text=${msg}`, "_blank");
                      }}
                      className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      Direct WhatsApp with Commercial BDM
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
