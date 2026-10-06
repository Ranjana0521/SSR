"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { saveLeadToStorage } from "@/lib/utils";
import { Lead } from "@/types";
import { CheckCircle2, PhoneCall, Building2, ShieldCheck } from "lucide-react";

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: "residential" | "commercial";
  propertyTitle?: string;
  propertyId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = "residential",
  propertyTitle,
  propertyId,
}) => {
  const [category, setCategory] = useState<"residential" | "commercial">(initialCategory);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    requirementType: "Buy",
    budget: "",
    preferredLocation: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadCode, setLeadCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in your name, phone number and email.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedCode = `SSR-L-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        code: generatedCode,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        requirementType: formData.requirementType as any,
        propertyCategory: category,
        preferredLocations: formData.preferredLocation ? [formData.preferredLocation] : ["Bengaluru Core"],
        targetBudget: {
          min: 0,
          max: 0,
          display: formData.budget || "Budget on Request",
        },
        propertyId,
        propertyTitle: propertyTitle || "General Advisory Consultation",
        source: propertyTitle ? "Property Details Page" : "Website Form",
        assignedTo: {
          id: category === "residential" ? "usr-1" : "usr-2",
          name: category === "residential" ? "Rohit Malhotra" : "Ananya Iyer",
          email: category === "residential" ? "rohit.m@ssrrealty.com" : "ananya.i@ssrrealty.com",
          role: category === "residential" ? "Senior Residential Advisor" : "Commercial BDM Lead",
        },
        status: "NEW",
        timeline: "Immediate (30 days)",
        notes: formData.notes
          ? [
              {
                id: `n-${Date.now()}`,
                author: "Client Request",
                content: formData.notes,
                createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
              },
            ]
          : [],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      saveLeadToStorage(newLead);
      setLeadCode(generatedCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      requirementType: "Buy",
      budget: "",
      preferredLocation: "",
      notes: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? undefined : "Connect with SSR Realty Advisor"}
      description={
        isSuccess
          ? undefined
          : propertyTitle
          ? `Enquiry for: ${propertyTitle}`
          : "Tailored residential & commercial real-estate solutions backed by location intelligence."
      }
      maxWidth="lg"
    >
      {isSuccess ? (
        <div className="py-6 px-2 text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Enquiry Received
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Thank you for connecting with SSR Realty. An accredited advisor has been assigned to your requirement and will contact you within 2 business hours.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto text-left space-y-1.5">
            <div className="text-xs text-slate-400 uppercase font-semibold">CRM Reference ID</div>
            <div className="text-base font-mono font-bold text-slate-800">{leadCode}</div>
            <div className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Assigned Advisor: {category === "residential" ? "Rohit Malhotra (Residential)" : "Ananya Iyer (Commercial)"}
            </div>
          </div>

          <div className="pt-2">
            <Button onClick={handleReset} variant="dark" className="w-full sm:w-auto px-8">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vertical Toggle */}
          {!propertyTitle && (
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCategory("residential")}
                className={`py-2 rounded-lg transition-all ${
                  category === "residential"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Residential Requirement
              </button>
              <button
                type="button"
                onClick={() => setCategory("commercial")}
                className={`py-2 rounded-lg transition-all ${
                  category === "commercial"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Commercial / Brand Expansion
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Vikram Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              label="Phone Number"
              required
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <Input
            label="Corporate / Personal Email"
            required
            type="email"
            placeholder="vikram@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Requirement Type
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                value={formData.requirementType}
                onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
              >
                {category === "residential" ? (
                  <>
                    <option value="Buy">Buy Home / Villa</option>
                    <option value="Rent">Rent Luxury Home</option>
                    <option value="Resale">Resale Property</option>
                  </>
                ) : (
                  <>
                    <option value="Commercial Lease">Commercial Lease</option>
                    <option value="Brand Expansion">Brand Expansion (Multiple Stores)</option>
                    <option value="Landlord Listing">List My Property for Lease</option>
                    <option value="Commercial Buy">Buy Commercial Asset / Land</option>
                  </>
                )}
              </select>
            </div>

            <Input
              label="Budget Range"
              placeholder={category === "residential" ? "e.g. ₹2.0 - 2.5 Cr" : "e.g. ₹5 - 8 L / month"}
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          <Input
            label="Preferred Location / Micro-market"
            placeholder="e.g. Whitefield, Indiranagar, Outer Ring Road"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
          />

          <Textarea
            label="Additional Details or Specific Requirements"
            rows={2}
            placeholder="E.g. East facing, minimum 3,000 sq ft, high footfall high street, immediate occupancy..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              Confidential & Direct
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Submit Requirement
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};
