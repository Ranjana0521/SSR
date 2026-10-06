import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  Award,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const leadership = [
    {
      name: "Siddharth S. Reddy",
      role: "Founder & Managing Director",
      bio: "18+ years in Indian commercial real estate, corporate land aggregation, and proptech ecosystems.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Ananya Iyer",
      role: "Head of Commercial & Brand Alliances",
      bio: "Former real-estate lead for national retail and QSR chains across South India.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rohit Malhotra",
      role: "Director, Luxury Residential Advisory",
      bio: "Advised over 400+ HNIs and CXOs in acquiring trophy residences and estates in Bengaluru.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            About SSR Realty
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Engineering Trust, Technology & Opportunity in Real Estate
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with a conviction that property advisory should be intelligent, transparent, and enterprise-grade.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Our Long-Term Vision
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To build India&apos;s leading property technology and institutional advisory network where:
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono font-bold text-slate-800">
              <div className="text-blue-700">PROPERTY → SSR → BRAND</div>
              <div className="text-amber-700">BUYER DEMAND → SSR → PROPERTY</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              We eliminate information asymmetry by providing geospatial footfall telemetry, legal verification, and direct matchmaking between asset owners and corporate operators.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">
              The SSR Standard of Integrity
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every property listed on SSR Realty undergoes a 4-tier due-diligence protocol:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>RERA Registration and approved building plans verified</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Encumbrance certificates & title search through legal counsel</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>On-site physical inspection for carpet area & power load compliance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Transparent pricing with zero hidden commissions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Advisory Leadership
            </h2>
            <p className="text-sm text-slate-500">
              Experienced real estate professionals combining localized market knowledge with technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col items-center text-center space-y-4"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                  <Image src={person.image} alt={person.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{person.name}</h3>
                  <div className="text-xs font-semibold text-blue-600 mt-0.5">{person.role}</div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
