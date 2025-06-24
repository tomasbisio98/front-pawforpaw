'use client';

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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

  return (
    <section className="mt-6 space-y-2">
      <h3 className="text-lg font-semibold text-[#2A5559]">SUSCRÍBETE A NUESTRO NEWSLETTER</h3>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="h-10 w-64 px-4 rounded-lg text-[#2A5559] bg-[#F2F2F0] placeholder:text-[#3f271a] focus:outline-none"
        />

        <button
          onClick={handleSubscribe}
          disabled={status === 'loading'}
          className="h-10 px-6 rounded-lg bg-[#33A69A] text-white hover:bg-[#2A5559] transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
        </button>
      </div>

      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </section>
  );
};

export default Newsletter;