'use client';

import { getUser } from '@/service/user';
import { IUsers } from '@/interface/IUsers';
import { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const UserDataUI = () => {
  const [user, setUser] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center">Cargando datos del usuario...</p>;
  if (!user) return <p className="text-center text-red-500">No se pudo cargar el usuario.</p>;

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 dark:bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 shadow-md rounded-2xl p-6 mt-10 space-y-6">
        <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
          🧑‍💼 Editar Perfil
        </h2>

        <Formik
          initialValues={{
            name: user.name,
            phone: user.phone,
          }}
          onSubmit={(values) => {
            console.log("Datos enviados:", values);
          }}
        >
          {() => (
            <Form className="space-y-5">
              {/* Nombre */}
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-500" />
                <Field
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 dark:bg-zinc-700 dark:text-white dark:border-gray-600"
                />
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-3">
                <FaPhone className="text-green-500" />
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Teléfono"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 dark:bg-zinc-700 dark:text-white dark:border-gray-600"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 opacity-60">
                <FaEnvelope className="text-red-500" />
                <span className="text-sm text-zinc-600 dark:text-gray-400">
                  {user.email}
                </span>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
              >
                Guardar cambios
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserDataUI;
