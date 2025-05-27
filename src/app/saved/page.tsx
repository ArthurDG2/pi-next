"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Plus, X } from "lucide-react";

interface SavedRoute {
    id: string;
    origin: string;
    destination: string;
    savedAt: string;
}

interface SavedLocation {
    id: string;
    name: string;
    address: string;
}

export default function SavedRoutes() {
    const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
    const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [newLocation, setNewLocation] = useState({ name: "", address: "" });

    useEffect(() => {
        // TODO: Implementar a lógica para buscar as rotas e locais salvos do usuário
        const mockRoutes: SavedRoute[] = [
            {
                id: "1",
                origin: "São Paulo",
                destination: "Rio de Janeiro",
                savedAt: "2024-03-20",
            },
            {
                id: "2",
                origin: "Belo Horizonte",
                destination: "Salvador",
                savedAt: "2024-03-19",
            },
        ];

        const mockLocations: SavedLocation[] = [
            {
                id: "1",
                name: "Casa",
                address: "Rua das Flores, 123 - São Paulo",
            },
            {
                id: "2",
                name: "Trabalho",
                address: "Av. Paulista, 1000 - São Paulo",
            },
        ];

        setSavedRoutes(mockRoutes);
        setSavedLocations(mockLocations);
        setLoading(false);
    }, []);

    const handleAddLocation = () => {
        if (newLocation.name && newLocation.address) {
            const location: SavedLocation = {
                id: Date.now().toString(),
                name: newLocation.name,
                address: newLocation.address,
            };
            setSavedLocations([...savedLocations, location]);
            setNewLocation({ name: "", address: "" });
            setIsAddingLocation(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                {/* Seção de Endereços Favoritos */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Meus Endereços</h2>
                        <button
                            onClick={() => setIsAddingLocation(true)}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Plus size={20} />
                            Adicionar Endereço
                        </button>
                    </div>

                    {isAddingLocation && (
                        <div className="bg-theme border border-neutral-100 p-4 rounded-lg shadow-md mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Novo Endereço</h3>
                                <button
                                    onClick={() => setIsAddingLocation(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme mb-1">
                                        Nome do Local
                                    </label>
                                    <input
                                        type="text"
                                        value={newLocation.name}
                                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Ex: Casa, Trabalho, Faculdade"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme mb-1">
                                        Endereço
                                    </label>
                                    <input
                                        type="text"
                                        value={newLocation.address}
                                        onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Digite o endereço completo"
                                    />
                                </div>
                                <button
                                    onClick={handleAddLocation}
                                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Salvar Endereço
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        {savedLocations.map((location) => (
                            <div
                                key={location.id}
                                className="bg-theme border border-neutral-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg">{location.name}</h3>
                                        <p className="text-theme">{location.address}</p>
                                    </div>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        onClick={() => {
                                            // TODO: Implementar a lógica para remover o local
                                            console.log("Remover local:", location.id);
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Seção de Rotas Favoritas */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Minhas Rotas Favoritas</h2>
                    {savedRoutes.length === 0 ? (
                        <p className="text-gray-600">Você ainda não salvou nenhuma rota.</p>
                    ) : (
                        <div className="grid gap-4">
                            {savedRoutes.map((route) => (
                                <div
                                    key={route.id}
                                    className="bg-theme border border-neutral-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg">
                                                {route.origin} → {route.destination}
                                            </h2>
                                            <p className="text-sm text-theme">
                                                Salvo em: {new Date(route.savedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            onClick={() => {
                                                // TODO: Implementar a lógica para remover a rota dos favoritos
                                                console.log("Remover rota:", route.id);
                                            }}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
} 