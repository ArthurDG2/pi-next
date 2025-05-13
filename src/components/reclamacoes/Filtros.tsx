"use client"

import type React from "react"

import { useState } from "react"

export default function FiltrosReclamacoes() {
  const [filtros, setFiltros] = useState({
    status: "",
    periodo: "",
    linha: "",
    ordenacao: "recentes",
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFiltros((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filtros.status}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Todos</option>
              <option value="aberta">Aberta</option>
              <option value="em_analise">Em análise</option>
              <option value="respondida">Respondida</option>
              <option value="resolvida">Resolvida</option>
              <option value="fechada">Fechada</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="linha" className="block text-sm font-medium text-gray-700 mb-1">
              Linha
            </label>
            <input
              type="text"
              id="linha"
              name="linha"
              value={filtros.linha}
              onChange={(e) => setFiltros((prev) => ({ ...prev, linha: e.target.value }))}
              placeholder="Ex: 305"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 mb-1">
              Período
            </label>
            <select
              id="periodo"
              name="periodo"
              value={filtros.periodo}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Qualquer data</option>
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
              <option value="90dias">Últimos 90 dias</option>
              <option value="12meses">Últimos 12 meses</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <label htmlFor="ordenacao" className="block text-sm font-medium text-gray-700 mb-1">
            Ordenar por
          </label>
          <select
            id="ordenacao"
            name="ordenacao"
            value={filtros.ordenacao}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="recentes">Mais recentes</option>
            <option value="antigas">Mais antigas</option>
            <option value="atualizadas">Recentemente atualizadas</option>
          </select>
        </div>
      </div>
    </div>
  )
}
