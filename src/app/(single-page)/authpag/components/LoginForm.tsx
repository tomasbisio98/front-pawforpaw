"use client";

import { Formik, Field } from "formik";
import { validationLogin } from "@/helpers/validationAuth";
import Link from "next/link";
import styles from "../../../../styles/AuthUsers.module.css";
import { postLogin } from "@/service/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/authContext";

type LoginValues = {
  email: string;
  password: string;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const validationSchema = validationLogin;

const LoginForm = () => {
  const router = useRouter();
  const { saveUserData } = useAuthContext();

  const handleLogin = async (
    values: LoginValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await postLogin(values);
      console.log("👉 response de postLogin", res);

      localStorage.setItem("token", res.token);
      saveUserData(res);

      console.log("👤 Usuario guardado:", res.user);

      toast.success("Bienvenido a PawForPaw");
      resetForm();

      setTimeout(() => {
        if (res.user.isAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }, 3000);

      console.log("Enviando datos:", values);
    } catch (e) {
      console.warn("error al loguearse el usuario", e);
      toast.error("Email o contraseña incorrectos");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="justify-center items-center flex flex-col space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <Field
              name="email"
              type="email"
              className={`${styles.input} ${
                touched.email && errors.email ? styles.inputError : ""
              }`}
              placeholder="ejemplo@email.com"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password-login"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <Field
              id="password-login"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`${styles.input} ${
                touched.password && errors.password ? styles.inputError : ""
              }`}
              placeholder="••••••"
            />
            {touched.password && errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link
              href="/forgot-password"
              className="text-verdeClaro text-sm hover:underline"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={styles.buttonLogin}
          >
            Ingresar
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
