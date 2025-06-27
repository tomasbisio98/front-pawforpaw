import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
