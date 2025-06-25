"use client";

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { User, Heart, Shield, Loader2, ServerCrash, Bus, Trash2, Edit, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { Footer } from '@/components/Footer';


interface UserProfile {
  nome: string;
  email: string;
}
interface RotaSalva {
  _id: string;
  Num_Onibus: string;
  Rota: string[];
}
export default function MinhaContaPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(null);
  const [savedRoutes, setSavedRoutes] = useState<RotaSalva[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const fetchData = useCallback(async () => {

    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError("Sessão não encontrada. Por favor, faça login.");
      setIsLoading(false);
      return;
    }

    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      const [profileResponse, routesResponse] = await Promise.all([
        axios.get('https://api-infobus-proj-pi.onrender.com/users/me', config),
        axios.get('https://api-infobus-proj-pi.onrender.com/users/me/rotas', config)
      ]);
      setProfile(profileResponse.data);
      setTempProfile(profileResponse.data);
      setSavedRoutes(routesResponse.data);
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('authToken');
          setError("Sua sessão expirou. Por favor, faça login novamente.");
        } else {
          setError(err.response?.data?.message || "Erro ao carregar dados.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRemoveRoute = async (routeNumber: string) => {
    const token = localStorage.getItem('authToken');
    const originalRoutes = savedRoutes;
    setSavedRoutes(prevRoutes => prevRoutes.filter(r => r.Num_Onibus !== routeNumber));
    try {
      await axios.post(
        'https://api-infobus-proj-pi.onrender.com/users/rotas/remover',
        { routeNumber },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
    } catch {
      alert("Erro ao remover rota. A lista será restaurada.");
      setSavedRoutes(originalRoutes);
    }
  };

  const handleSaveProfile = () => {

    if (tempProfile) setProfile(tempProfile);
    setIsEditingProfile(false);
  }


  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsSavingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres.");
      setIsSavingPassword(false);
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.patch(
        'https://api-infobus-proj-pi.onrender.com/me/alterar-senha',
        { senhaAtual: currentPassword, novaSenha: newPassword },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      setPasswordSuccess(response.data.message);
      setCurrentPassword('');
      setNewPassword('');

    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setPasswordError(err.response?.data?.message || "Ocorreu um erro ao alterar a senha.");
      } else if (err instanceof Error) {
        setPasswordError(err.message);
      } else {
        setPasswordError("Erro desconhecido ao alterar a senha.");
      }
    } finally {
      setIsSavingPassword(false);
    }
  };


  if (isLoading) {

    return (

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

        <Navbar />

        <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>

      </div>

    );

  }



  if (error) {

    return (

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

        <Navbar />

        <div className="container mx-auto p-8 text-center bg-red-100 dark:bg-red-900/20 border border-red-300 rounded-lg max-w-2xl mt-10">

          <ServerCrash className="mx-auto text-red-500" size={40} />

          <h2 className="mt-4 text-xl font-semibold text-red-700 dark:text-red-300">Ocorreu um Erro</h2>

          <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>

          <Link href="/login" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700">

            Ir para o Login

          </Link>

        </div>

      </div>

    );

  }

  return (

    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

      <Navbar />

      <header className="bg-card border-b border-border shadow-sm">

        <div className="container mx-auto max-w-5xl py-8 px-4">

          <h1 className="text-4xl font-bold text-foreground">Minha Conta</h1>

          <p className="text-lg text-muted-foreground mt-1">Gerencie suas informações e rotas favoritas.</p>

        </div>

      </header>



      <main className="container mx-auto max-w-5xl py-10 px-4 space-y-10">
        <section className="bg-card p-6 sm:p-8 rounded-xl border border-border shadow-sm">

          <div className="flex justify-between items-start mb-6">

            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3"><User /> Perfil</h2>

            <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5">

              {isEditingProfile ? <><X size={14} /> Cancelar</> : <><Edit size={14} /> Editar</>}

            </button>

          </div>

          {isEditingProfile ? (

            <div className="space-y-4 max-w-md">

              <div>

                <label className="text-sm font-medium text-muted-foreground">Nome</label>

                <input type="text" value={tempProfile?.nome || ''} onChange={(e) => setTempProfile({ ...tempProfile, nome: e.target.value } as UserProfile)} className="mt-1 w-full p-2 border rounded bg-input border-input-border" />

              </div>

              <button onClick={handleSaveProfile} className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-blue-700">Salvar Alterações</button>

            </div>

          ) : (

            <div className="space-y-4">

              <div>

                <p className="text-sm font-medium text-muted-foreground">Nome</p>

                <p className="text-lg text-foreground">{profile?.nome}</p>

              </div>

              <div>

                <p className="text-sm font-medium text-muted-foreground">Email</p>

                <p className="text-lg text-foreground">{profile?.email}</p>

              </div>

            </div>

          )}

        </section>



        <section className="bg-card p-6 sm:p-8 rounded-xl border border-border shadow-sm">

          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3"><Heart /> Rotas Favoritas</h2>

          {savedRoutes.length > 0 ? (

            <div className="space-y-4">

              {savedRoutes.map(rota => (

                <div key={rota._id} className="bg-background p-4 rounded-lg flex justify-between items-center border border-border">

                  <div>

                    <h3 className="font-bold text-lg text-foreground">Linha {rota.Num_Onibus}</h3>

                    <p className="text-sm text-muted-foreground">{rota.Rota[0]} → {rota.Rota[rota.Rota.length - 1]}</p>

                  </div>

                  <div className="flex items-center gap-2">

                    <Link href={`/onibus/${rota._id}`} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" title="Ver Detalhes"><Bus size={20} /></Link>

                    <button onClick={() => handleRemoveRoute(rota.Num_Onibus)} className="p-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20" title="Remover dos Favoritos"><Trash2 size={20} /></button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-center text-muted-foreground py-4">Você ainda não salvou nenhuma rota.</p>

          )}

        </section>
        <section className="bg-card p-6 sm:p-8 rounded-xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3"><Shield /> Segurança</h2>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
            <h3 className="text-lg font-medium">Alterar Senha</h3>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Senha Atual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full p-2 border rounded bg-input border-input-border"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nova Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full p-2 border rounded bg-input border-input-border"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isSavingPassword}
              >
                {isSavingPassword && <Loader2 className="animate-spin" size={16} />}
                {isSavingPassword ? 'Salvando...' : 'Alterar Senha'}
              </button>
            </div>
            {passwordSuccess && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle size={18} />
                <p>{passwordSuccess}</p>
              </div>
            )}
            {passwordError && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <X size={18} />
                <p>{passwordError}</p>
              </div>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}