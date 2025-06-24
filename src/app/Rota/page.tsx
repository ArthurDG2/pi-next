// src/app/rotas/page.tsx

"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import dynamic from "next/dynamic";
import { Bus, MapIcon, Search } from "lucide-react";



// Importação dinâmica do mapa (continua igual)
const MapaRotaOSM = dynamic(
  () => import("@/components/MapaRotaOSM").then((mod) => mod.MapaRotaOSM),
  {
    ssr: false,
    loading: () => <p className="text-center p-8">Carregando mapa...</p>,
  }
);

export default function PaginaRotas() {
  // State para o que o usuário digita no campo de busca
  const [numeroInput, setNumeroInput] = useState("");
  // State para guardar os dados da rota que a API retornou
  const [rotaSelecionada, setRotaSelecionada] = useState<{
    Num_Onibus: string;
    Rota: string[];
  } | null>(null);

  // States de controle
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a rota na API quando o botão for clicado
  const handleBuscarRota = async () => {
    if (!numeroInput) {
      setError("Por favor, digite um número de linha.");
      return;
    }
    setLoading(true);
    setError(null);
    setRotaSelecionada(null);

    try {
      // ATENÇÃO: Verifique se sua API está rodando localmente ou na web.
      // Se estiver rodando local, use 'http://localhost:3000'.
      // Se já estiver publicada, use o link da 'onrender.com'.
      const baseUrl = "http://localhost:3000"; // ou "http://localhost:3000"
      const response = await fetch(`${baseUrl}/onibus/rota/${numeroInput}`);
      console.log(response)
      

      if (!response.ok) {
        // Se a API retornar um erro (ex: 404 Not Found), entramos aqui
        throw new Error("Rota não encontrada. Verifique o número e tente novamente.");
      }

      const data = await response.json();
      console.log("DADOS RECEBIDOS DA API:", data); 
      setRotaSelecionada(data[0]);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocorreu um erro ao buscar a rota.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme">
          Explore as Rotas de Ônibus
        </h1>
        <p className="text-lg text-theme mb-8">
          Digite o número de uma linha para visualizar o trajeto no mapa.
        </p>

        {/* --- INTERFACE DE BUSCA (MUDANÇA PRINCIPAL) --- */}
        <div className="mb-8 max-w-sm">
          <label htmlFor="rota-input" className="block text-sm font-medium text-theme mb-2">
            Número da Linha
          </label>
          <div className="flex gap-2">
            <input
              id="rota-input"
              type="text"
              value={numeroInput}
              onChange={(e) => setNumeroInput(e.target.value)}
              placeholder="Ex: 301"
              className="w-full p-3 border-input border rounded-md bg-input text-theme focus:ring-2 focus:ring-primary"
              onKeyUp={(e) => e.key === 'Enter' && handleBuscarRota()} // Permite buscar com a tecla Enter
            />
            <button
              onClick={handleBuscarRota}
              disabled={loading}
              className="p-3 bg-primary text-primary-foreground rounded-md flex items-center justify-center disabled:bg-muted disabled:cursor-not-allowed"
            >
              {loading ? "Buscando..." : <Search size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mostra mensagem de erro, se houver */}
        {error && <p className="text-red-500 text-center p-4">{error}</p>}

        {/* Área do Mapa */}
        <div className="mt-6">
          {loading && (
             <div className="text-center p-8">Carregando...</div>
          )}

          {rotaSelecionada && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-theme flex items-center gap-2">
                <Bus /> Rota da Linha {rotaSelecionada.Num_Onibus}
              </h2>
              <MapaRotaOSM ruas={rotaSelecionada.Rota} />
            </div>
          )}

          {!rotaSelecionada && !loading && !error && (
            <div className="flex flex-col items-center justify-center text-center p-10 bg-card rounded-lg border border-theme">
              <MapIcon size={48} className="text-muted mb-4" />
              <h3 className="text-xl font-semibold text-card">Aguardando busca</h3>
              <p className="text-muted-foreground mt-2">
                Digite um número de linha e clique em buscar para ver o trajeto.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}