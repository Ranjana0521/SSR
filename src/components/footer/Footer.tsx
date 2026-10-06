import React from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070e1b] text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-white/20">
                <span className="font-heading font-extrabold text-lg tracking-wider">SSR</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-tight text-white">
                  SSR <span className="text-amber-400 font-semibold">REALTY</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                  Properties & Opportunities
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              SSR Realty connects residential demand with top-tier developer homes, and matches commercial landlord assets with leading QSR, retail, healthcare, and corporate brands across Bengaluru.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Level 7, Prestige Falcon Towers, Brunton Road, Off MG Road, Bengaluru, Karnataka 560025</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 80 4968 8000 / +91 98450 18420</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>advisory@ssrrealty.com / commercial@ssrrealty.com</span>
              </div>
            </div>
          </div>

          {/* Column: Residential */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Residential
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/residential?type=Apartment" className="hover:text-white transition-colors">
                  Luxury Apartments
                </Link>
              </li>
              <li>
                <Link href="/residential?type=Gated+Villa" className="hover:text-white transition-colors">
                  Gated Villas & Estates
                </Link>
              </li>
              <li>
                <Link href="/residential?type=Luxury+Penthouse" className="hover:text-white transition-colors">
                  Sky Mansions & Penthouses
                </Link>
              </li>
              <li>
                <Link href="/residential?possession=New+Launch" className="hover:text-white transition-colors">
                  New Launches & Pre-registrations
                </Link>
              </li>
              <li>
                <Link href="/residential?possession=Ready+to+Move" className="hover:text-white transition-colors">
                  Ready-to-Move Verified Homes
                </Link>
              </li>
              <li>
                <Link href="/residential?tx=Rent" className="hover:text-white transition-colors">
                  Executive Corporate Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Commercial */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Commercial & Brands
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/commercial?type=High+Street+Property" className="hover:text-white transition-colors">
                  High Street Flagships
                </Link>
              </li>
              <li>
                <Link href="/commercial?type=QSR+Location" className="hover:text-white transition-colors">
                  QSR & Café Sites
                </Link>
              </li>
              <li>
                <Link href="/commercial?type=Grade+A+Office" className="hover:text-white transition-colors">
                  Grade A Tech Parks & SEZs
                </Link>
              </li>
              <li>
                <Link href="/commercial?type=Showroom" className="hover:text-white transition-colors">
                  Automobile & Retail Showrooms
                </Link>
              </li>
              <li>
                <Link href="/commercial?type=Land+Parcel" className="hover:text-white transition-colors">
                  Commercial Land Parcels
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors text-amber-400 font-medium">
                  Brand Expansion Network →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Platform & Partners */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Ecosystem & Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/landlords" className="hover:text-white transition-colors">
                  Landlord Asset Submission
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-white transition-colors">
                  Developer Partnerships
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Brand Expansion Intake
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SSR Realty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Advisory Headquarters
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                  <span>Internal CRM Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* RERA and Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Karnataka RERA Authorized Real Estate Agent: <strong>AG/KA/RERA/1251/2024/00189</strong>. All project details are verified through developer filings.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} SSR Realty Technologies Private Limited. All rights reserved.</span>
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
