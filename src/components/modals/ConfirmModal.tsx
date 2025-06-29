'use client';

import React from 'react';


interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white text-negro rounded-lg p-6 w-full max-w-sm shadow-lg text-center space-y-4 animate-fadeIn">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-verdeMOscuro text-white px-4 py-2 rounded hover:bg-verdeClaro transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
