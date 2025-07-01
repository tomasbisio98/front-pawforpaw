
const Testimonials = () => {
  return (
    <section className="mt-20 p-8 rounded-2xl shadow-inner">
      <h2 className="text-2xl font-bold text-verdeOscuro text-center mb-6">
        Lo que dicen de nosotros
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <blockquote className="bg-white p-6 rounded-xl shadow text-sm text-marronOscuro">
          <p className="italic">
            Gracias a la fundación, adopté a Rocky. Es mi mejor amigo y me acompaña a todas partes 🐶💛
          </p>
          <footer className="mt-2 font-semibold">— Camila P.</footer>
        </blockquote>
        <blockquote className="bg-white p-6 rounded-xl shadow text-sm text-marronOscuro">
          <p className="italic">
            La experiencia de donar fue súper sencilla y gratificante. ¡100% recomendados!
          </p>
          <footer className="mt-2 font-semibold">— Julián R.</footer>
        </blockquote>
      </div>
    </section>
  );
};

export default Testimonials;
