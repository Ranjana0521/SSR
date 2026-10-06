"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESIDENTIAL_PROPERTIES, COMMERCIAL_PROPERTIES } from "@/data/mockData";
import { Property, ResidentialProperty, CommercialProperty } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import {
  Building2,
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Star,
  MapPin,
  Maximize2,
  DollarSign,
  ArrowRight,
} from "lucide-react";

export default function PropertyManagementPage() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [resProperties, setResProperties] = useState<ResidentialProperty[]>(RESIDENTIAL_PROPERTIES);
  const [comProperties, setComProperties] = useState<CommercialProperty[]>(COMMERCIAL_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<"residential" | "commercial">("residential");
  const [formType, setFormType] = useState("Apartment");
  const [formPriceDisplay, setFormPriceDisplay] = useState("₹2.50 Cr");
  const [formPriceNum, setFormPriceNum] = useState(25000000);
  const [formMicromarket, setFormMicromarket] = useState("Whitefield");
  const [formArea, setFormArea] = useState(2100);
  const [formBhk, setFormBhk] = useState(3);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<"available" | "under_offer" | "sold">("available");
  const [formImageUrl, setFormImageUrl] = useState("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80");

  const openAddModal = () => {
    setEditingPropertyId(null);
    setFormCategory(activeTab);
    setFormTitle("");
    setFormType(activeTab === "residential" ? "Apartment" : "High Street Property");
    setFormPriceDisplay(activeTab === "residential" ? "₹2.20 Cr" : "₹6.5 L / mo");
    setFormPriceNum(activeTab === "residential" ? 22000000 : 650000);
    setFormMicromarket("Whitefield");
    setFormArea(2000);
    setFormBhk(3);
    setFormFeatured(false);
    setFormStatus("available");
    setIsModalOpen(true);
  };

  const openEditModal = (prop: ResidentialProperty | CommercialProperty) => {
    setEditingPropertyId(prop.id);
    setFormCategory(prop.category);
    setFormTitle(prop.title);
    setFormType(prop.category === "residential" ? (prop as ResidentialProperty).propertyType : (prop as CommercialProperty).commercialType);
    setFormPriceDisplay(prop.priceDisplay);
    setFormPriceNum(prop.price);
    setFormMicromarket(prop.location.micromarket);
    setFormArea(prop.areaSqFt);
    setFormBhk(prop.category === "residential" ? (prop as ResidentialProperty).bhk : 0);
    setFormFeatured(prop.featured);
    setFormStatus(prop.status as any);
    setFormImageUrl(prop.images[0] || "");
    setIsModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Please provide a property title.");
      return;
    }

    if (formCategory === "residential") {
      if (editingPropertyId) {
        setResProperties((prev) =>
          prev.map((p) =>
            p.id === editingPropertyId
              ? {
                  ...p,
                  title: formTitle,
                  propertyType: formType as any,
                  priceDisplay: formPriceDisplay,
                  price: formPriceNum,
                  areaSqFt: formArea,
                  bhk: formBhk,
                  featured: formFeatured,
                  status: formStatus as any,
                  location: { ...p.location, micromarket: formMicromarket },
                  images: [formImageUrl, ...p.images.slice(1)],
                }
              : p
          )
        );
      } else {
        const newRes: ResidentialProperty = {
          id: `res-${Date.now()}`,
          slug: formTitle.toLowerCase().replace(/\s+/g, "-"),
          title: formTitle,
          category: "residential",
          propertyType: formType as any,
          bhk: formBhk,
          bathrooms: formBhk,
          balconies: 2,
          areaSqFt: formArea,
          carpetAreaSqFt: Math.round(formArea * 0.8),
          price: formPriceNum,
          priceDisplay: formPriceDisplay,
          transactionType: "Buy",
          possession: "Ready to Move",
          furnishing: "Semi-Furnished",
          floor: 8,
          totalFloors: 24,
          facing: "East",
          featured: formFeatured,
          status: formStatus as any,
          location: {
            city: "Bengaluru",
            micromarket: formMicromarket,
            address: `${formMicromarket} Main Road`,
            pincode: "560066",
          },
          developer: { id: "dev-prestige", name: "Prestige Group" },
          images: [formImageUrl],
          description: "Premium newly listed residence in high-growth Bengaluru corridor.",
          highlights: ["Vastu-compliant", "Reserved car parking"],
          amenities: ["Swimming Pool", "Clubhouse", "24/7 Security"],
          nearbyPlaces: [],
          floorPlans: [],
          postedAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        };
        setResProperties([newRes, ...resProperties]);
      }
    } else {
      if (editingPropertyId) {
        setComProperties((prev) =>
          prev.map((p) =>
            p.id === editingPropertyId
              ? {
                  ...p,
                  title: formTitle,
                  commercialType: formType as any,
                  priceDisplay: formPriceDisplay,
                  price: formPriceNum,
                  areaSqFt: formArea,
                  featured: formFeatured,
                  status: formStatus as any,
                  location: { ...p.location, micromarket: formMicromarket },
                  images: [formImageUrl, ...p.images.slice(1)],
                }
              : p
          )
        );
      } else {
        const newCom: CommercialProperty = {
          id: `com-${Date.now()}`,
          slug: formTitle.toLowerCase().replace(/\s+/g, "-"),
          title: formTitle,
          category: "commercial",
          commercialType: formType as any,
          areaSqFt: formArea,
          carpetAreaSqFt: Math.round(formArea * 0.85),
          frontageFeet: 50,
          ceilingHeightFeet: 12,
          powerLoadKva: 60,
          parkingSpaces: 10,
          price: formPriceNum,
          priceDisplay: formPriceDisplay,
          transactionType: "Lease",
          featured: formFeatured,
          status: formStatus as any,
          visibilityScore: "Main Road",
          footfallDensity: "High",
          fitoutStatus: "Warm Shell",
          suitableFor: ["Retail", "QSR", "Bank"],
          location: {
            city: "Bengaluru",
            micromarket: formMicromarket,
            address: `${formMicromarket} Main Commercial Street`,
            pincode: "560038",
          },
          images: [formImageUrl],
          description: "Prime commercial space suited for brand expansion.",
          highlights: ["Approved commercial zoning", "Dedicated customer parking"],
          postedAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        };
        setComProperties([newCom, ...comProperties]);
      }
    }

    setIsModalOpen(false);
  };

  const handleDeleteProperty = (id: string, category: "residential" | "commercial") => {
    if (confirm("Are you sure you want to delete this property listing?")) {
      if (category === "residential") {
        setResProperties((prev) => prev.filter((p) => p.id !== id));
      } else {
        setComProperties((prev) => prev.filter((p) => p.id !== id));
      }
    }
  };

  const handleToggleFeatured = (id: string, category: "residential" | "commercial") => {
    if (category === "residential") {
      setResProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
      );
    } else {
      setComProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
      );
    }
  };

  const activeProperties = activeTab === "residential" ? resProperties : comProperties;
  const filteredProperties = activeProperties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.micromarket.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Property Inventory Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish, edit pricing, manage featured status, and audit live inventory across residential and commercial verticals.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={openAddModal}
          className="text-xs font-semibold"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Property
        </Button>
      </div>

      {/* Vertical Selector & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("residential")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "residential"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Residential ({resProperties.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("commercial")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "commercial"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Commercial ({comProperties.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Property Inventory Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0B1528] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Asset</th>
                <th className="p-3.5">Type & Location</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Area</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredProperties.map((prop) => {
                const isRes = prop.category === "residential";
                const resProp = prop as ResidentialProperty;
                const comProp = prop as CommercialProperty;

                return (
                  <tr key={prop.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Thumbnail + Title */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                          <Image
                            src={prop.images[0] || ""}
                            alt={prop.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-white truncate max-w-[200px]">
                            {prop.title}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {isRes ? resProp.developer.name : "Commercial Asset"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type & Location */}
                    <td className="p-3.5">
                      <span className="text-slate-200 font-medium block">
                        {isRes ? resProp.propertyType : comProp.commercialType}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {prop.location.micromarket}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      {prop.priceDisplay}
                    </td>

                    {/* Area */}
                    <td className="p-3.5 font-mono text-slate-300">
                      {prop.areaSqFt} sq.ft
                      {isRes && <span className="block text-[10px] text-slate-500">{resProp.bhk} BHK</span>}
                    </td>

                    {/* Featured Toggle */}
                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(prop.id, prop.category)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          prop.featured
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                            : "bg-slate-800 text-slate-500 border-slate-700 hover:text-white"
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-3.5 h-3.5 ${prop.featured ? "fill-amber-400" : ""}`} />
                      </button>
                    </td>

                    {/* Status */}
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        {prop.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEditModal(prop)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Edit Property"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProperty(prop.id, prop.category)}
                        className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:text-white hover:bg-rose-600 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PROPERTY MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPropertyId ? "Edit Property Parameters" : "Add New Property to Inventory"}
        description="Configure pricing, dimensions, location, and metadata for public display."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveProperty} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Property Title"
              required
              placeholder="e.g. Skyline Residences Penthouse"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Property Category
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-medium"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Property Type"
              placeholder="Apartment / Villa / Retail"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
            />
            <Input
              label="Display Price"
              placeholder="e.g. ₹2.45 Cr or ₹9.5 L / mo"
              value={formPriceDisplay}
              onChange={(e) => setFormPriceDisplay(e.target.value)}
            />
            <Input
              label="Numeric Price (INR)"
              type="number"
              placeholder="24500000"
              value={formPriceNum}
              onChange={(e) => setFormPriceNum(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Micro-market"
              placeholder="Whitefield / Indiranagar"
              value={formMicromarket}
              onChange={(e) => setFormMicromarket(e.target.value)}
            />
            <Input
              label="Total Area (sq.ft)"
              type="number"
              value={formArea}
              onChange={(e) => setFormArea(Number(e.target.value))}
            />
            {formCategory === "residential" ? (
              <Input
                label="BHK Bedrooms"
                type="number"
                value={formBhk}
                onChange={(e) => setFormBhk(Number(e.target.value))}
              />
            ) : (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Status
                </label>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                >
                  <option value="available">Available</option>
                  <option value="under_offer">Under Offer</option>
                  <option value="sold">Leased</option>
                </select>
              </div>
            )}
          </div>

          <Input
            label="Image URL (Unsplash or CDN)"
            placeholder="https://images.unsplash.com/..."
            value={formImageUrl}
            onChange={(e) => setFormImageUrl(e.target.value)}
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured-check"
              checked={formFeatured}
              onChange={(e) => setFormFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <label htmlFor="featured-check" className="text-xs font-bold text-slate-700">
              Highlight as Featured Property on Homepage
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingPropertyId ? "Save Changes" : "Create Listing"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
