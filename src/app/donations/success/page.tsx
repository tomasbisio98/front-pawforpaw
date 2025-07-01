'use client'
import { Suspense } from "react";
import SuccessContent from "./SuccessContent";
import useAdminOutOfPublic from "@/hooks/useAdminOutOfPublic";
import usePrivate from "@/hooks/usePrivate";

export default function SuccessPage() {
  
     const loading = usePrivate();
     const protection = useAdminOutOfPublic() // 🔐

  if (loading) return loading
  

  if (protection) return protection;
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
