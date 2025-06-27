'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const pathname = usePathname(); // Detectar cambio de ruta

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setStatus('error');
      setMessage('Por favor, ingresa un correo válido.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al suscribirse');

      setStatus('success');
      setMessage('¡Suscripción exitosa! Revisa tu correo 📩');
      setEmail('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al suscribirse';
      setStatus('error');
      setMessage(msg);
    }
  };

  // 🧹 Limpieza automática después de 5 segundos
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setMessage('');
        setStatus('idle');
        setEmail('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // 🧼 Limpieza cuando cambia la ruta
  useEffect(() => {
    setMessage('');
    setStatus('idle');
    setEmail('');
  }, [pathname]);

  return (
    <section className="mt-6 space-y-2">
      <h3 className="text-lg font-semibold text-blancoSuave">
        SUSCRÍBETE A NUESTRO NEWSLETTER
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubscribe();
        }}
        className="flex flex-wrap items-center gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="h-10 w-64 px-4 rounded-lg text-[#2A5559] bg-[#F2F2F0] placeholder:text-[#3f271a] focus:outline-none"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-10 px-6 rounded-lg bg-verdeClaro text-white hover:bg-verdeMOscuro transition-colors disabled:opacity-60 items-center"
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
        </button>
      </form>

      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </section>
  );
};

export default Newsletter;