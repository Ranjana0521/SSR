import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Lead } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const l = amount / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSqFt(area: number): string {
  return `${new Intl.NumberFormat("en-IN").format(area)} sq.ft`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

const STORAGE_KEY_LEADS = "ssr_realty_leads_v1";

export function getStoredLeads(initialLeads: Lead[]): Lead[] {
  if (typeof window === "undefined") return initialLeads;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!saved) return initialLeads;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge unique
      const idSet = new Set(parsed.map((p) => p.id));
      const combined = [...parsed];
      initialLeads.forEach((l) => {
        if (!idSet.has(l.id)) combined.push(l);
      });
      return combined;
    }
  } catch (e) {
    console.error("Failed to load leads from localStorage", e);
  }
  return initialLeads;
}

export function saveLeadToStorage(newLead: Lead): void {
  if (typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LEADS);
    const existing: Lead[] = saved ? JSON.parse(saved) : [];
    const updated = [newLead, ...existing.filter((l) => l.id !== newLead.id)];
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to persist lead", e);
  }
}

export function updateLeadInStorage(updatedLead: Lead): void {
  if (typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LEADS);
    const existing: Lead[] = saved ? JSON.parse(saved) : [];
    const updated = existing.map((l) => (l.id === updatedLead.id ? updatedLead : l));
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to update lead", e);
  }
}
