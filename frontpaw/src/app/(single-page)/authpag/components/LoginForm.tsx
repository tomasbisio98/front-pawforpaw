'use client';

import { Formik } from 'formik'; 
import * as Yup from 'yup';        
import { FormEvent } from 'react';

type LoginValues = {
  email: string;
  password: string;
};

const LoginForm = ()=> {

    const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo inválido')
      .required('El correo es obligatorio'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  const handleLogin = (values: LoginValues) => {

    console.log('Enviando datos:', values);
  };

    return  (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="ejemplo@email.com"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••"
            />
            {touched.password && errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Ingresar
          </button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
