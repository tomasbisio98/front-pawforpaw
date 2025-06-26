'use client';

import { IProducts } from '@/interface/IProducts';
import Image from 'next/image';

interface DonationModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  product: IProducts | null;
}

const DonationModal = ({ open, setOpen, product }: DonationModalProps) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-700"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Resumen de tu donación
        </h3>

        <div className="flex flex-col items-center">
          <Image
            src={product.imgUrl}
            alt={product.name}
            width={220}
            height={150}
            className="rounded mb-4 object-cover"
          />
          <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
          <p className="text-gray-600 text-base mb-6">
            Precio: ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setOpen(false)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;