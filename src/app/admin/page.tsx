"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RESIDENTIAL_PROPERTIES,
  COMMERCIAL_PROPERTIES,
  INITIAL_LEADS,
  DEVELOPERS,
  BRANDS,
} from "@/data/mockData";
import { getStoredLeads } from "@/lib/utils";
import { Lead } from "@/types";
import { LeadDetailDrawer } from "@/components/dashboard/LeadDetailDrawer";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  Users2,
  CheckCircle,
  CalendarCheck,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Filter,
  Eye,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEadsData());
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function INITIAL_LEadsData() {
    return INITIAL_LEADS;
  }

  useEffect(() => {
    setLeads(getStoredLeads(INITIAL_LEADS));
  }, []);

  const totalProperties = RESIDENTIAL_PROPERTIES.length + COMMERCIAL_PROPERTIES.length;
  const newLeadsCount = leads.filter((l) => l.status === "NEW").length;
  const qualifiedLeadsCount = leads.filter((l) => l.status === "QUALIFIED").length;
  const siteVisitsCount = leads.filter((l) => l.status === "SITE VISIT").length;
  const commercialEnquiriesCount = leads.filter((l) => l.propertyCategory === "commercial").length;
  const conversionsCount = leads.filter((l) => l.status === "CLOSED").length;

  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleLeadUpdated = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelectedLead(updated);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Executive CRM Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline metrics, lead acquisition velocity, and commercial property intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/properties">
            <Button variant="outline" size="sm" className="bg-slate-900 border-slate-700 text-slate-200 text-xs">
              Manage Inventory
            </Button>
          </Link>
          <Link href="/admin/leads">
            <Button variant="primary" size="sm" className="text-xs font-semibold">
              View All Leads ({leads.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. TOP 6 KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Properties</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-heading text-white">{totalProperties}</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <span>+3 added this week</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">New Leads</span>
            <Users2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-heading text-blue-400">{newLeadsCount}</div>
          <div className="text-[10px] text-slate-400 font-mono">Requires action</div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Qualified</span>
            <CheckCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-heading text-purple-400">{qualifiedLeadsCount}</div>
          <div className="text-[10px] text-emerald-400 font-mono">+18% conversion</div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Site Visits</span>
            <CalendarCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-heading text-amber-400">{siteVisitsCount}</div>
          <div className="text-[10px] text-amber-400/80 font-mono">2 scheduled today</div>
        </div>

        {/* KPI 5 */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Commercial</span>
            <Briefcase className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-heading text-sky-400">{commercialEnquiriesCount}</div>
          <div className="text-[10px] text-sky-400 font-mono">Brand rollouts</div>
        </div>

        {/* KPI 6 */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Closed</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-heading text-emerald-400">{conversionsCount}</div>
          <div className="text-[10px] text-emerald-400 font-mono">₹48.5 Cr volume</div>
        </div>
      </div>

      {/* 2. CHARTS & PIPELINE VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Leads Over Time & Acquisition Velocity (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0B1528] border border-slate-800 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Leads Acquisition Volume & Growth Trend
              </h3>
              <p className="text-xs text-slate-400">Weekly inbound customer inquiries over the past 8 weeks</p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              +34.2% MoM
            </span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-44 w-full flex items-end gap-3 pt-4 px-2">
            {[
              { week: "W1", count: 18, res: 12, com: 6 },
              { week: "W2", count: 24, res: 16, com: 8 },
              { week: "W3", count: 29, res: 19, com: 10 },
              { week: "W4", count: 35, res: 22, com: 13 },
              { week: "W5", count: 42, res: 28, com: 14 },
              { week: "W6", count: 48, res: 31, com: 17 },
              { week: "W7", count: 56, res: 36, com: 20 },
              { week: "W8 (Curr)", count: 68, res: 44, com: 24 },
            ].map((bar) => {
              const heightPct = (bar.count / 75) * 100;
              return (
                <div key={bar.week} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </div>
                  <div className="w-full bg-slate-800 rounded-lg overflow-hidden h-36 flex flex-col justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-700 via-blue-500 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors truncate">
                    {bar.week}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Residential ({RESIDENTIAL_PROPERTIES.length})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Commercial ({COMMERCIAL_PROPERTIES.length})
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Total YTD: 320 Inquiries</span>
          </div>
        </div>

        {/* Chart 2: Pipeline Funnel Breakdown (1 Col) */}
        <div className="p-6 rounded-3xl bg-[#0B1528] border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading">
              CRM Conversion Funnel
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Live Stage</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { stage: "NEW INBOUND", count: 14, color: "bg-blue-500", pct: "100%" },
              { stage: "CONTACTED", count: 11, color: "bg-indigo-500", pct: "78%" },
              { stage: "QUALIFIED HNI", count: 8, color: "bg-purple-500", pct: "57%" },
              { stage: "SITE VISIT SET", count: 5, color: "bg-amber-500", pct: "35%" },
              { stage: "NEGOTIATION", count: 3, color: "bg-orange-500", pct: "21%" },
              { stage: "CLOSED DEALS", count: 2, color: "bg-emerald-500", pct: "14%" },
            ].map((f) => (
              <div key={f.stage} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300 text-[11px]">{f.stage}</span>
                  <span className="text-white font-mono text-xs">{f.count} ({f.pct})</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`${f.color} h-full rounded-full`} style={{ width: f.pct }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Overall Conversion Rate:</span>
            <span className="font-bold font-mono text-emerald-400">14.3%</span>
          </div>
        </div>
      </div>

      {/* 3. MICRO-MARKETS & TOP PERFORMING PROPERTIES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Micro-markets distribution */}
        <div className="p-6 rounded-3xl bg-[#0B1528] border border-slate-800 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            Enquiries by Bengaluru Micro-market
          </h3>

          <div className="space-y-2.5 pt-1">
            {[
              { name: "Whitefield & ITPL Corridor", share: 32, count: "48 Enquiries" },
              { name: "Indiranagar (100ft & 12th Main)", share: 24, count: "36 Enquiries" },
              { name: "Sarjapur Road Tech Belt", share: 18, count: "27 Enquiries" },
              { name: "Outer Ring Road (Bellandur)", share: 14, count: "21 Enquiries" },
              { name: "Hebbal & Airport Expressway", share: 12, count: "18 Enquiries" },
            ].map((m) => (
              <div key={m.name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{m.name}</span>
                  <span className="text-blue-400 font-mono">{m.count} ({m.share}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full" style={{ width: `${m.share * 2.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Showcase Properties */}
        <div className="p-6 rounded-3xl bg-[#0B1528] border border-slate-800 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            Top Performing Properties (Inquiry Volume)
          </h3>

          <div className="space-y-2.5 pt-1">
            {[
              { title: "Skyline Residences (Whitefield)", type: "Residential", leads: 18, price: "₹2.45 Cr", status: "Active" },
              { title: "100 Feet Road Prime Retail (Indiranagar)", type: "Commercial", leads: 14, price: "₹9.5 L / mo", status: "Hot Lead" },
              { title: "The Grand Sovereign Luxury Villa (Sarjapur)", type: "Residential", leads: 12, price: "₹6.85 Cr", status: "Site Visits" },
              { title: "Koramangala 80ft QSR Hub", type: "Commercial", leads: 10, price: "₹5.2 L / mo", status: "LOI Stage" },
            ].map((prop, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{prop.title}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">{prop.type} • {prop.price}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-blue-400 block">{prop.leads} Leads</span>
                  <span className="text-[10px] text-amber-300 font-medium">{prop.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECENT LEADS QUICK TABLE */}
      <div className="p-6 rounded-3xl bg-[#0B1528] border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Recent Leads & Direct Customer Enquiries
            </h3>
            <p className="text-xs text-slate-400">Click any lead row to inspect parameters, assign advisors, or update pipeline status.</p>
          </div>

          <Link href="/admin/leads">
            <Button variant="outline" size="sm" className="bg-slate-900 border-slate-700 text-slate-300 text-xs">
              Go to Full Leads Management →
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Ref</th>
                <th className="p-3.5">Lead Name</th>
                <th className="p-3.5">Requirement</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">Assigned To</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {leads.slice(0, 5).map((l) => (
                <tr
                  key={l.id}
                  onClick={() => handleOpenLead(l)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-3.5 font-mono text-amber-400 font-bold">{l.code}</td>
                  <td className="p-3.5 font-semibold text-white">
                    {l.fullName}
                    <span className="block text-[11px] text-slate-400 font-normal">{l.phone}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-medium">
                      {l.requirementType}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                      {l.propertyTitle || "General"}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-emerald-400">{l.targetBudget?.display}</td>
                  <td className="p-3.5 text-slate-300">{l.assignedTo?.name}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {l.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-[11px] font-semibold transition-colors"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DRAWER */}
      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}
