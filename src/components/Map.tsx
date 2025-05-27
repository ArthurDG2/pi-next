"use client";

import React from "react";
import { Search, Navigation, Clock, MapPin } from "lucide-react";

const rota = {
  origem: "Praça da Sé",
  destino: "Liberdade",
  distancia: "1.9 km",
  tempo: "7 minutos",
  chegada: "15:40",
  instrucoes: [
    {
      texto: "Dirija na direção sudoeste na Praça da Sé.",
      distancia: "217 metros",
      tempo: "52 segundos",
    },
    {
      texto: "Vire à esquerda para Praça Doutor João Mendes.",
      distancia: "191 metros",
      tempo: "54 segundos",
    },
    {
      texto: "Vire à direita para Rua Conde do Pinhal.",
      distancia: "43 metros",
      tempo: "13 segundos",
    },
    {
      texto: "Vire à esquerda para Rua Conselheiro Furtado.",
      distancia: "1.5 km",
      tempo: "5 minutos",
    },
    {
      texto: "Você chegou ao seu destino.",
      distancia: "0 metros",
      tempo: "0 segundos",
    },
  ],
};

export const Map = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-[90%] mx-auto justify-center">
      <div className="relative h-[500px] w-full md:w-2/3">
        <div className="flex bg-white rounded-md absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-11/12 max-w-md border border-black">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar localização..."
              className="w-full pl-10 p-3 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Mapa em iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29385.675969309987!2d-47.23247!3d-23.08164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b4811322d7b7%3A0x4d1efbf0d05b7f3c!2sIndaiatuba%2C%20SP!5e0!3m2!1sen!2sbr!4v1651234567890!5m2!1sen!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Painel de Detalhes da Rota */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col gap-4 min-w-[300px] max-w-md">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Detalhes da Rota</h2>
          <span className="bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            {rota.distancia} • {rota.tempo}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-gray-700 text-sm mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            <span>{rota.origem}</span>
            <span className="mx-1 text-gray-400">→</span>
            <span className="font-semibold">{rota.destino}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span>Chegada estimada: <span className="font-semibold">{rota.chegada}</span></span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-800">Ver instruções passo a passo</span>
            <span className="ml-auto text-gray-400">▼</span>
          </div>
          <div className="flex flex-col gap-2">
            {rota.instrucoes.map((inst, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded p-2 border border-gray-100">
                <Navigation size={18} className="text-blue-500 mt-1" />
                <div className="flex-1">
                  <span className="text-gray-800 text-sm font-medium">{inst.texto}</span>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>{inst.distancia}</span>
                    <span>•</span>
                    <span>{inst.tempo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
