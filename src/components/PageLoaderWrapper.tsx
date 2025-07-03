"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoaderOverlay from "@/components/LoaderOverlay";

export default function PageLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative">
      {loading && <LoaderOverlay />}
      {children}
    </div>
  );
}
