"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { INITIAL_LEADS } from "@/data/mockData";
import { getStoredLeads, updateLeadInStorage } from "@/lib/utils";
import { Lead, LeadStatus } from "@/types";
import { LeadDetailDrawer } from "@/components/dashboard/LeadDetailDrawer";
import { Button } from "@/components/ui/Button";
import {
  Users2,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

const STATUS_OPTIONS: (LeadStatus | "ALL")[] = [
  "ALL",
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SITE VISIT",
  "NEGOTIATION",
  "CLOSED",
  "LOST",
];

const STATUS_BADGE_STYLES: Record<LeadStatus, string> = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  CONTACTED: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  QUALIFIED: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "SITE VISIT": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  NEGOTIATION: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  CLOSED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  LOST: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "ALL">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLeads(getStoredLeads(INITIAL_LEADS));
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (selectedStatus !== "ALL" && l.status !== selectedStatus) return false;
      if (selectedCategory !== "ALL" && l.propertyCategory !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = l.fullName.toLowerCase().includes(q);
        const matchesCode = l.code.toLowerCase().includes(q);
        const matchesEmail = l.email.toLowerCase().includes(q);
        const matchesPhone = l.phone.includes(q);
        const matchesProperty = (l.propertyTitle || "").toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesEmail && !matchesPhone && !matchesProperty) {
          return false;
        }
      }
      return true;
    });
  }, [leads, searchQuery, selectedStatus, selectedCategory]);

  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleLeadUpdated = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelectedLead(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Lead Management CRM
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track customer inquiries, corporate expansion mandates, and landlord submissions through the 7-stage conversion funnel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const csvContent =
                "data:text/csv;charset=utf-8," +
                ["Ref,Name,Email,Phone,Requirement,Status,Date"]
                  .concat(
                    leads.map(
                      (l) =>
                        `"${l.code}","${l.fullName}","${l.email}","${l.phone}","${l.requirementType}","${l.status}","${l.createdAt}"`
                    )
                  )
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "ssr_realty_leads.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="bg-slate-900 border-slate-700 text-slate-300 text-xs"
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, code or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="residential">Residential Only</option>
            <option value="commercial">Commercial Only</option>
          </select>

          {/* Status select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                Status: {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Pills Quick Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {STATUS_OPTIONS.map((st) => {
          const count =
            st === "ALL"
              ? leads.length
              : leads.filter((l) => l.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedStatus === st
                  ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
              }`}
            >
              <span>{st}</span>
              <span className="ml-1.5 font-mono text-[10px] opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Comprehensive Leads Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0B1528] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Lead Code</th>
                <th className="p-3.5">Customer / Contact</th>
                <th className="p-3.5">Requirement</th>
                <th className="p-3.5">Property / Unit</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Assigned Advisor</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-500">
                    No leads found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleOpenLead(lead)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-mono font-bold text-amber-400">
                      {lead.code}
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-white">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{lead.phone}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{lead.email}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold text-[11px]">
                        {lead.requirementType}
                      </span>
                      <span className="block text-[10px] text-slate-400 capitalize mt-1">
                        {lead.propertyCategory}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-medium text-slate-200 block truncate max-w-[180px]">
                        {lead.propertyTitle || "Direct Consultation"}
                      </span>
                      {lead.configuration && (
                        <span className="text-[10px] text-slate-500 block truncate max-w-[180px]">
                          {lead.configuration}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 font-mono text-emerald-400 font-semibold whitespace-nowrap">
                      {lead.targetBudget?.display}
                    </td>

                    <td className="p-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                      {lead.source}
                    </td>

                    <td className="p-3.5 text-slate-300 whitespace-nowrap">
                      {lead.assignedTo?.name || "Unassigned"}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          STATUS_BADGE_STYLES[lead.status]
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                      {lead.createdAt}
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLead(lead);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-[11px] font-semibold transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE-OUT LEAD DETAIL DRAWER */}
      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}
