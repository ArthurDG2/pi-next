"use client";

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // Estados para o formulário
  const [accountType, setAccountType] = useState<'user' | 'empresa'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para controle de UI
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Determina qual endpoint da API chamar
    const endpoint = accountType === 'user' 
      ? 'http://localhost:3000/auth/users/login' 
      : 'http://localhost:3000/auth/empresa/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Falha no login.');
      }
      
      // Se o login for bem-sucedido, salva o token
      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        // Redireciona para a página inicial e recarrega para que a Navbar atualize
        window.location.href = '/';
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-theme min-h-screen">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-card shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-theme">
            <h2 className="text-2xl text-center font-bold mb-4 text-card">Acessar Conta</h2>
            
            {/* Abas para selecionar tipo de conta */}
            <div className="flex mb-4 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setAccountType('user')}
                className={`flex-1 py-2 text-center font-semibold ${accountType === 'user' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
              >
                Passageiro
              </button>
              <button
                type="button"
                onClick={() => setAccountType('empresa')}
                className={`flex-1 py-2 text-center font-semibold ${accountType === 'empresa' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
              >
                Empresa
              </button>
            </div>
            
            {/* Campos do formulário */}
            <div className="mb-4">
              <label className="block text-card text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-card text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-muted"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
              <Link href="/cadastro" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Criar Conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}