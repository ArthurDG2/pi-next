"use client";

import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Corrige ícones do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapaRotaOSMProps {
  ruas: string[];
}

export const MapaRotaOSM: React.FC<MapaRotaOSMProps> = ({ ruas }) => {
  const [coords, setCoords] = useState<[number, number][]>([]);
  const [rota, setRota] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  // Geocodifica cada rua para coordenadas
useEffect(() => {
    if (!ruas || ruas.length === 0) return;
    setLoading(true);
    setCoords([]);
    setRota([]);

    // Chamando o endpoint do NOSSO backend que acabamos de criar
    fetch('http://localhost:3000/onibus/geocodificar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ruas: ruas }),
    })
    .then(res => res.json())
    .then(coordenadasRecebidas => {
      const validCoords = coordenadasRecebidas.filter(Boolean);
      setCoords(validCoords);
    })
    .catch(err => {
      console.error("Erro no processo de geocodificação:", err);
    })
    .finally(() => {
      setLoading(false);
    });

}, [ruas]); // Este hook roda toda vez que a lista de 'ruas' muda


  // Define o centro do mapa apenas uma vez
  useEffect(() => {
    if (coords.length > 0 && !mapCenter) {
      setMapCenter(coords[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  // Busca rota entre os pontos usando OSRM
  useEffect(() => {
    if (coords.length < 2) return;

    const coordsStr = coords.map((c) => `${c[1]},${c[0]}`).join(";");
    fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`
    )
      .then((res) => res.json())
      .then((data) => {
        if (
          data.routes &&
          data.routes[0] &&
          data.routes[0].geometry &&
          data.routes[0].geometry.coordinates
        ) {
          // OSRM retorna [lon, lat], precisamos inverter para [lat, lon]
          setRota(
            data.routes[0].geometry.coordinates.map(
              ([lon, lat]: [number, number]) => [lat, lon]
            )
          );
        }
      });
  }, [coords]);

  if (loading) return <div>Carregando mapa...</div>;
  if (coords.length === 0) return <div>Nenhuma rua encontrada.</div>;

  return (
    <div style={{ width: "100%", height: 500 }}>
      <MapContainer
        center={mapCenter || [-23.55, -46.63]} // valor padrão caso ainda não tenha coordenadas
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords.map((pos, idx) => (
          <Marker key={idx} position={pos}>
            <Popup>{ruas[idx]}</Popup>
          </Marker>
        ))}
        {rota.length > 1 && (
          <Polyline positions={rota} color="blue" weight={5} />
        )}
      </MapContainer>
    </div>
  );
};