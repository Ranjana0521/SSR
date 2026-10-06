import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Key, Building2, Home } from "lucide-react";

export const ResidentialCategories: React.FC = () => {
  const categories = [
    {
      title: "New Launches",
      subtitle: "Modern new developments",
      description: "High-potential pre-launch & upcoming phase luxury residences with early pricing advantages.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      href: "/residential?possession=New+Launch",
      count: "18+ Projects",
      icon: Sparkles,
      badge: "Early Access",
    },
    {
      title: "Resale",
      subtitle: "Verified resale opportunities",
      description: "A-Khata clear-title residential duplexes, prime apartments, and ready villas with immediate occupancy.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      href: "/residential?tx=Buy",
      count: "45+ Properties",
      icon: Building2,
      badge: "Clear Title",
    },
    {
      title: "Rentals",
      subtitle: "Homes available for rent",
      description: "Executive furnished homes, penthouses, and gated community villas suited for corporate leaders & families.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      href: "/residential?tx=Rent",
      count: "30+ Homes",
      icon: Key,
      badge: "Furnished & Serviced",
    },
    {
      title: "Ready to Move",
      subtitle: "Properties ready for immediate possession",
      description: "Zero GST, OC received luxury residences ready for instant registration and handover.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      href: "/residential?possession=Ready+to+Move",
      count: "60+ Residences",
      icon: Home,
      badge: "OC Received",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Residential Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Explore Residential Opportunities
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              Curated luxury living spaces backed by thorough legal verification and developer due-diligence.
            </p>
          </div>

          <Link
            href="/residential"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span>View All Residential Properties</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Icon & Count */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-200">
                      {cat.count}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {cat.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <Link href={cat.href} className="pt-2">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Properties</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
