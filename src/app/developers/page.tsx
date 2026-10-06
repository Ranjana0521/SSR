"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEVELOPERS, RESIDENTIAL_PROPERTIES } from "@/data/mockData";
import { Developer } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  Building2,
  Award,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function DevelopersPage() {
  const [partnerFormOpen, setPartnerFormOpen] = useState(false);
  const [devFormData, setDevFormData] = useState({
    developerName: "",
    contactPerson: "",
    phone: "",
    email: "",
    ongoingProjectsCount: "",
    projectName: "",
    location: "Whitefield",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devFormData.developerName || !devFormData.contactPerson || !devFormData.phone) {
      alert("Please fill in the required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Institutional Developer Alliances
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
            Developer Partners & Marquee Projects
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            SSR Realty is an authorized sales and strategic marketing partner for Bengaluru&apos;s most reputed grade-A real estate developers.
          </p>
        </div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEVELOPERS.map((dev) => (
            <div
              key={dev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white flex items-center justify-center font-bold text-lg font-heading shadow-md">
                    {dev.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    {dev.experienceYears} Years Legacy
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                    {dev.name}
                  </h3>
                  <p className="text-xs text-amber-600 font-medium italic mt-0.5">
                    &ldquo;{dev.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {dev.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Completed</span>
                    <div className="text-sm font-bold text-slate-900">{dev.completedProjects}+ Projects</div>
                  </div>
                  <div className="border-l border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Ongoing</span>
                    <div className="text-sm font-bold text-blue-600">{dev.ongoingProjects} Active Sites</div>
                  </div>
                </div>

                {/* Featured Projects in SSR Realty */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Showcase Projects on SSR
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.featuredProjects.map((p, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/residential`}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View {dev.name} Residences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Developer Marketing Mandate Partnership Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Developer Mandates & Pre-launches
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Partner with SSR Realty for Your Next Project Launch
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We provide technology-enabled project sales mandates, digital distribution to verified corporate buyer pools, and experiential showroom marketing.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 text-center space-y-2 max-w-md">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Partnership Request Received</h4>
              <p className="text-xs text-slate-300">
                Our Head of Developer Relations will contact your leadership team shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
              <Input
                label="Developer / Real Estate Firm"
                required
                placeholder="e.g. Prestige Group"
                value={devFormData.developerName}
                onChange={(e) => setDevFormData({ ...devFormData, developerName: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Input
                label="Leadership Contact Person"
                required
                placeholder="e.g. Sanjeev Rao (Director)"
                value={devFormData.contactPerson}
                onChange={(e) => setDevFormData({ ...devFormData, contactPerson: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Input
                label="Phone Number"
                required
                placeholder="+91 98450 00000"
                value={devFormData.phone}
                onChange={(e) => setDevFormData({ ...devFormData, phone: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <div className="sm:col-span-3 flex justify-end pt-2">
                <Button type="submit" variant="gold" size="md">
                  Request Developer Alliance Discussion
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
