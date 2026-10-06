import React from "react";
import { Compass, Send, GitMerge, CheckCircle, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Discover",
      subtitle: "Explore properties & commercial opportunities",
      description:
        "Browse verified residential residences or review prime commercial assets evaluated by our Bangalore micro-market team.",
      icon: Compass,
      tag: "Intelligence",
    },
    {
      number: "02",
      title: "Connect",
      subtitle: "Submit your requirement to SSR",
      description:
        "Whether you are an aspiring homeowner, commercial landlord, or expanding brand, submit your exact parameters securely.",
      icon: Send,
      tag: "Direct Access",
    },
    {
      number: "03",
      title: "Match",
      subtitle: "SSR aligns requirements with opportunities",
      description:
        "Our specialized advisors pair buyer demand directly with developers, and match commercial spaces with high-growth brand tenants.",
      icon: GitMerge,
      tag: "Proprietary Alignment",
    },
    {
      number: "04",
      title: "Convert",
      subtitle: "Site visit, negotiation & closure",
      description:
        "From personalized accompanied site visits to lease drafting, legal vetting, and RERA compliance — SSR handles end-to-end execution.",
      icon: CheckCircle,
      tag: "Full Execution",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            The SSR Real Estate Model
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            How SSR Realty Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A frictionless, high-trust advisory workflow connecting property, people, business, and opportunity.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-extrabold font-mono text-slate-200 group-hover:text-blue-600 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-slate-700 group-hover:text-blue-600 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
                    {step.tag}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-600 mt-0.5">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-600 font-medium transition-colors">
                  <span>Step {step.number}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
