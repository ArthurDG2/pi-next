"use client"

import { useState } from "react"

export default function DataSection() {
  // Dados de exemplo
  const [favoriteRoutes] = useState([
    { id: 1, name: "Casa → Trabalho", distance: "12 km", frequency: "Diária" },
    { id: 2, name: "Casa → Academia", distance: "3 km", frequency: "3x por semana" },
    { id: 3, name: "Trabalho → Shopping", distance: "5 km", frequency: "Semanal" },
  ])

  const [history] = useState([
    { id: 1, route: "Casa → Trabalho", date: "13/05/2025", time: "08:15" },
    { id: 2, route: "Trabalho → Casa", date: "13/05/2025", time: "18:30" },
    { id: 3, route: "Casa → Academia", date: "12/05/2025", time: "19:00" },
    { id: 4, route: "Academia → Casa", date: "12/05/2025", time: "20:45" },
    { id: 5, route: "Casa → Shopping", date: "11/05/2025", time: "14:20" },
  ])

  const [activeTab, setActiveTab] = useState("favoritas")

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Dados</h2>

      <div className="border-b border-gray-200 bg-theme">
        <nav className="flex space-x-8 bg-theme">
          <button
            onClick={() => setActiveTab("favoritas")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "favoritas"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
          >
            Rotas Favoritas
          </button>
          <button
            onClick={() => setActiveTab("historico")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "historico"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
          >
            Histórico
          </button>
        </nav>
      </div>

      {activeTab === "favoritas" && (
        <div className="overflow-x-auto bg-theme">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Distância
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Frequência
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-theme divide-y divide-gray-200">
              {favoriteRoutes.map((route) => (
                <tr key={route.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-theme">{route.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-theme">{route.distance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-theme">{route.frequency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-800">Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "historico" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-theme">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rota
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hora
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-theme divide-y divide-gray-200">
              {history.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-theme">{item.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-theme">{item.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-theme">{item.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Ver Detalhes</button>
                    <button className="text-red-600 hover:text-red-800">Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
