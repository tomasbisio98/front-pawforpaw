"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CancelContent from "./CancelContent";
import useAdminOutOfPublic from "@/hooks/useAdminOutOfPublic";
import usePrivate from "@/hooks/usePrivate";

export default function CancelPage() {
  const loading = usePrivate();
  const protection = useAdminOutOfPublic();

  if (loading) return loading;
  if (protection) return protection;

  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
      <CancelContent />
    </Suspense>
  );
}
