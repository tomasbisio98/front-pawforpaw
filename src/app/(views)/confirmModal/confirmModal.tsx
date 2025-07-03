'use client';
import { FC, useState } from 'react';

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const ConfirmModal: FC<Props> = ({ open, title, message, onCancel, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (e) {
      console.error("❌ Error en confirmación:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-blancoSuave border-2 border-verdeClaro rounded-xl shadow-lg p-6 w-full max-w-md space-y-6 text-center">
        {/* Ícono */}
        <div className="text-3xl">⚠️</div>

        {/* Título */}
        {title && (
          <h3 className="text-lg font-bold text-verdeOscuro">
            {title}
          </h3>
        )}

        {/* Mensaje */}
        <p className="text-sm text-negro">
          {message || "¿Seguro que quieres hacer esto?"}
        </p>

        {/* Botones centrados */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-negro hover:bg-gray-300 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 transition-all
              ${loading ? 'bg-[#78c0aa] cursor-not-allowed' : 'bg-[#1B9780] hover:bg-verdeClaro'}`}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{loading ? "Confirmando..." : "Confirmar"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
