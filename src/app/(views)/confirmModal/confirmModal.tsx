'use client';
import { FC } from 'react';

interface Props {
    isOpen:boolean;
  show?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
}

const ConfirmMiniModal: FC<Props> = ({ show, onCancel, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-sm shadow-lg space-y-4">
        <p className="text-center text-zinc-700 dark:text-zinc-100 text-sm">
          {message || '¿Seguro que quieres hacer esto?'}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded hover:bg-gray-300 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMiniModal;
