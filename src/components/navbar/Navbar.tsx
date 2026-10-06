"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EnquiryModal } from "@/components/forms/EnquiryModal";
import {
  Building2,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Phone,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [listPropertyDropdownOpen, setListPropertyDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setListPropertyDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Residential", href: "/residential" },
    { label: "Commercial", href: "/commercial" },
    { label: "Developers", href: "/developers" },
    { label: "Landlords", href: "/landlords" },
    { label: "Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#0b132b]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3.5"
            : "bg-[#0b132b] border-b border-white/5 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 border border-white/20">
              <span className="font-heading font-extrabold text-lg tracking-wider">SSR</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-blue-200 transition-colors">
                SSR <span className="text-amber-400 font-semibold">REALTY</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                Properties & Opportunities
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Admin CRM Shortcut */}
            <Link
              href="/admin"
              className={cn(
                "ml-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border transition-all",
                isAdminRoute
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white"
              )}
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>CRM</span>
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* List Property with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setListPropertyDropdownOpen(!listPropertyDropdownOpen)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <span>List a Property</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {listPropertyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0F1E36] border border-white/10 shadow-2xl p-2 z-50 animate-slide-up"
                  onMouseLeave={() => setListPropertyDropdownOpen(false)}
                >
                  <Link
                    href="/landlords"
                    className="flex flex-col p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors"
                    onClick={() => setListPropertyDropdownOpen(false)}
                  >
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      Commercial Property
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Connect with brands, banks & QSRs
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setListPropertyDropdownOpen(false);
                      setEnquiryModalOpen(true);
                    }}
                    className="flex flex-col w-full p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors border-t border-white/5 mt-1"
                  >
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Residential Resale / Rent
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      List your apartment or luxury villa
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Enquire Now CTA */}
            <Button
              variant="gold"
              size="sm"
              onClick={() => setEnquiryModalOpen(true)}
              className="font-semibold shadow-md shadow-amber-600/10"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="gold"
              size="sm"
              onClick={() => setEnquiryModalOpen(true)}
              className="text-xs py-1.5 px-3"
            >
              Enquire
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0b132b] px-4 pt-4 pb-6 space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <Link
                href="/residential"
                className="p-3 rounded-xl bg-white/5 text-white font-medium text-sm text-center border border-white/5"
              >
                Residential
              </Link>
              <Link
                href="/commercial"
                className="p-3 rounded-xl bg-white/5 text-white font-medium text-sm text-center border border-white/5"
              >
                Commercial
              </Link>
            </div>

            <div className="space-y-1">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-amber-400 hover:bg-white/5 transition-colors"
              >
                Admin CRM Dashboard →
              </Link>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/landlords"
                className="w-full inline-flex items-center justify-center p-3 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/10"
              >
                List a Commercial Property
              </Link>
              <Button
                variant="gold"
                className="w-full py-3"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
              >
                Enquire Now
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
};
