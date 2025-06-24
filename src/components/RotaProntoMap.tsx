"use client";

import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Corrige o ícone padrão do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// A interface define os nomes corretos das props que o componente espera
interface RotaProntaMapProps {
  caminhoDaRota: [number, number][];       // Para a linha azul
  marcadoresDasParadas: [number, number][]; // Para os pinos de parada
}

export const RotaProntaMap: React.FC<RotaProntaMapProps> = ({ caminhoDaRota, marcadoresDasParadas }) => {
  if (!caminhoDaRota || caminhoDaRota.length === 0) {
    return <div>Não há dados de caminho para exibir no mapa.</div>;
  }

  const bounds = L.latLngBounds(caminhoDaRota); 

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border border-theme">
      <MapContainer
        bounds={bounds}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* A Polyline usa a prop 'caminhoDaRota' */}
        <Polyline positions={caminhoDaRota} color="#3b82f6" weight={6} />

        {/* Os Markers usam a prop 'marcadoresDasParadas' */}
        {marcadoresDasParadas.map((paradaCoord, index) => (
          <Marker key={index} position={paradaCoord}>
            <Popup>Parada {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default RotaProntaMap;