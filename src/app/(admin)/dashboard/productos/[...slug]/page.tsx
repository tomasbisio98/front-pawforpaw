"use client";
import { useParams } from "next/navigation";

export default function ProductModalPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug : [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Modal de producto para: {slug.join(" / ")}
      </h1>
    </div>
  );
}
