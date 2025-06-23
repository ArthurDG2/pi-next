// src/app/onibus/[id]/page.tsx

import { Navbar } from "@/components/Navbar";
import { RotaProntaMap } from '@/components/RotaProntoMap'; // <-- Importa o RotaProntaMap diretamente
import { MapPin } from 'lucide-react';

interface OnibusDetalhado {
  _id: string;
  Num_Onibus: string;
  Empresa_Controladora: string;
  Rota: string[];
  Rota_Geocodificada: [number, number][];
  Caminho_Geocodificado: [number, number][];
  
}

async function getOnibusDetalhado(id: string): Promise<OnibusDetalhado | null> {
  try {
    const res = await fetch(`http://localhost:3000/onibus/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`A API retornou um erro: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar detalhes do ônibus:", error);
    return null;
  }
}

// A página continua sendo um Server Component
export default async function DetalheOnibusPage({ params }: { params: { id: string } }) {
  const onibus = await getOnibusDetalhado(params.id);

  if (!onibus) {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-500">Erro ao Carregar a Rota</h1>
                <p className="text-muted mt-2">Não foi possível buscar os dados do ônibus.</p>
            </main>
        </div>
    );
  }

  return (
    <div className="bg-theme">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-theme mb-2">Linha {onibus.Num_Onibus}</h1>
        <p className="text-lg text-muted mb-8">Operado por: {onibus.Empresa_Controladora}</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna do Mapa */}
          <div className="w-full lg:w-2/3">
            {/* Chamamos o RotaProntaMap diretamente, passando as props necessárias */}
            <RotaProntaMap 
              caminhoDaRota={onibus.Caminho_Geocodificado} 
              marcadoresDasParadas={onibus.Rota_Geocodificada}
            />
          </div>

          {/* Coluna de Informações */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card p-6 rounded-lg shadow border border-theme">
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
      </main>
    </div>
  );
}