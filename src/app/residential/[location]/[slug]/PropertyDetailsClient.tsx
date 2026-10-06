"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESIDENTIAL_PROPERTIES } from "@/data/mockData";
import { ResidentialProperty, Lead } from "@/types";
import { saveLeadToStorage, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  BedDouble,
  Maximize2,
  Calendar,
  Building,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Compass,
  PhoneCall,
  CalendarCheck,
  MessageCircle,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export function PropertyDetailsClient({ location, slug }: { location: string; slug: string }) {
  const property =
    RESIDENTIAL_PROPERTIES.find((p) => p.slug === slug || slugify(p.title) === slug) ||
    RESIDENTIAL_PROPERTIES[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);

  // Form states
  const [activeFormTab, setActiveFormTab] = useState<"callback" | "visit">("callback");
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadRequirement, setLeadRequirement] = useState(property.transactionType);
  const [leadBudget, setLeadBudget] = useState(property.priceDisplay);
  const [leadTimeline, setLeadTimeline] = useState("Immediate (30 days)");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("11:00 AM");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState("");

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadEmail) {
      alert("Please provide your name, phone number, and email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const refId = `SSR-L-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        code: refId,
        fullName: leadName,
        email: leadEmail,
        phone: leadPhone,
        requirementType: leadRequirement as any,
        propertyCategory: "residential",
        preferredLocations: [property.location.micromarket],
        targetBudget: { min: property.price, max: property.price, display: leadBudget },
        configuration: `${property.bhk} BHK (${property.areaSqFt} sq.ft)`,
        propertyId: property.id,
        propertyTitle: property.title,
        source: "Property Details Page",
        assignedTo: {
          id: "usr-1",
          name: "Rohit Malhotra",
          email: "rohit.m@ssrrealty.com",
          role: "Senior Residential Advisor",
        },
        status: activeFormTab === "visit" ? "SITE VISIT" : "NEW",
        timeline: leadTimeline,
        siteVisitDate: activeFormTab === "visit" ? `${visitDate} ${visitTime}` : undefined,
        notes: [
          {
            id: `n-${Date.now()}`,
            author: "System Intake",
            content:
              activeFormTab === "visit"
                ? `Requested Site Visit for ${visitDate} at ${visitTime}. Property: ${property.title}.`
                : `Requested Callback regarding ${property.title} with budget ${leadBudget}.`,
            createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
        ],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      saveLeadToStorage(newLead);
      setGeneratedRefId(refId);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 700);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello SSR Realty, I am interested in ${property.title} in ${property.location.micromarket} listed at ${property.priceDisplay}. Please connect me with an advisor.`
    );
    window.open(`https://wa.me/919845018420?text=${text}`, "_blank");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/residential" className="hover:text-blue-600">Residential</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/residential?location=${property.location.micromarket}`} className="hover:text-blue-600">
            {property.location.micromarket}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
        </nav>

        {/* 1. Header Information Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="navy" size="md">
                {property.propertyType}
              </Badge>
              <Badge variant="gold" size="md">
                {property.possession}
              </Badge>
              {property.reraId && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RERA: {property.reraId}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
              {property.title}
            </h1>

            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>{property.location.address}</span>
            </p>
          </div>

          {/* Right Header Actions & Price */}
          <div className="flex flex-col md:items-end space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                {property.priceDisplay}
              </span>
              {property.pricePerSqFt && (
                <span className="text-xs text-slate-500">
                  (₹{property.pricePerSqFt.toLocaleString("en-IN")}/sq.ft)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isSaved ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-600" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: property.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Property link copied to clipboard!");
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* 2. Large Image Gallery */}
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
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20">
              Image {activeImageIndex + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-28 h-18 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIndex === idx ? "border-blue-600 scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={imgUrl} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 3. Key Specifications Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="p-2 space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Configuration</span>
            <div className="text-base font-bold text-slate-900">{property.bhk} Bedrooms</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Super Area</span>
            <div className="text-base font-bold text-slate-900">{property.areaSqFt} sq.ft</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Carpet Area</span>
            <div className="text-base font-bold text-slate-900">{property.carpetAreaSqFt} sq.ft</div>
          </div>
          <div className="p-2 space-y-0.5 sm:border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Floor Level</span>
            <div className="text-base font-bold text-slate-900">{property.floor} of {property.totalFloors}</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Vastu Facing</span>
            <div className="text-base font-bold text-slate-900">{property.facing}</div>
          </div>
          <div className="p-2 space-y-0.5 border-l border-slate-100">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Furnishing</span>
            <div className="text-base font-bold text-slate-900">{property.furnishing}</div>
          </div>
        </div>

        {/* 4. Main Body: Left 2 Cols Overview + Right 1 Col Interactive Sticky Enquiry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: Property Details, Highlights, Amenities, Floor Plans, Location */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview & Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                About {property.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {property.description}
              </p>

              {/* Highlights List */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Residence Highlights
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
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  Lifestyle & Club Amenities
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {property.amenities.length} Features Included
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor Plans Viewer */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Architectural Layout & Floor Plans
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select a layout configuration to view area breakdown and schematics.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBrochureModalOpen(true)}
                  className="self-start text-xs font-semibold"
                  leftIcon={<Download className="w-3.5 h-3.5 text-blue-600" />}
                >
                  Download Brochure
                </Button>
              </div>

              {/* Plan Switcher Tabs */}
              <div className="flex gap-2">
                {property.floorPlans.map((plan, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFloorPlan(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedFloorPlan === idx
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {plan.bhk}
                  </button>
                ))}
              </div>

              {/* Active Floor Plan Details */}
              {property.floorPlans[selectedFloorPlan] && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Super Area</span>
                      <div className="text-sm font-bold text-slate-900">
                        {property.floorPlans[selectedFloorPlan].superBuiltUpArea} sq.ft
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Carpet Area</span>
                      <div className="text-sm font-bold text-slate-900">
                        {property.floorPlans[selectedFloorPlan].carpetArea} sq.ft
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Indicative Price</span>
                      <div className="text-sm font-bold text-blue-600">
                        {property.priceDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={property.floorPlans[selectedFloorPlan].image}
                      alt="Floor plan preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Neighborhood & Location Intelligence */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Neighborhood & Connectivity
              </h2>
              <p className="text-xs text-slate-500">
                Key distances from {property.title} to major tech parks, transit nodes, hospitals, and schools.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.nearbyPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-blue-600">
                        {place.category}
                      </span>
                      <div className="text-xs font-bold text-slate-800">{place.name}</div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Pedigree */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    Developer Partner
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mt-1">
                    {property.developer.name}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-base">
                  {property.developer.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reputed national developer with over {property.developer.totalProjects || 100}+ completed landmarks across India. Recognized for superior structural engineering, transparent documentation, and timely project delivery.
              </p>
            </div>
          </div>

          {/* RIGHT 1 COLUMN: IMPORTANT HIGHLY VISIBLE STICKY ENQUIRY CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6 sticky top-24">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Direct SSR Advisory
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-2">
                  Interested in this property?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect directly with our designated Whitefield property specialist.
                </p>
              </div>

              {submissionSuccess ? (
                <div className="py-6 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Enquiry Received</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Thank you for your interest. An SSR Realty advisor will contact you shortly.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                    <div className="text-slate-400 uppercase font-semibold text-[10px]">Reference Code</div>
                    <div className="font-mono font-bold text-slate-900 text-sm">{generatedRefId}</div>
                    <div className="text-slate-500 pt-1">Assigned: Rohit Malhotra (Residential Specialist)</div>
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
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {/* Tabs: Request Callback vs Schedule Site Visit */}
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveFormTab("callback")}
                      className={`py-2 rounded-lg transition-all ${
                        activeFormTab === "callback"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Request Callback
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFormTab("visit")}
                      className={`py-2 rounded-lg transition-all ${
                        activeFormTab === "visit"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Schedule Visit
                    </button>
                  </div>

                  <Input
                    label="Full Name"
                    required
                    placeholder="e.g. Aditya Verma"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />

                  <Input
                    label="Phone Number"
                    required
                    type="tel"
                    placeholder="+91 98450 18420"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                  />

                  <Input
                    label="Email Address"
                    required
                    type="email"
                    placeholder="aditya@example.com"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                  />

                  {activeFormTab === "visit" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Visit Date"
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                      />
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                          Time Slot
                        </label>
                        <select
                          className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs font-medium"
                          value={visitTime}
                          onChange={(e) => setVisitTime(e.target.value)}
                        >
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="02:30 PM">02:30 PM</option>
                          <option value="04:30 PM">04:30 PM</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Preferred Timeline
                      </label>
                      <select
                        className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-medium"
                        value={leadTimeline}
                        onChange={(e) => setLeadTimeline(e.target.value)}
                      >
                        <option value="Immediate (30 days)">Immediate (within 30 days)</option>
                        <option value="1-3 months">1 - 3 months</option>
                        <option value="3-6 months">3 - 6 months</option>
                        <option value="Exploring market">Just exploring</option>
                      </select>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-2 space-y-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3 font-semibold shadow-md shadow-blue-600/20"
                      isLoading={isSubmitting}
                    >
                      {activeFormTab === "visit" ? "Schedule Site Visit" : "Request a Callback"}
                    </Button>

                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      WhatsApp SSR Advisor
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Download Lead Modal */}
      <Modal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
        title={`Download ${property.title} Brochure`}
        description="Receive the comprehensive architectural e-brochure, master plan, and unit specifications instantly."
        maxWidth="md"
      >
        <div className="space-y-4">
          <Input label="Your Name" placeholder="e.g. Vikram Mehta" />
          <Input label="Phone Number (for instant WhatsApp PDF)" placeholder="+91 98765 43210" />
          <Input label="Email Address" placeholder="vikram@example.com" />
          <Button
            variant="gold"
            className="w-full"
            onClick={() => {
              alert("Brochure downloaded successfully! A copy has also been sent to your email.");
              setBrochureModalOpen(false);
            }}
          >
            Download PDF Brochure (12 MB)
          </Button>
        </div>
      </Modal>
    </div>
  );
}
