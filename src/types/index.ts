export type PropertyCategory = "residential" | "commercial";

export type ResidentialType = 
  | "Apartment" 
  | "Luxury Penthouse" 
  | "Gated Villa" 
  | "Plotted Development" 
  | "Duplex";

export type CommercialType = 
  | "Retail Space" 
  | "QSR Location" 
  | "Grade A Office" 
  | "Showroom" 
  | "High Street Property" 
  | "Commercial Building" 
  | "Land Parcel";

export type PossessionStatus = 
  | "Ready to Move" 
  | "Under Construction" 
  | "New Launch" 
  | "Immediate Possession";

export type FurnishingStatus = "Unfurnished" | "Semi-Furnished" | "Fully Furnished" | "Warm Shell" | "Bare Shell";

export type TransactionType = "Buy" | "Rent" | "Lease";

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category?: string;
}

export interface NearbyPlace {
  category: "Metro" | "IT Park" | "School" | "Hospital" | "Mall" | "Highway";
  name: string;
  distance: string;
}

export interface FloorPlan {
  bhk: string;
  superBuiltUpArea: number; // in sq ft
  carpetArea: number; // in sq ft
  price: number; // in INR
  image: string;
}

export interface BaseProperty {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  category: PropertyCategory;
  location: {
    city: string;
    micromarket: string; // e.g., Whitefield, Indiranagar
    address: string;
    pincode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price: number; // in INR (e.g., 18500000 for 1.85 Cr)
  priceDisplay: string; // "₹1.85 Cr" or "₹1.5 L / mo"
  pricePerSqFt?: number;
  transactionType: TransactionType;
  areaSqFt: number;
  featured: boolean;
  status: "available" | "under_offer" | "sold" | "leased";
  images: string[];
  description: string;
  highlights: string[];
  postedAt: string;
  updatedAt: string;
}

export interface ResidentialProperty extends BaseProperty {
  category: "residential";
  propertyType: ResidentialType;
  bhk: number; // e.g., 2, 3, 4
  bathrooms: number;
  balconies: number;
  carpetAreaSqFt: number;
  possession: PossessionStatus;
  possessionDate?: string;
  furnishing: FurnishingStatus;
  floor: number;
  totalFloors: number;
  facing: "North" | "East" | "North-East" | "West" | "South";
  reraId?: string;
  developer: {
    id: string;
    name: string;
    logo?: string;
    establishedYear?: number;
    totalProjects?: number;
  };
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  floorPlans: FloorPlan[];
  brochureUrl?: string;
}

export interface CommercialProperty extends BaseProperty {
  category: "commercial";
  commercialType: CommercialType;
  carpetAreaSqFt: number;
  frontageFeet: number; // road frontage
  ceilingHeightFeet: number;
  powerLoadKva: number;
  parkingSpaces: number;
  suitableFor: string[]; // ["QSR", "Bank", "Retail", "Showroom", "Supermarket"]
  visibilityScore: "High" | "Premium" | "Corner Property" | "Main Road";
  footfallDensity: "Very High" | "High" | "Moderate";
  fitoutStatus: "Bare Shell" | "Warm Shell" | "Fully Fitted";
  lockInPeriodYears?: number;
  securityDepositMonths?: number;
  escalationPercent?: number;
  landlordId?: string;
}

export type Property = ResidentialProperty | CommercialProperty;

export type LeadStatus = 
  | "NEW" 
  | "CONTACTED" 
  | "QUALIFIED" 
  | "SITE VISIT" 
  | "NEGOTIATION" 
  | "CLOSED" 
  | "LOST";

export type LeadSource = 
  | "Website Form" 
  | "Property Details Page" 
  | "WhatsApp" 
  | "Commercial Landing" 
  | "Landlord Portal" 
  | "Brand Expansion" 
  | "Direct Referral";

export interface LeadNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  code: string; // e.g. "SSR-L-1042"
  fullName: string;
  email: string;
  phone: string;
  requirementType: "Buy" | "Rent" | "Commercial Lease" | "Landlord Listing" | "Brand Expansion";
  propertyCategory: PropertyCategory;
  preferredLocations: string[];
  targetBudget: {
    min: number;
    max: number;
    display: string;
  };
  configuration?: string; // "3 BHK", "5,000 sq ft Showroom", etc.
  propertyId?: string;
  propertyTitle?: string;
  source: LeadSource;
  assignedTo: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  status: LeadStatus;
  timeline: string; // "Immediate (30 days)", "1-3 months", etc.
  notes: LeadNote[];
  siteVisitDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Developer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  description: string;
  headquarters: string;
  ongoingProjects: number;
  completedProjects: number;
  experienceYears: number;
  featuredProjects: string[];
}

export interface Landlord {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertiesCount: number;
  activeLeases: number;
  preferredTenants: string[];
  joinedDate: string;
}

export interface Brand {
  id: string;
  name: string;
  category: "QSR" | "Retail" | "Bank" | "Automobile" | "Healthcare" | "Supermarket" | "Fitness" | "Coworking";
  logo?: string;
  expansionCities: string[];
  targetSqFt: string;
  outletsTarget: number;
  activeRequirements: number;
  pocName: string;
  pocContact: string;
}

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  propertyId: string;
  propertyTitle: string;
  date: string;
  timeSlot: string;
  assignedAdvisor: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "sales_advisor" | "commercial_bdm" | "manager";
  avatar?: string;
}
