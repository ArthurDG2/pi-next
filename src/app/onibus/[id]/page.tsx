// src/app/onibus/[id]/page.tsx


import { cookies } from 'next/headers';
import { Navbar } from "@/components/Navbar";
import { BotaoSalvarRota } from "@/components/BotaosalvamentoRota";
import { RotaProntaMap } from '@/components/RotaProntoMap';
import { MapPin } from 'lucide-react';

// Define a "forma" completa dos dados do ônibus
interface OnibusDetalhado {
  _id: string;
  Num_Onibus: string;
  Empresa_Controladora: string;
  Rota: string[];
  Rota_Geocodificada: [number, number][];
  Caminho_Geocodificado: [number, number][];
}
interface DetalheOnibusPageProps {
  params: { id: string };
}

// Busca os dados de um ônibus específico
async function getOnibusDetalhado(id: string): Promise<OnibusDetalhado | null> {
    try {
        const res = await fetch(`https://api-infobus-proj-pi.onrender.com/onibus/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Erro ao buscar detalhes do ônibus:", error);
        return null;
    }
}

// Busca os dados do usuário logado (usado para verificar rotas salvas)
async function getAuthenticatedUser(token: string | undefined) {
    if (!token) return null;
    try {
        const res = await fetch(`https://api-infobus-proj-pi.onrender.com/users/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch{
        return null;
    }
}


export default async function DetalheOnibusPage({ params }: DetalheOnibusPageProps) {
  // Busca os dados do ônibus e do usuário em paralelo para mais performance
  const token = (await cookies()).get('authToken')?.value;
  const [onibus, user] = await Promise.all([
      getOnibusDetalhado(params.id),
      getAuthenticatedUser(token)
  ]);

  // --- CORREÇÃO APLICADA AQUI ---
  // Se 'onibus' for nulo, a função retorna este componente de erro e para de executar.
  // Isso garante para o TypeScript que, no resto da função, 'onibus' nunca será nulo.
  if (!onibus) {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-500">Erro ao Carregar a Rota</h1>
                <p className="text-muted mt-2">
                    Não foi possível buscar os dados do ônibus. Verifique se o ID está correto e se a API está rodando.
                </p>
            </main>
        </div>
    );
  }

  // Determina se a rota atual já foi salva pelo usuário logado
  const isInitiallySaved = user?.Rotas_Salvas?.includes(onibus.Num_Onibus) || false;

  return (
    <div className="bg-theme">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-theme mb-2">Linha {onibus.Num_Onibus}</h1>
        <p className="text-lg text-muted mb-8">Operado por: {onibus.Empresa_Controladora}</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <RotaProntaMap 
              caminhoDaRota={onibus.Caminho_Geocodificado} 
              marcadoresDasParadas={onibus.Rota_Geocodificada}
            />
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-card p-6 rounded-lg shadow border border-theme space-y-4">
              <BotaoSalvarRota 
                routeNumber={onibus.Num_Onibus}
                isInitiallySaved={isInitiallySaved}
              />
              <div className="border-t border-border pt-4">
                <h2 className="text-xl font-bold text-card mb-4">Itinerário</h2>
                <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                    {onibus.Rota.map((parada, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-card">
                        <MapPin size={16} className="text-primary flex-shrink-0 mt-1" />
                        <span>{parada}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}