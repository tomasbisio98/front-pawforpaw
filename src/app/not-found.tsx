

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blancoSuave flex flex-col items-center justify-center text-center px-6 text-verdeOscuro">
  <h1 className="text-7xl font-extrabold mb-4">404 🐶</h1>
  <p className="text-xl mb-2 font-semibold">¡Oops! Alguien pisó la huella equivocada..🐾🐾</p>
  <p className="mb-6">Pero no hay de qué preocuparse, ¡te llevamos de vuelta!</p>
  <Link href="/" className="bg-verdeOscuro text-white px-6 py-2 rounded-full hover:bg-verdeClaro transition">
    Volver al inicio
  </Link>
</div>

);
}
export default NotFound;
