"use client";
import React from "react";

export default function ProductModalPage({ params }: { params: { slug: string[] } }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Modal de producto para: {params.slug.join(" / ")}</h1>
    </div>
  );
}
