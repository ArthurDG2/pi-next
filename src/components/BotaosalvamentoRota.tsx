"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BotaoSalvarRotaProps {
  routeNumber: string;
  isInitiallySaved: boolean; // O estado inicial (se a rota já está salva ou não)
}

export function BotaoSalvarRota({ routeNumber, isInitiallySaved }: BotaoSalvarRotaProps) {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    const endpoint = isSaved ? '/users/rotas/remover' : '/users/rotas/salvar';

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ routeNumber }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Ocorreu um erro.');
      }

      // Sucesso! Inverte o estado do botão
      setIsSaved(!isSaved);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300
            ${isSaved
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-primary text-primary-foreground hover:bg-blue-700'
            }
            disabled:bg-muted disabled:cursor-not-allowed
          `}
        >
          {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          {isLoading ? 'Aguarde...' : (isSaved ? 'Salvo!' : 'Salvar Rota')}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}