"use client";

import React, { useState } from "react";
import { Lead, LeadStatus } from "@/types";
import { updateLeadInStorage } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  X,
  Phone,
  Mail,
  Calendar,
  Building,
  UserCheck,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tag,
} from "lucide-react";

export interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdated: (updatedLead: Lead) => void;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  CONTACTED: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  QUALIFIED: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "SITE VISIT": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  NEGOTIATION: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  CLOSED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  LOST: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onLeadUpdated,
}) => {
  const [currentLead, setCurrentLead] = useState<Lead | null>(lead);
  const [newNote, setNewNote] = useState("");

  React.useEffect(() => {
    setCurrentLead(lead);
  }, [lead]);

  if (!isOpen || !currentLead) return null;

  const handleStatusChange = (newStatus: LeadStatus) => {
    const updated: Lead = {
      ...currentLead,
      status: newStatus,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setCurrentLead(updated);
    updateLeadInStorage(updated);
    onLeadUpdated(updated);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteObj = {
      id: `n-${Date.now()}`,
      author: "Siddharth Reddy (Admin)",
      content: newNote.trim(),
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    const updated: Lead = {
      ...currentLead,
      notes: [noteObj, ...(currentLead.notes || [])],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setCurrentLead(updated);
    updateLeadInStorage(updated);
    onLeadUpdated(updated);
    setNewNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 text-slate-100 h-full shadow-2xl flex flex-col z-10 animate-slide-up">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-slate-950/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400">
                {currentLead.code}
              </span>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                  STATUS_COLORS[currentLead.status]
                }`}
              >
                {currentLead.status}
              </span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white mt-1">
              {currentLead.fullName}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Source: {currentLead.source} • Added on {currentLead.createdAt}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Status Pipeline Selector */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Update CRM Pipeline Stage
            </span>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {(["NEW", "CONTACTED", "QUALIFIED", "SITE VISIT", "NEGOTIATION", "CLOSED", "LOST"] as LeadStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChange(st)}
                    className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] transition-all border ${
                      currentLead.status === st
                        ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Contact & Assignment
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 text-[10px]">Phone Number</span>
                <a href={`tel:${currentLead.phone}`} className="text-slate-200 font-semibold block hover:text-blue-400">
                  {currentLead.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Email Address</span>
                <a href={`mailto:${currentLead.email}`} className="text-slate-200 font-semibold block hover:text-blue-400 truncate">
                  {currentLead.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Assigned Advisor</span>
                <div className="text-amber-300 font-semibold">{currentLead.assignedTo?.name || "Unassigned"}</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Timeline</span>
                <div className="text-slate-200 font-semibold">{currentLead.timeline}</div>
              </div>
            </div>
          </div>

          {/* Property Requirement Details */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Requirement Parameters
            </span>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Vertical:</span>
                <span className="font-semibold text-white capitalize">{currentLead.propertyCategory}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Type:</span>
                <span className="font-semibold text-white">{currentLead.requirementType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Target Budget:</span>
                <span className="font-semibold text-emerald-400">{currentLead.targetBudget?.display}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Configuration:</span>
                <span className="font-semibold text-white">{currentLead.configuration || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Associated Property:</span>
                <span className="font-semibold text-blue-400 truncate max-w-xs">{currentLead.propertyTitle || "Direct Consultation"}</span>
              </div>
              {currentLead.siteVisitDate && (
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Scheduled Visit:</span>
                  <span className="font-semibold text-amber-300 font-mono">{currentLead.siteVisitDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Internal Notes Timeline */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
              Advisor Activity & Conversation Log
            </span>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Log a client note, call update or visit feedback..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Button type="submit" variant="primary" size="sm" className="px-3">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>

            <div className="space-y-2 pt-1">
              {currentLead.notes && currentLead.notes.length > 0 ? (
                currentLead.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-300">{note.author}</span>
                      <span className="text-slate-500 font-mono">{note.createdAt}</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic text-[11px]">No activity logged yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
