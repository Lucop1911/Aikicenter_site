"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function AdminPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? 'Errore durante il logout.');
      } else {
        router.push('/login?loggedOut=1');
      }
    } catch {
      setError('Errore di rete. Riprova.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-main">
      <section className="admin-card">
        <h1>Area amministratore</h1>
        <p>Sei autenticato. Premi il pulsante per effettuare il logout.</p>

        {error && <div className="admin-error" role="alert">{error}</div>}

        <button className="btn logout-btn" onClick={handleLogout} disabled={loading}>
          {loading ? 'Uscita…' : 'Logout'}
        </button>
      </section>
    </main>
  );
}
