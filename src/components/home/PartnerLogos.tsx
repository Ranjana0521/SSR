import React from "react";
import Link from "next/link";
import { DEVELOPERS, BRANDS } from "@/data/mockData";
import { ShieldCheck, Award, TrendingUp, Users, ArrowRight } from "lucide-react";

export const PartnerLogos: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Trust Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
          <div className="space-y-1 border-r border-slate-800 pr-4">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-blue-400">
              500+
            </div>
            <div className="text-xs font-semibold text-slate-300">
              Curated Bangalore Properties
            </div>
            <div className="text-[11px] text-slate-500">
              100% legal title vetted
            </div>
          </div>

          <div className="space-y-1 md:border-r border-slate-800 pr-4">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-amber-400">
              100+
            </div>
            <div className="text-xs font-semibold text-slate-300">
              Active Commercial Opportunities
            </div>
            <div className="text-[11px] text-slate-500">
              High street, QSR & tech parks
            </div>
          </div>

          <div className="space-y-1 border-r border-slate-800 pr-4">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-400">
              50+
            </div>
            <div className="text-xs font-semibold text-slate-300">
              Institutional Brand Connections
            </div>
            <div className="text-[11px] text-slate-500">
              National & global expansions
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-purple-400">
              ₹1,200 Cr+
            </div>
            <div className="text-xs font-semibold text-slate-300">
              Gross Transaction Value
            </div>
            <div className="text-[11px] text-slate-500">
              Completed real-estate deals
            </div>
          </div>
        </div>

        {/* Developer Partners */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Institutional Developer Alliances
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Authorized Advisory Partner for India&apos;s Marquee Developers
              </h3>
            </div>
            <Link
              href="/developers"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Explore Developers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DEVELOPERS.map((dev) => (
              <Link
                key={dev.id}
                href={`/developers?dev=${dev.slug}`}
                className="p-4 rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center bg-slate-50/50 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-blue-800 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
                  {dev.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {dev.name}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {dev.completedProjects}+ Projects
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
