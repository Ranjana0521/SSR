"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESIDENTIAL_PROPERTIES, COMMERCIAL_PROPERTIES } from "@/data/mockData";
import { PropertyCard } from "@/components/property/PropertyCard";
import { HeroSearch } from "@/components/hero/HeroSearch";
import { ResidentialCategories } from "@/components/home/ResidentialCategories";
import { CommercialSpotlight } from "@/components/home/CommercialSpotlight";
import { LocationIntelligenceFlow } from "@/components/commercial/LocationIntelligenceFlow";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { EnquiryModal } from "@/components/forms/EnquiryModal";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Star,
  Quote,
} from "lucide-react";

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const featuredResidential = RESIDENTIAL_PROPERTIES.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-24 overflow-hidden">
        {/* Full-width Luxury Real Estate Visual Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="SSR Realty Luxury Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Subtle Multi-layer Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070e1b]/90 via-[#0b132b]/80 to-[#070e1b]/98" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.25)_0,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          {/* Subtle Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-6 shadow-xl animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bengaluru&apos;s Marquee Residential & Commercial PropTech Ecosystem</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading max-w-4xl leading-[1.08] drop-shadow-sm">
            Find the Right Property.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300">
              Build the Right Opportunity.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
            Residential properties, commercial opportunities and strategic real-estate solutions — connected through SSR Realty.
          </p>

          {/* Quick Metrics Bar on Hero */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <strong className="text-white text-base">500+</strong> Properties
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <strong className="text-white text-base">100+</strong> Active Opportunities
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong className="text-white text-base">50+</strong> Brand Connections
            </div>
          </div>

          {/* Interactive Floating Search Card */}
          <div className="mt-9 w-full">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* 2. PARTNERS & TRUST METRICS */}
      <PartnerLogos />

      {/* 3. RESIDENTIAL CATEGORIES (4 cards) */}
      <ResidentialCategories />

      {/* 4. FEATURED RESIDENTIAL HOMES SHOWCASE */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Curated Selection
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Featured Residential Residences
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-xl">
                Handpicked luxury apartments, penthouses, and gated villas across Whitefield, Sarjapur, Lavelle Road, and Hebbal.
              </p>
            </div>

            <Link
              href="/residential"
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View All 14+ Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResidential.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMMERCIAL SPOTLIGHT */}
      <CommercialSpotlight />

      {/* 6. LOCATION INTELLIGENCE SECTION ("From Property to Opportunity") */}
      <LocationIntelligenceFlow />

      {/* 7. HOW SSR WORKS (01 Discover, 02 Connect, 03 Match, 04 Convert) */}
      <HowItWorks />

      {/* 8. CLIENT & BRAND TESTIMONIALS */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Client & Brand Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Trusted by Homebuyers, Landlords & National Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;SSR Realty helped us close our 100ft Road Indiranagar flagship in record time. Their footfall data and landlord relationship made the lease agreement seamless.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  TH
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pooja Hegde</h4>
                  <p className="text-[11px] text-slate-500">BDM Lead, Third Wave Coffee</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;Finding a Vastu-compliant villa with clear legal titles in Sarjapur was daunting until we consulted SSR. The advisor accompanied us to every inspection and handled RERA verification.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  AV
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Aditya Verma</h4>
                  <p className="text-[11px] text-slate-500">Homebuyer, The Grand Sovereign</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;As a commercial property owner, having SSR Realty curate high-credit corporate tenants rather than random brokers saved us months of vacancy and legal headaches.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                  SR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Suresh Reddy</h4>
                  <p className="text-[11px] text-slate-500">Commercial Landlord, Indiranagar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONVERSION BANNER */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-[#070e1b] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Start Your Real-Estate Journey Today
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading max-w-3xl mx-auto">
            Ready to Discover Your Next Residential Home or Commercial Property?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Connect with our dedicated advisors for confidential discussions, customized site visits, and institutional location matching.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={() => setEnquiryOpen(true)}
              className="px-8 font-bold shadow-xl shadow-amber-600/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Enquire with an Advisor
            </Button>
            <Link href="/commercial">
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-white border-white/20 bg-white/5 hover:bg-white/10"
              >
                Browse Commercial Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Interactive Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
}
