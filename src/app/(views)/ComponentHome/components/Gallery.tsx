/* eslint-disable @next/next/no-img-element */

const Gallery = () => {
  const historias = [
    {
      src: "https://res.cloudinary.com/dziccimdv/image/upload/v1751336749/perrito2_w7odep.jpg",
      alt: "Perrito feliz",
      nombre: "Rusty",
      historia:
        "Rusty llegó desnutrido y con miedo. Hoy corre feliz en su nuevo hogar lleno de amor. 🐾💛",
    },
    {
      src: "https://res.cloudinary.com/dziccimdv/image/upload/v1751337442/perrito1_dr6kdk.jpg",
      alt: "Voluntarios",
      nombre: "Luna",
      historia:
        "Luna fue rescatada de la calle con una patita herida. Hoy es la reina de su casa y duerme en cama. 🛏️🐶",
    },
    {
      src: "https://res.cloudinary.com/dziccimdv/image/upload/v1751336746/perrito-3_wsddzy.avif",
      alt: "Adopción",
      nombre: "Tito",
      historia:
        "Tito era muy tímido, pero con paciencia volvió a confiar. Hoy no se despega de su compañera. 🥰",
    },
  ];

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-bold text-verdeOscuro text-center">
        Historias que inspiran
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {historias.map((perrito, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={perrito.src}
              alt={perrito.alt}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-verdeOscuro font-bold text-lg">{perrito.nombre}</h3>
              <p className="text-sm text-marronOscuro leading-snug">{perrito.historia}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

