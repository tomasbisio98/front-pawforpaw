

const Newletter = () => {

    return(
        <>
         <section className="mt-4 space-y-2">
            <span className="block text-sm font-medium">
              SUSCRÍBETE A NUESTRO NEWSLETTER
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="h-10 rounded-lg w-60 px-4 text-[#2A5559] bg-[#F2F2F0] placeholder:text-[#3f271a] focus:outline-none"
              />
              <button className="h-10 px-4 rounded-lg bg-[#33A69A] text-white hover:bg-[#2A5559] transition-colors">
                Enviar
              </button>
            </div>
          </section>
        </>
    )

}
export default Newletter;
