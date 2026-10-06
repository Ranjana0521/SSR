"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveLeadToStorage } from "@/lib/utils";
import { Lead } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  Building2,
  Store,
  UploadCloud,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

export default function LandlordsPage() {
  const [formData, setFormData] = useState({
    landlordName: "",
    phone: "",
    email: "",
    location: "Indiranagar",
    address: "",
    googleMapsUrl: "",
    propertyType: "High Street Property",
    builtUpArea: "",
    carpetArea: "",
    expectedRent: "",
    leaseExpectation: "5 Years (3 Years Lock-in)",
    floor: "Ground Floor",
    frontageFeet: "",
    parkingBays: "",
    specialFeatures: "",
  });

  const [simulatedUploadedFiles, setSimulatedUploadedFiles] = useState<string[]>([
    "facade_elevation.jpg",
    "floor_layout.dwg",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.landlordName || !formData.phone || !formData.email || !formData.builtUpArea) {
      alert("Please fill in your name, contact details, and built-up area.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedCode = `SSR-LL-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        code: generatedCode,
        fullName: formData.landlordName,
        email: formData.email,
        phone: formData.phone,
        requirementType: "Landlord Listing",
        propertyCategory: "commercial",
        preferredLocations: [formData.location],
        targetBudget: {
          min: 0,
          max: 0,
          display: formData.expectedRent || "Rent on Request",
        },
        configuration: `${formData.propertyType} (${formData.builtUpArea} sq.ft, ${formData.frontageFeet}ft frontage)`,
        source: "Landlord Portal",
        assignedTo: {
          id: "usr-2",
          name: "Ananya Iyer",
          email: "ananya.i@ssrrealty.com",
          role: "Commercial BDM Lead",
        },
        status: "NEW",
        timeline: "Immediate",
        notes: [
          {
            id: `n-${Date.now()}`,
            author: "Landlord Asset Submission",
            content: `Address: ${formData.address}. Floor: ${formData.floor}. Lease: ${formData.leaseExpectation}. Features: ${formData.specialFeatures}`,
            createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
        ],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      saveLeadToStorage(newLead);
      setRefId(generatedCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Landlord Institutional Placement Network
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
            Have a Commercial Property?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            &ldquo;Let SSR Realty connect your property with the right business opportunity.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            From QSR chains like Starbucks & Third Wave to national retail brands and private banks — our network matches qualified brands directly to your commercial asset.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Institutional Tenants</h4>
              <p className="text-xs text-slate-500 mt-0.5">Top-credit national brands with long-term 5-9 year lease commitments.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Optimal Rental Yield</h4>
              <p className="text-xs text-slate-500 mt-0.5">Catchment and footfall valuation to unlock maximum market rent.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Zero Random Brokers</h4>
              <p className="text-xs text-slate-500 mt-0.5">Single-window point of contact with verified brand BDMs.</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {isSuccess ? (
            <div className="py-12 text-center space-y-6 animate-fade-in max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Property Opportunity Submitted
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you. The SSR Realty team will review your opportunity and contact you shortly.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="text-slate-400 uppercase font-semibold">CRM Reference ID</div>
                <div className="text-base font-mono font-bold text-slate-900">{refId}</div>
                <div className="text-slate-500 pt-1">
                  Assigned Commercial Lead: Ananya Iyer (Commercial BDM Desk)
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => setIsSuccess(false)}
                  className="px-8"
                >
                  List Another Property
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Owner Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Property Owner / Landlord Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Owner / Trust Name"
                    required
                    placeholder="e.g. Suresh Reddy"
                    value={formData.landlordName}
                    onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                  />
                  <Input
                    label="Contact Phone"
                    required
                    type="tel"
                    placeholder="+91 99001 88765"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    required
                    type="email"
                    placeholder="suresh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Step 2: Property Specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Property Location & Dimensions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Micro-market Location
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-medium"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    >
                      <option value="Indiranagar">Indiranagar (100ft / 12th Main)</option>
                      <option value="Koramangala">Koramangala (80ft / 100ft)</option>
                      <option value="HSR Layout">HSR Layout (27th Main)</option>
                      <option value="Whitefield">Whitefield (ITPL Main Rd)</option>
                      <option value="Outer Ring Road">Outer Ring Road (Bellandur/Marathahalli)</option>
                      <option value="MG Road">MG Road / Brigade Road (CBD)</option>
                      <option value="Hebbal">Hebbal / Bellary Road</option>
                      <option value="Devanahalli">Devanahalli Airport Highway</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Property Category
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-medium"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    >
                      <option value="High Street Property">High Street Property</option>
                      <option value="QSR Location">QSR & Café Space</option>
                      <option value="Retail Space">Retail Space</option>
                      <option value="Grade A Office">Office / Commercial Floor</option>
                      <option value="Showroom">Automobile / Big Box Showroom</option>
                      <option value="Commercial Building">Independent Commercial Building</option>
                      <option value="Land Parcel">Commercial Land Parcel</option>
                    </select>
                  </div>

                  <Input
                    label="Floor Level"
                    placeholder="e.g. Ground Floor / G+1"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <Input
                    label="Built-up Area (sq.ft)"
                    required
                    type="number"
                    placeholder="e.g. 5800"
                    value={formData.builtUpArea}
                    onChange={(e) => setFormData({ ...formData, builtUpArea: e.target.value })}
                  />
                  <Input
                    label="Carpet Area (sq.ft)"
                    type="number"
                    placeholder="e.g. 4950"
                    value={formData.carpetArea}
                    onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
                  />
                  <Input
                    label="Road Frontage (Feet)"
                    placeholder="e.g. 65"
                    value={formData.frontageFeet}
                    onChange={(e) => setFormData({ ...formData, frontageFeet: e.target.value })}
                  />
                  <Input
                    label="Dedicated Parking (Bays)"
                    placeholder="e.g. 12"
                    value={formData.parkingBays}
                    onChange={(e) => setFormData({ ...formData, parkingBays: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Physical Address & Landmark"
                    placeholder="100 Feet Road, HAL 2nd Stage, Opp Starbucks"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <Input
                    label="Google Maps Location Pin URL"
                    placeholder="https://maps.app.goo.gl/..."
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  />
                </div>
              </div>

              {/* Step 3: Financial Expectations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Commercial Lease & Rent Expectations
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Expected Rent (₹ / Month or ₹ / Sq.Ft)"
                    placeholder="e.g. ₹9.5 L / month or ₹160 / sq.ft"
                    value={formData.expectedRent}
                    onChange={(e) => setFormData({ ...formData, expectedRent: e.target.value })}
                  />
                  <Input
                    label="Lease Expectation (Term / Lock-in)"
                    placeholder="e.g. 5+5 Years, 3 Years Lock-in"
                    value={formData.leaseExpectation}
                    onChange={(e) => setFormData({ ...formData, leaseExpectation: e.target.value })}
                  />
                </div>

                {/* Upload Photos Simulator */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Property Photos & Architectural Drawings
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50">
                    <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-800">
                      Drag & drop facade photos, elevation plans, or CAD layouts here
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, PDF up to 25 MB</p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      {simulatedUploadedFiles.map((file, i) => (
                        <span key={i} className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                          ✓ {file}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Textarea
                  label="Special Site Features (Power load, grease trap, elevator shaft, etc.)"
                  rows={2}
                  placeholder="80 kVA power transformer sanctioned, commercial kitchen exhaust provision installed..."
                  value={formData.specialFeatures}
                  onChange={(e) => setFormData({ ...formData, specialFeatures: e.target.value })}
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your property data is kept strictly confidential and shared only with verified brand leads.
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto px-10 font-bold shadow-lg shadow-amber-600/20"
                  isLoading={isSubmitting}
                >
                  Submit Property
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
