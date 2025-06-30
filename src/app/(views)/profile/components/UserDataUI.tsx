/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getUserById, updateUserById } from "@/service/user";
import { useEffect, useRef, useState } from "react";
import {
  Field,
  Form,
  Formik,
  ErrorMessage,
  FormikProps,
} from "formik";
import { useAuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { validationInfoUser } from "@/helpers/validationAuth";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IUsers } from "@/interface/IUsers";
import usePrivate from "@/hooks/usePrivate";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { uploadUserImage } from "@/service/upload";
import Image from "next/image";

const UserDataUI = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState<{ name: string; phone: string } | null>(null);

  const { user, token, saveUserData } = useAuthContext();
  const [userData, setUserData] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const formikRef = useRef<FormikProps<{ name: string; phone: string }> | null>(null);

  usePrivate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !user?.id) return;
      try {
        const result = await getUserById(user.id, token);
        setUserData(result);
      } catch (error) {
        console.error("🔥 ERROR EN EL FETCH:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token && user?.id) fetchUser();
  }, [token, user?.id]);

  if (!token || !user?.id || loading) {
    return (
      <p className="text-center text-verdeOscuro p-15">Cargando tu perfil...</p>
    );
  }

  if (!userData) {
    return (
      <p className="text-center text-red-500 pt-10">
        No se pudo cargar tu información 😥
      </p>
    );
  }

  return (
    <div className="flex justify-center items-start p-28">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-blancoSuave p-6">
        {/* Columna izquierda */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4 border-2 border-verdeClaro flex flex-col items-center">
          <Image
            src={
              preview
                ? preview
                : userData.profileImgUrl ||
                  "https://via.placeholder.com/150?text=Sin+Foto"
            }
            alt="Foto de perfil"
            width={96}
            height={96}
            className="rounded-full border-4 border-verdeClaro object-cover shadow-md"
          />

          <h2 className="text-2xl font-bold text-verdeOscuro flex items-center gap-2 mt-4">
            <HiOutlineInformationCircle /> Tu información actual
          </h2>

          <div className="w-full space-y-2 text-center md:text-left">
            <p className="text-negro">
              <strong>Nombre:</strong> {userData.name}
            </p>
            <p className="text-negro">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="text-negro">
              <strong>Teléfono:</strong> {userData?.phone || "No registrado"}
            </p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6 border-2 border-[#33A691]">
          <h2 className="text-2xl font-bold text-verdeOscuro flex items-center gap-2">
            <FaUserEdit /> Editar Perfil
          </h2>

          <ConfirmModal
            open={showConfirm}
            title="¿Estás segura?"
            message="Se actualizará tu perfil con los nuevos datos."
            onCancel={() => {
              setShowConfirm(false);
              setPendingValues(null);
            }}
            onConfirm={async () => {
              if (!pendingValues) return;

              try {
                let profileImgUrl = userData.profileImgUrl;

                if (imageFile) {
                  profileImgUrl = await uploadUserImage(
                    user.id as string,
                    imageFile,
                    token
                  );
                }

                const updated = await updateUserById(
                  user.id as string,
                  { ...pendingValues, profileImgUrl },
                  token
                );
                saveUserData({ user: updated, token });
                toast.success("🎉 Perfil actualizado con éxito");
                setUserData(updated);
                setPreview(null);
                setImageFile(null);
                formikRef.current?.resetForm();
              } catch (e) {
                console.error("⚠️ Error actualizando perfil:", e);
                toast.error("Hubo un error al actualizar el perfil");
              } finally {
                setShowConfirm(false);
                setPendingValues(null);
              }
            }}
          />

          <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={{
              name: userData.name || "",
              phone: userData.phone || "",
            }}
            validationSchema={validationInfoUser}
            onSubmit={(values) => {
              setPendingValues(values);
              setShowConfirm(true);
            }}
          >
            <Form className="space-y-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-verdeOscuro">
                  Nombre
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Nuevo nombre"
                  className="border border-verdeClaro rounded-lg px-4 py-2 bg-blancoSuave text-negro"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-[#2C5959]">
                  Teléfono
                </label>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Nuevo teléfono"
                  className="border border-verdeClaro rounded-lg px-4 py-2 bg-blancoSuave text-negro"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* FOTO editable */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-verdeOscuro">
                  Foto de perfil
                </label>

                <div className="relative group w-24 h-24 rounded-full overflow-hidden border-4 border-verdeClaro shadow-md cursor-pointer">
                  <Image
                    src={
                      preview
                        ? preview
                        : userData.profileImgUrl ||
                          "https://via.placeholder.com/150?text=Sin+Foto"
                    }
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold">
                      📷 Cambiar
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
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
