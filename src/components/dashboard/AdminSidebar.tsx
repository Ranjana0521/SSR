"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users2,
  Building,
  Building2,
  Store,
  Briefcase,
  CalendarCheck,
  BarChart3,
  Settings,
  Shield,
  ArrowLeft,
  Layers,
  Sparkles,
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads CRM", href: "/admin/leads", icon: Users2, badge: "Live" },
    { label: "Property Inventory", href: "/admin/properties", icon: Building },
    { label: "Developers", href: "/developers", icon: Building2, external: true },
    { label: "Landlords", href: "/landlords", icon: Store, external: true },
    { label: "Brands Network", href: "/brands", icon: Sparkles, external: true },
    { label: "Site Visits", href: "/admin/leads?tab=site-visits", icon: CalendarCheck },
    { label: "Analytics & Reports", href: "/admin#reports", icon: BarChart3 },
    { label: "CRM Settings", href: "/admin#settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#070e1b] border-r border-slate-800 text-slate-300 flex flex-col justify-between h-screen sticky top-0 flex-shrink-0 z-30 select-none">
      {/* Top Brand Monogram */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
              SSR
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-tight text-white block">
                SSR <span className="text-amber-400">CRM</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block -mt-0.5">
                Enterprise v2.4
              </span>
            </div>
          </Link>
          <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
            PROD
          </span>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-3 py-2 block">
            Core Modules
          </span>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400")} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded font-mono font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400"
                  )}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Exit */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
          <span>Back to Main Portal</span>
        </Link>

        {/* Current User */}
        <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center">
            SR
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold text-white block truncate">Siddharth Reddy</span>
            <span className="text-[10px] text-slate-400 block truncate">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
