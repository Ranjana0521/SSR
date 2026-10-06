"use client";

import React, { useState } from "react";
import {
  Cpu,
  Database,
  MapPin,
  Users,
  Footprints,
  Compass,
  TrendingUp,
  Sparkles,
  Coffee,
  ShoppingBag,
  Landmark,
  Car,
  Activity,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface StepInfo {
  id: number;
  label: string;
  short: string;
  icon: any;
  metric: string;
  detail: string;
}

const FLOW_STEPS: StepInfo[] = [
  {
    id: 1,
    label: "Property Intake",
    short: "Property",
    icon: MapPin,
    metric: "Physical Asset DNA",
    detail: "Dimensions, road frontage, ceiling height, sanctioned power load, and parking ratio logged.",
  },
  {
    id: 2,
    label: "Location Data",
    short: "Location Data",
    icon: Database,
    metric: "GIS & Micro-market",
    detail: "Geographical coordinates, zoning classification, arterial road connectivity, and upcoming metro line proximity mapped.",
  },
  {
    id: 3,
    label: "Catchment Analysis",
    short: "Catchment",
    icon: Users,
    metric: "3km Radius Density",
    detail: "Demographic profile, household median income, tech employee concentration, and residential purchasing power evaluated.",
  },
  {
    id: 4,
    label: "Footfall Dynamics",
    short: "Footfall",
    icon: Footprints,
    metric: "42,000+ daily pedestrian / vehicular",
    detail: "Peak hour traffic curves, weekend leisure footfall index, and public transit pedestrian spillover indexed.",
  },
  {
    id: 5,
    label: "Accessibility Score",
    short: "Accessibility",
    icon: Compass,
    metric: "98/100 Accessibility Index",
    detail: "U-turn feasibility, right-side ingress comfort, service road availability, and valet parking capacity analyzed.",
  },
  {
    id: 6,
    label: "Competitive Heatmap",
    short: "Competition",
    icon: TrendingUp,
    metric: "Market Gap Identification",
    detail: "Existing category saturation mapped to identify high-converting underserviced brand opportunities.",
  },
  {
    id: 7,
    label: "SSR Brand Match",
    short: "Brand Matching",
    icon: Sparkles,
    metric: "96.4% Algorithmic Match",
    detail: "Direct pairing of verified landlord asset with qualified brand expansion real-estate criteria.",
  },
];

const CATEGORIES = [
  {
    name: "QSR & Cafés",
    icon: Coffee,
    activeBrands: ["Third Wave Coffee", "Starbucks", "Subway", "Blue Tokai"],
    keyRequirement: "High evening pedestrian footfall, alfresco patio & 60+ kVA power",
    matchScore: 98,
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  {
    name: "High Street Retail",
    icon: ShoppingBag,
    activeBrands: ["Croma", "Zudio", "Rare Rabbit", "Lenskart"],
    keyRequirement: "45ft+ road frontage, double height glass facade & zero column obstruction",
    matchScore: 95,
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    name: "Banking & Wealth",
    icon: Landmark,
    activeBrands: ["HDFC Bank", "ICICI Wealth", "Kotak Mahindra", "Axis Private"],
    keyRequirement: "Ground + 1st floor, strongroom floor reinforcement & high security parking",
    matchScore: 94,
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    name: "Automobile & EV",
    icon: Car,
    activeBrands: ["Tata Motors EV", "Ather Energy", "BYD", "Mahindra Auto"],
    keyRequirement: "Double height 16ft ceiling, heavy floor load & vehicle service access",
    matchScore: 92,
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  },
  {
    name: "Healthcare & Diagnostics",
    icon: Activity,
    activeBrands: ["Apollo Clinic", "Manipal Diagnostics", "Clove Dental"],
    keyRequirement: "Stretcher elevator, biomedical waste storage & ground-level ambulance ramp",
    matchScore: 96,
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
];

export const LocationIntelligenceFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // default Catchment
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const currentStep = FLOW_STEPS[activeStep];

  return (
    <section className="relative py-24 bg-[#080f1d] text-white overflow-hidden border-y border-white/10">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            PropTech Location Intelligence Engine
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            From Property to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">Opportunity</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            We don’t just list real estate. SSR Realty computes 7 layers of geospatial, catchment, and footfall telemetry to transform commercial properties into high-performing brand assets.
          </p>
        </div>

        {/* Interactive 7-Step Algorithmic Pipeline */}
        <div className="mt-16">
          {/* Step Nodes Progress Tracker */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-slate-800 -z-0">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-500"
                style={{ width: `${(activeStep / (FLOW_STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
              {FLOW_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 border ${
                      isActive
                        ? "bg-blue-950/80 border-blue-500/80 shadow-lg shadow-blue-500/20 scale-105"
                        : isPassed
                        ? "bg-slate-900/60 border-slate-700/80 hover:border-slate-500"
                        : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-md shadow-blue-500/30"
                          : isPassed
                          ? "bg-slate-800 text-blue-300"
                          : "bg-slate-900 text-slate-500"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-2">0{step.id}</span>
                    <span
                      className={`text-xs font-bold mt-0.5 leading-tight ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {step.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Flow Inspector Panel */}
          <div className="mt-8 bg-gradient-to-br from-slate-900/90 via-[#0B1528] to-slate-950 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    STAGE 0{currentStep.id} OF 07
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Telemetry Engine Active
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  {currentStep.label}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentStep.detail}
                </p>
              </div>

              {/* Data Metric Telemetry Box */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Live Metric Output
                </span>
                <div className="text-lg font-bold text-amber-300 font-mono">
                  {currentStep.metric}
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${((activeStep + 1) / 7) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-1">
                  <span>INPUT: ASSET</span>
                  <span>OUTPUT: BRAND LOI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Potential Business Categories Display */}
        <div className="mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Target Business Categories & Matching Thresholds
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select a commercial vertical to preview brand appetite and space requisites.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    selectedCategory === idx
                      ? "bg-slate-800/90 border-blue-500/80 shadow-xl shadow-blue-500/10 -translate-y-1"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <CatIcon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${cat.badgeColor}`}>
                      {cat.matchScore}% Match
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mt-3 font-heading">
                    {cat.name}
                  </h4>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {cat.keyRequirement}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Partner Brands in Network
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {cat.activeBrands.map((b) => (
                        <span
                          key={b}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
