"use client";

import React, { useState } from "react";
import Link from "next/link";
import { saveLeadToStorage } from "@/lib/utils";
import { Lead } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Residential Advisory",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in your name, phone and email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedCode = `SSR-C-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        code: generatedCode,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        requirementType: formData.department.includes("Commercial") ? "Commercial Lease" : "Buy",
        propertyCategory: formData.department.includes("Commercial") ? "commercial" : "residential",
        preferredLocations: ["Bengaluru Core"],
        targetBudget: { min: 0, max: 0, display: "Contact Page Query" },
        source: "Website Form",
        assignedTo: {
          id: "usr-1",
          name: "Rohit Malhotra",
          email: "rohit.m@ssrrealty.com",
          role: "Senior Residential Advisor",
        },
        status: "NEW",
        timeline: "Immediate",
        notes: [
          {
            id: `n-${Date.now()}`,
            author: "General Contact Form",
            content: `Department: ${formData.department}. Message: ${formData.message}`,
            createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
        ],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      saveLeadToStorage(newLead);
      setCode(generatedCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Connect with SSR Realty
          </h1>
          <p className="text-base text-slate-600">
            Our advisory team is available for in-person consultations, private site tours, and corporate real estate reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Office Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                  Corporate Headquarters
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1">
                  Bengaluru Central Office
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Prestige Falcon Towers</strong>
                    Level 7, Brunton Road, Off MG Road, Bengaluru, Karnataka 560025
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Direct Lines:</strong>
                    +91 80 4968 8000 / +91 98450 18420
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Official Email:</strong>
                    advisory@ssrrealty.com / commercial@ssrrealty.com
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Advisory Hours:</strong>
                    Monday – Saturday: 9:30 AM – 7:30 PM IST
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => window.open("https://wa.me/919845018420", "_blank")}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Directly
                </button>
              </div>
            </div>

            {/* Quick Micro-market Hubs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Regional On-Site Hubs
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Whitefield:</strong> ITPL Main Road Hub</li>
                <li>• <strong>Outer Ring Road:</strong> Bellandur Business Bay</li>
                <li>• <strong>Indiranagar:</strong> 100ft Road Flagship Experience</li>
              </ul>
            </div>
          </div>

          {/* Contact & Enquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            {isSuccess ? (
              <div className="py-12 text-center space-y-5 animate-fade-in max-w-md mx-auto">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Message Dispatched
                </h3>
                <p className="text-xs text-slate-600">
                  Thank you for reaching out to SSR Realty. An advisor will get back to you shortly.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono font-bold text-slate-800">
                  Ticket #{code}
                </div>
                <Button variant="primary" onClick={() => setIsSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Send a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    required
                    placeholder="e.g. Vikram Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    required
                    type="email"
                    placeholder="vikram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Department / Query Type
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-medium"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="Residential Advisory">Residential Advisory (Buy / Rent)</option>
                      <option value="Commercial Leasing">Commercial Leasing & High Street</option>
                      <option value="Brand Expansion">Brand Expansion Network</option>
                      <option value="Landlord Listing">Landlord Asset Listing</option>
                      <option value="Developer Alliance">Developer Mandates & Alliance</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Message / Specific Property Requirement"
                  rows={4}
                  required
                  placeholder="Tell us what you are looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="px-8 font-semibold shadow-md shadow-blue-600/20"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
