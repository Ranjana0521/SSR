import React from "react";
import { COMMERCIAL_PROPERTIES } from "@/data/mockData";
import { CommercialDetailsClient } from "./CommercialDetailsClient";

export function generateStaticParams() {
  return COMMERCIAL_PROPERTIES.map((p) => ({
    slug: p.slug,
  }));
}

export default function CommercialDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CommercialDetailsClient slug={params.slug} />;
}
