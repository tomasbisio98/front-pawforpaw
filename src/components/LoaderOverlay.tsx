"use client";

export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="bg-white border border-gray-300 rounded-2xl shadow-xl px-6 py-4 flex flex-col items-center justify-center space-y-2">
        <div className="w-8 h-8 border-4 border-[#2C5959] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold text-[#2C5959]">Cargando...</span>
      </div>
    </div>
  );
}
