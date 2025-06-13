
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";

const AuthPage = () => {
    return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl flex flex-col md:flex-row gap-12">
        
        {/* Login Form */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Iniciar Sesión
          </h2>
          <LoginForm />
        </div>

        {/* Register Form  */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Crear Cuenta
          </h2>
         <RegisterForm />
        </div>

      </div>
    </main>
  );
}

export default AuthPage;