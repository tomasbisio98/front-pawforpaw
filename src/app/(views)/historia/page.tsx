/* eslint-disable @next/next/no-img-element */
import React from "react";

const Historia = () => {
  return (
      <main className="min-h-screen  bg-[#F2F2F0] px-6 py-10 flex flex-col items-center ">
     
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Nuestra Historia
      </h1>

        <div className="w-full max-w-6xl mb-10 flex flex-col lg:flex-row items-center gap-4 pt-6">
            
            <img
            src="https://img.huffingtonpost.es/files/image_1200_720/uploads/2024/08/16/support-care-or-happy-family-men-and-kids-bonding-with-foster-puppy-or-pet-and-enjoying-time-together.jpeg"
            alt="Imagen de la fundación"
            className="rounded-xl object-cover w-2/5 "
            />
        
            <section className="text-center lg:text-center ml-2 -mt-20">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 ">
                El comienzo de nuestra misión
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Desde nuestros primeros pasos, nuestra fundación ha trabajado por el bienestar de quienes más lo necesitan.
                Creemos en la solidaridad, el compromiso y la esperanza. Esta es solo una parte del camino que hemos recorrido juntos.
                </p>
            </section>
        </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl m-20">
        <img
          src="https://www.premiosvoluntariado.com/sites/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1591780263740&ssbinary=true"
          alt="Momento 1"
          className="rounded-lg object-cover w-full h-auto "
        />
        <img
          src="https://elmundo.cr/wp-content/uploads/2024/07/Zaguaton-2.jpg"
          alt="Momento 2"
          className="rounded-lg object-cover w-full h-auto"
        />
        <img
          src="https://us.123rf.com/450wm/dekazigzag/dekazigzag2210/dekazigzag221000391/192825598-ni%C3%B1o-y-ni%C3%B1a-activos-hermano-y-hermana-abrazando-amorosamente-a-su-perro-mascota-al-aire-libre-en.jpg?ver=6"
          alt="Momento 3"
          className="rounded-lg object-cover w-full h-auto"
        />
      </div>
    </main>

  );
};

export default Historia;
