"use client"

import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Map } from "../components/Map";
import { User, Bus, Info } from "lucide-react";

const curiosidades = [
    "Indaiatuba é conhecida pelo Parque Ecológico, um dos maiores do Brasil.",
    "A cidade tem um dos melhores índices de qualidade de vida do país.",
    "Indaiatuba foi fundada em 1830.",
    "O aeroporto de Viracopos fica a poucos minutos da cidade.",
    "Indaiatuba possui diversas ciclovias e incentiva o uso de bicicletas.",
    // Adicione mais curiosidades se desejar
];

function getSaudacao() {
    const hora = new Date().getHours();
    if (hora < 12) return "Bom dia";
    if (hora < 18) return "Boa tarde";
    return "Boa noite";
}

export default function Home() {
    const [curiosidadeIndex, setCuriosidadeIndex] = useState(0);
    const [saudacao, setSaudacao] = useState(getSaudacao());
    const [numeroOnibus, setNumeroOnibus] = useState<number | null>(null);


    useEffect(() => {
        const interval = setInterval(() => {
            setCuriosidadeIndex((prev) => (prev + 1) % curiosidades.length);
        }, 6000); // Troca a cada 6 segundos
        const timer = setInterval(() => setSaudacao(getSaudacao()), 60000);
        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        fetch("https://api-infobus-proj-pi.onrender.com/onibus")
            .then(res => res.json())
            .then(data => {
                console.log("Resposta da API:", data);
                setNumeroOnibus(Array.isArray(data) ? data.length : 0);
            })
            .catch(() => setNumeroOnibus(0));
    }, []);

    return (
        <div className="bg-theme">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 mt-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {saudacao}, Bem-vindo ao InfoBus
                </h1>
                <p className="text-lg text-theme mb-8">
                    Planeje suas viagens, acompanhe o transporte em tempo real e descubra a melhor forma de se locomover pela cidade.
                </p>
                <div className="flex flex-col md:flex-row gap-4 mb-8 max-h-32">
                    {/* Card Ocupação Média */}
                    <div className="flex-1 bg-theme rounded-lg shadow p-3 pl-5 flex flex-col justify-around items-start min-w-[220px] border border-gray-200 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="text-theme" size={22} />
                            <span className="text-theme text-sm">Ocupação Média</span>
                        </div>
                        <span className="text-3xl font-bold text-theme">72%</span>
                        <span className="text-xs text-green-600 mt-1">+5% comparado a ontem</span>
                    </div>
                    {/* Card Curiosidades */}
                    <div className="flex-[2] bg-theme rounded-lg shadow p-6 flex flex-col justify-between items-center min-w-[320px] border border-gray-200 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300">
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <Info className="text-theme" size={22} />
                                <span className="font-semibold text-theme text-lg">Você sabia?</span>
                            </div>
                            <p className="text-theme mt-2 mb-4 min-h-[48px]">{curiosidades[curiosidadeIndex]}</p>
                        </div>
                    </div>
                    {/* Card Ônibus Ativos */}
                    <div className="flex-1 bg-theme rounded-lg shadow p-3 pl-5 flex flex-col justify-around items-start min-w-[220px] border border-gray-200 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <Bus className="text-theme" size={22} />
                            <span className="text-theme text-sm">Ônibus Ativos</span>
                        </div>
                        <span className="text-3xl font-bold text-theme">{numeroOnibus !== null ? numeroOnibus : '...'}</span>
                        <span className="text-xs text-theme mt-1">98% da frota</span>
                    </div>
                </div>
            </div>
            <Map />
        </div>
    )
}
