"use client";

import React from "react";
import L from 'leaflet';
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

export const MapOSM = () => {
    return (
        <div className="bg-theme flex flex-col md:flex-row gap-4 w-[90%] mx-auto justify-center">
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
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <MapContainer
                        center={[-23.08164, -47.23247]} // Coordenadas de Indaiatuba, SP
                        zoom={13}
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-23.08164, -47.23247]}>
                            <Popup>
                                Indaiatuba, SP
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>

            {/* Painel de Detalhes da Rota */}
            <div className="w-full md:w-1/3 bg-theme rounded-lg shadow p-6 border border-gray-200 flex flex-col gap-4 min-w-[300px] max-w-md">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold">Detalhes da Rota</h2>
                    <span className="bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                        {rota.distancia} • {rota.tempo}
                    </span>
                </div>
                <div className="flex flex-col gap-1 text-gray-700 text-sm mb-2">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-blue-500" />
                        <span className="text-theme">{rota.origem}</span>
                        <span className="mx-1 text-theme">→</span>
                        <span className="font-semibold text-theme">{rota.destino}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        <span className="text-theme">Chegada estimada: <span className="font-semibold text-theme">{rota.chegada}</span></span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-theme">Ver instruções passo a passo</span>
                        <span className="ml-auto text-theme">▼</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {rota.instrucoes.map((inst, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-theme rounded p-2 border border-gray-100">
                                <Navigation size={18} className="text-blue-500 mt-1" />
                                <div className="flex-1">
                                    <span className="text-theme text-sm font-medium">{inst.texto}</span>
                                    <div className="flex gap-4 mt-1 text-xs text-theme">
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
