
const WhySupportUs = () => {
  return (
    <section className="mt-20 ">
      <h2 className="text-2xl font-bold text-verdeOscuro text-center mb-6">
        ¿Por qué apoyarnos?
      </h2>
      <div className="grid md:grid-cols-3 gap-6 px-4">
        <div className="bg-blancoConVerde p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-2">🐾</div>
          <h3 className="font-bold text-lg text-verdeOscuro">Rescate con amor</h3>
          <p className="text-sm text-marronOscuro mt-1">
            Cada peludo recibe atención y cariño desde el primer momento.
          </p>
        </div>
        <div className="bg-blancoConVerde p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-2">🏠</div>
          <h3 className="font-bold text-lg text-verdeOscuro">Adopciones responsables</h3>
          <p className="text-sm text-marronOscuro mt-1">
            Buscamos familias comprometidas para un hogar feliz.
          </p>
        </div>
        <div className="bg-blancoConVerde p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-2">🌱</div>
          <h3 className="font-bold text-lg text-verdeOscuro">Educación y conciencia</h3>
          <p className="text-sm text-marronOscuro mt-1">
            Promovemos el respeto por todos los seres vivos.
          </p>
        </div>
      </div>
    </section>
    
  );
};

export default WhySupportUs;
