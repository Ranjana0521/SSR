"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveLeadToStorage } from "@/lib/utils";
import { Lead } from "@/types";
import { BRANDS } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  Sparkles,
  CheckCircle2,
  Building2,
  TrendingUp,
  MapPin,
  Store,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function BrandExpansionPage() {
  const [formData, setFormData] = useState({
    brandName: "",
    category: "QSR",
    pocName: "",
    phone: "",
    email: "",
    targetCity: "Bengaluru",
    preferredLocations: "Indiranagar, Koramangala, HSR Layout",
    requiredAreaSqFt: "2500 - 3500",
    budgetMonthly: "₹5.0 - 7.0 L / mo",
    numberOfOutlets: "4",
    expectedOpeningDate: "2026-12-01",
    specialRequirements: "3-phase power (60 kVA), high road frontage, alfresco seating permitted",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadCode, setLeadCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandName || !formData.pocName || !formData.phone || !formData.email) {
      alert("Please provide the Brand Name, Contact Person, Phone, and Corporate Email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `SSR-BR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        code,
        fullName: `${formData.pocName} (${formData.brandName})`,
        email: formData.email,
        phone: formData.phone,
        requirementType: "Brand Expansion",
        propertyCategory: "commercial",
        preferredLocations: formData.preferredLocations.split(",").map((s) => s.trim()),
        targetBudget: { min: 0, max: 0, display: formData.budgetMonthly },
        configuration: `${formData.category} Expansion (${formData.numberOfOutlets} Outlets, ${formData.requiredAreaSqFt} sq.ft)`,
        source: "Brand Expansion",
        assignedTo: {
          id: "usr-2",
          name: "Ananya Iyer",
          email: "ananya.i@ssrrealty.com",
          role: "Commercial BDM Lead",
        },
        status: "NEW",
        timeline: `Target: ${formData.expectedOpeningDate}`,
        notes: [
          {
            id: `n-${Date.now()}`,
            author: "Brand Expansion Intake",
            content: `Locations: ${formData.preferredLocations}. Special requirements: ${formData.specialRequirements}`,
            createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
        ],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      saveLeadToStorage(newLead);
      setLeadCode(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Institutional Brand Rollout Desk
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
            Looking for Your Next Business Location?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From single flagship locations to multi-store aggressive city rollouts — SSR Realty sources, vets, and negotiates verified commercial properties directly with landlords.
          </p>
        </div>

        {/* Existing Brand Partners in Network */}
        <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Active Expanding Brands Powered by SSR Realty
            </span>
            <span className="text-xs text-slate-400">
              50+ National Chains
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1"
              >
                <div className="text-xs font-bold text-white truncate">{brand.name}</div>
                <div className="text-[10px] text-amber-300 font-mono">{brand.category}</div>
                <div className="text-[10px] text-slate-400">{brand.activeRequirements} Open Needs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Expansion Intake Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {isSuccess ? (
            <div className="py-12 text-center space-y-6 animate-fade-in max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Expansion Requirement Submitted
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you. Our Commercial BDM desk will analyze available high street and commercial inventory matching your parameters and reach out within 24 hours with an asset shortlist.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="text-slate-400 uppercase font-semibold">CRM Reference ID</div>
                <div className="text-base font-mono font-bold text-slate-900">{leadCode}</div>
                <div className="text-slate-500 pt-1">
                  Assigned Lead: Ananya Iyer (Commercial Real Estate Director)
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => setIsSuccess(false)}
                  className="px-8"
                >
                  Submit Additional Requirement
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Brand / Enterprise Name"
                  required
                  placeholder="e.g. Third Wave Coffee / Croma"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Business Category
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-medium"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="QSR">QSR (Quick Service Restaurant & Café)</option>
                    <option value="Retail">Retail (Fashion, Electronics, Lifestyle)</option>
                    <option value="Bank">Bank / Wealth Management / ATM</option>
                    <option value="Automobile">Automobile & EV Experience Center</option>
                    <option value="Healthcare">Healthcare & Diagnostics Center</option>
                    <option value="Supermarket">Supermarket & Grocery Chain</option>
                    <option value="Fitness">Fitness & Wellness Gym</option>
                    <option value="Other">Other Commercial Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Authorized POC Name"
                  required
                  placeholder="e.g. Pooja Hegde (BDM Lead)"
                  value={formData.pocName}
                  onChange={(e) => setFormData({ ...formData, pocName: e.target.value })}
                />
                <Input
                  label="Contact Phone"
                  required
                  type="tel"
                  placeholder="+91 98200 44109"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                  label="Corporate Email"
                  required
                  type="email"
                  placeholder="expansion@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Target City"
                  required
                  placeholder="Bengaluru"
                  value={formData.targetCity}
                  onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
                />
                <Input
                  label="Preferred Micro-markets"
                  placeholder="Indiranagar 100ft, Koramangala 80ft, HSR 27th Main"
                  value={formData.preferredLocations}
                  onChange={(e) => setFormData({ ...formData, preferredLocations: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Required Carpet Area (sq.ft)"
                  placeholder="e.g. 2,500 - 3,500"
                  value={formData.requiredAreaSqFt}
                  onChange={(e) => setFormData({ ...formData, requiredAreaSqFt: e.target.value })}
                />
                <Input
                  label="Monthly Rental Budget"
                  placeholder="e.g. ₹5.0 - 7.0 L / month"
                  value={formData.budgetMonthly}
                  onChange={(e) => setFormData({ ...formData, budgetMonthly: e.target.value })}
                />
                <Input
                  label="Number of Outlets Planned"
                  type="number"
                  placeholder="e.g. 4"
                  value={formData.numberOfOutlets}
                  onChange={(e) => setFormData({ ...formData, numberOfOutlets: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Expected Launch / Opening Date"
                  type="date"
                  value={formData.expectedOpeningDate}
                  onChange={(e) => setFormData({ ...formData, expectedOpeningDate: e.target.value })}
                />
                <div className="space-y-1.5 flex flex-col justify-end">
                  <div className="text-xs text-slate-500 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    SSR Realty provides full LOI support, lease agreements, and landlord verification.
                  </div>
                </div>
              </div>

              <Textarea
                label="Special Space Requirements (e.g. 3-phase power, grease trap, frontage width, ground floor only)"
                rows={3}
                placeholder="Needs minimum 40ft road frontage, ground floor with dedicated outdoor alfresco seating, 60 kVA power load..."
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              />

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your brand expansion brief is handled under strict mutual NDA.
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto px-10 font-bold shadow-lg shadow-amber-600/20"
                  isLoading={isSubmitting}
                >
                  Find Locations
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
