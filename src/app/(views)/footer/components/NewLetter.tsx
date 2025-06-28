'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const pathname = usePathname();

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setStatus('error');
      setMessage('Por favor, ingresa un correo válido.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}newsletter/subscribe`, {
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

  useEffect(() => {
    setMessage('');
    setStatus('idle');
    setEmail('');
  }, [pathname]);

  return (
    <section className="space-y-2 text-sm">
      <h3 className="text-base font-semibold text-white text-center md:text-left">
        Suscríbete a nuestro newsletter🐶
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubscribe();
        }}
        className="flex flex-col sm:flex-row sm:items-center gap-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="h-9 px-4 w-full sm:w-64 rounded-md text-verdeOscuro bg-white placeholder:text-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-9 px-4 rounded-md bg-verdeClaro hover:bg-verdeMOscuro text-white text-sm transition-all disabled:opacity-60"
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
        </button>
      </form>

      {message && (
        <p className={`text-xs mt-1 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </section>
  );
};

export default Newsletter;
