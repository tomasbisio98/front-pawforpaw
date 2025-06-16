
import * as Yup from 'yup';

export const validationRegister = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  dni: Yup.number().required('El DNI es obligatorio'),
  telefono: Yup.string().required('El teléfono es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export const validationLogin = Yup.object({
    email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),
    password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});