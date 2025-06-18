'use client';

import { validationRegister } from '@/helpers/validationAuth';
import { IUsers } from '@/interface/IUsers';
import { Formik, Form, Field } from 'formik';
import styles from '../../../../styles/AuthUsers.module.css'


const initialValues: IUsers = {
  nombre: '',
  dni: '',
  telefono: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = validationRegister;

export default function RegisterForm() {
  const onSubmit = (values: IUsers) => {
    console.log('Datos del formulario:', values);
  };

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        
      >
        {({ isSubmitting, isValid, touched, errors, values, handleChange }) => (
          <Form className="justify-center items-center flex flex-col space-y-4">
            
            <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <Field name="nombre" type="text" className={`${styles.input} ${
              touched.nombre && errors.nombre ? styles.inputError : ''
            }`} />
             {touched.nombre && errors.nombre && (
               <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>
              )}
            </div>

            <div>

            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
            <Field name="dni" type="text" className={`${styles.input} ${
              touched.dni && errors.dni ? styles.inputError : ''
            }`} />
             {touched.dni && errors.dni && (
               <p className="text-sm text-red-500 mt-1">{errors.dni}</p>
              )}
            </div>

            <div>

            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <Field name="telefono" type="text" className={`${styles.input} ${
              touched.telefono && errors.telefono ? styles.inputError : ''
            }`} />
            {touched.telefono && errors.telefono && (
              <p className="text-sm text-red-500 mt-1">{errors.telefono}</p>
            )}
            </div>

           <div>

            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <Field name="email" type="email" className={`${styles.input} ${
              touched.email && errors.email ? styles.inputError : ''
            }`} placeholder="ejemplo@email.com"/>
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
                  className={`${styles.input} ${
                    touched.password && errors.password ? styles.inputError : ''
                  }`}
                  placeholder="••••••"
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword" type="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    touched.confirmPassword && errors.confirmPassword ? styles.inputError : ''
                  }`}
                  placeholder="••••••"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={styles.button}
            >
              Registrar
            </button>
          </Form>
        )}
      </Formik>
  );
}
