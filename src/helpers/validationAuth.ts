
import * as Yup from 'yup';

export const validationRegister = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  // dni: Yup.number().required('El DNI es obligatorio'),
  phone: Yup.string().required('El teléfono es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string()
  .required('Contraseña obligatoria')
  .min(8, 'Mínimo 8 caracteres')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    'Incluye mayúscula, minúscula, número y símbolo'
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export const validationLogin = Yup.object({
    email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),
    password: Yup.string()
  .required('Contraseña obligatoria')
  .min(8, 'Mínimo 8 caracteres')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    'Incluye mayúscula, minúscula, número y símbolo')
});


export const validationInfoUser = Yup.object({
  name: Yup.string()
    .min(3, "El nombre es muy corto")
    .required("El nombre es obligatorio"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Sólo se permiten números")
    .min(7, "Mínimo 7 dígitos")
    .max(15, "Máximo 15 dígitos"),
});