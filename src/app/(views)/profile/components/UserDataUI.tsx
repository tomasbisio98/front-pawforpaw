/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getUserById, updateUserById } from '@/service/user';
import { useEffect, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useAuthContext } from '@/context/authContext';
import { toast } from 'react-toastify';
import { validationInfoUser } from '@/helpers/validationAuth';
import { FaUserEdit } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { IUsers } from '@/interface/IUsers';



const UserDataUI = () => {
  const { user, token, saveUserData } = useAuthContext();
  const [userData, setUserData] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !user?.id) return;
      try {
        const result = await getUserById(user.id, token);
        setUserData(result);
      } catch (error: any) {
        console.error("🔥 ERROR EN EL FETCH:", error.response || error.message || error);
      } finally {
        setLoading(false);
      }
    };
    if (token && user?.id) fetchUser();
  }, [token, user?.id]);

  if (!token || !user?.id || loading) {
    return <p className="text-center text-emerald-600">Cargando tu perfil...</p>;
  }

  if (!userData) {
    return <p className="text-center text-red-500">No se pudo cargar tu información 😥</p>;
  }

  return (
    <div className="flex justify-center items-start bg-blancoSuave p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* lado no editable */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4 border-2 border-verdeClaro">
          <h2 className="text-2xl font-bold text-verdeOscuro flex items-center gap-2">
            <HiOutlineInformationCircle /> Tu información actual
          </h2>
          <p className="text-negro"><strong>Nombre:</strong> {userData.name}</p>
          <p className="text-negro"><strong>Email:</strong> {userData.email}</p>
          <p className="text-negro"><strong>Teléfono:</strong> {userData?.phone || "No registrado"}</p>
        </div>

        {/* Columna derecha */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6 border-2 border-[#33A691]">
          <h2 className="text-2xl font-bold text-verdeOscuro flex items-center gap-2">
            <FaUserEdit /> Editar Perfil
          </h2>

          <Formik
            enableReinitialize
            initialValues={{ name: '', phone: '' }}
            validationSchema={validationInfoUser}
            onSubmit={async (values, { resetForm }) => {
              toast.info("🧠 Confirmando cambios...", {
                autoClose: 2500,
              });

              setTimeout(async () => {
                const confirm = window.confirm("¿Estás segura que quieres actualizar tu perfil?");
                if (!confirm) return;
                try {
                  const updated = await updateUserById(user.id as string, values, token);
                  saveUserData({ user: updated, token });
                  toast.success("🎉 Perfil actualizado con éxito");
                  setUserData(updated);
                  resetForm();
                } catch (e) {
                  console.error("⚠️ Error actualizando perfil:", e);
                  toast.error("Hubo un error al actualizar el perfil");
                }
              }, 1500);
            }}
          >
            <Form className="space-y-5">

              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-verdeOscuro">Nombre</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Nuevo nombre"
                  className="border border-verdeClaro rounded-lg px-4 py-2 bg-blancoSuave text-negro"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-[#2C5959]">Teléfono</label>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Nuevo teléfono"
                  className="border border-verdeClaro rounded-lg px-4 py-2 bg-blancoSuave text-negro"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B9780] text-white py-2 rounded-xl hover:bg-verdeClaro transition-all"
              >
                Guardar cambios
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserDataUI;

