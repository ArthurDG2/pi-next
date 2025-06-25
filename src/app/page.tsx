"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'; 
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { User, Bus, Info, Search } from "lucide-react";
import dynamic from "next/dynamic";

const MapOSM = dynamic(() => import("@/components/MapOSM").then((mod) => mod.MapOSM),{ ssr: false });

const curiosidades = [
    "Indaiatuba é conhecida pelo Parque Ecológico, um dos maiores do Brasil.",
    "A cidade tem um dos melhores índices de qualidade de vida do país.",
    "Indaiatuba foi fundada em 1830 e seu nome significa 'ajuntamento de indaiás'.",
    "O aeroporto de Viracopos, um dos mais movimentados do Brasil, fica a poucos minutos da cidade.",
    "Indaiatuba possui mais de 100 km de ciclovias, incentivando o transporte sustentável.",
];

function getSaudacao() {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
}

export default function HomePage() {
    const [curiosidadeIndex, setCuriosidadeIndex] = useState(0);
    const [saudacao, setSaudacao] = useState("");
    const [numeroOnibus, setNumeroOnibus] = useState<number | null>(null);
    const [termoBusca, setTermoBusca] = useState('');
    const router = useRouter();

    
    useEffect(() => {
        setSaudacao(getSaudacao());

        
        fetch("http://localhost:3000/onibus")
            .then(res => res.json())
            .then(data => setNumeroOnibus(Array.isArray(data) ? data.length : 0))
            .catch(() => setNumeroOnibus(0));

        // Timer para as curiosidades
        const curiosidadeInterval = setInterval(() => {
            setCuriosidadeIndex((prev) => (prev + 1) % curiosidades.length);
        }, 6000);

        // Timer para atualizar a saudação
        const saudacaoInterval = setInterval(() => setSaudacao(getSaudacao()), 60000);

        return () => {
            clearInterval(curiosidadeInterval);
            clearInterval(saudacaoInterval);
        };
    }, []);

    // Função para lidar com a busca
    const handleSearch = (e: FormEvent) => {
      e.preventDefault();
      // Redireciona para a página de pesquisa, passando o termo como query param
      router.push(`/pesquisar?termo=${encodeURIComponent(termoBusca)}`);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Navbar />
            <main>
                {/* --- SEÇÃO HERO --- */}
                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center py-20 px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
                        {saudacao}, Bem-vindo ao InfoBus!
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8 drop-shadow">
                        Seu assistente de transporte público em Indaiatuba. Encontre sua linha com facilidade.
                    </p>
                    
                </section>

                {/* --- SEÇÃO DE CARDS DE ESTATÍSTICAS --- */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Card Ônibus em Operação */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                                    <Bus className="text-blue-600 dark:text-blue-400" size={28} />
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Linhas Cadastradas</span>
                                <span className="text-4xl font-bold mt-1">{numeroOnibus !== null ? numeroOnibus : '...'}</span>
                            </div>

                            {/* Card Ocupação Média (Exemplo estático) */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mb-4">
                                    <User className="text-green-600 dark:text-green-400" size={28} />
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Qualidade de Vida</span>
                                <span className="text-4xl font-bold mt-1">Top #1</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ranking nacional entre cidades de médio porte.</p>
                            </div>
                            
                            {/* Card Curiosidades */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1">
                                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full mb-4">
                                    <Info className="text-yellow-600 dark:text-yellow-400" size={28} />
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Você Sabia?</span>
                                <p className="mt-2 min-h-[72px]">{curiosidades[curiosidadeIndex]}</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* --- SEÇÃO DO MAPA --- */}
                <section className="bg-gray-100 dark:bg-gray-800/50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-4">Explore o Mapa Interativo</h2>
                        <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                            Visualize a cidade e planeje suas rotas com antecedência.
                        </p>
                        <div className="h-[500px] w-full rounded-xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-700">
                            <MapOSM />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}