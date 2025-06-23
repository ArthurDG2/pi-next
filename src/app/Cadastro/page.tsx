// src/app/cadastro/page.tsx
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/navigation'; // Hook para redirecionamento

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:3000/users/registrar', { // Endpoint de registro de usuário
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          idade: Number(idade), // Converte idade para número
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Falha ao registrar.');
      }
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        router.push('/login'); // Redireciona para a página de login após 2 segundos
      }, 2000);

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
            <h2 className="text-2xl text-center font-bold mb-6 text-card">Criar Conta</h2>
            
            {/* Campos do formulário */}
            <div className="mb-4">
              <label className="block text-card text-sm font-bold mb-2" htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-card text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-card text-sm font-bold mb-2" htmlFor="idade">Idade (Opcional)</label>
              <input
                id="idade"
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-card text-sm font-bold mb-2" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            {/* Mensagens de erro/sucesso */}
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            {success && <p className="text-green-500 text-xs italic mb-4">{success}</p>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-muted"
              >
                {isLoading ? 'Registrando...' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}