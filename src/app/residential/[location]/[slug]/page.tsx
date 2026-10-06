import React from "react";
import { RESIDENTIAL_PROPERTIES } from "@/data/mockData";
import { slugify } from "@/lib/utils";
import { PropertyDetailsClient } from "./PropertyDetailsClient";

export function generateStaticParams() {
  return RESIDENTIAL_PROPERTIES.map((p) => ({
    location: slugify(p.location.micromarket),
    slug: p.slug,
  }));
}

export default function PropertyDetailsPage({
  params,
}: {
  params: { location: string; slug: string };
}) {
  return <PropertyDetailsClient location={params.location} slug={params.slug} />;
}
