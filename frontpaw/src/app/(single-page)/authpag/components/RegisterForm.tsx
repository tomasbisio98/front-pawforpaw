'use client';

import { IUsers } from '@/interface/IUsers';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const initialValues: IUsers = {
  nombre: '',
  dni: '',
  telefono: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  dni: Yup.string().required('El DNI es obligatorio'),
  telefono: Yup.string().required('El teléfono es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Contraseña obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export default function RegisterForm() {
  const onSubmit = (values: IUsers) => {
    console.log('Datos del formulario:', values);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, isValid, touched }) => (
          <Form className="flex flex-col gap-4">
            

            <label htmlFor="nombre">Nombre</label>
            <Field name="nombre" type="text" className="input" />
            <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />

            
            <label htmlFor="dni">DNI</label>
            <Field name="dni" type="text" className="input" />
            <ErrorMessage name="dni" component="div" className="text-red-500 text-sm" />

            
            <label htmlFor="telefono">Teléfono</label>
            <Field name="telefono" type="text" className="input" />
            <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />

            <label htmlFor="email">Correo Electrónico</label>
            <Field name="email" type="email" className="input" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <label htmlFor="password">Contraseña</label>
            <Field name="password" type="password" className="input" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

            
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <Field name="confirmPassword" type="password" className="input" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              Registrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
