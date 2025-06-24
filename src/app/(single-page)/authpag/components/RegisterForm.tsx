'use client';

import { validationRegister } from '@/helpers/validationAuth';
import { IUsers } from '@/interface/IUsers';
import styles from '../../../../styles/AuthUsers.module.css'
import { postRegister } from '@/service/auth';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';


const initialValues: IUsers = {
  name: '',
  // dni: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = validationRegister;

export default function RegisterForm() {
 

  const onSubmit = async (values: IUsers,   { resetForm }: { resetForm: () => void }) => {
    console.log('Datos del formulario:', values);
    try {
      const res = await postRegister(values);
      console.log('Respuesta del backend:', res);

      //
      toast.success("Usuario registrado exitosamente");
      
      resetForm();

      setTimeout(() => {
        toast.info('Ya puedes iniciar sesión');
      }, 2000);
    } catch (e) {
      console.warn('Error al registrar el usuario', e);
      toast.error('Ocurrió un error al registrarte. Intenta más tarde.');
    }
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
            <Field name="name" type="text" className={`${styles.input} ${
              touched.name && errors.name ? styles.inputError : ''
            }`} />
             {touched.name && errors.name && (
               <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* <div>

            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
            <Field name="dni" type="text" className={`${styles.input} ${
              touched.dni && errors.dni ? styles.inputError : ''
            }`} />
             {touched.dni && errors.dni && (
               <p className="text-sm text-red-500 mt-1">{errors.dni}</p>
              )}
            </div> */}

            <div>

            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <Field name="phone" type="text" className={`${styles.input} ${
              touched.phone && errors.phone ? styles.inputError : ''
            }`} />
            {touched.phone && errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
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
                <Field
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
                <Field
                  id="confirmPassword"
                  name="confirmPassword" type="password"
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
