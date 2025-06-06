"use client"

import type React from "react"

interface FiltrosProps {
  filtros: {
    status: string
    periodo: string
    linha: string
    ordenacao: string
  }
  onFiltroChange: (filtros: Partial<FiltrosProps["filtros"]>) => void
}

export default function FiltrosReclamacoes({ filtros, onFiltroChange }: FiltrosProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    onFiltroChange({ [name]: value })
  }

  return (
    <div className="bg-theme p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="status" className="block text-sm font-medium text-theme mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filtros.status}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option className="bg-theme" value="">Todos</option>
              <option className="bg-theme" value="aberta">Aberta</option>
              <option className="bg-theme" value="em_analise">Em análise</option>
              <option className="bg-theme" value="respondida">Respondida</option>
              <option className="bg-theme" value="resolvida">Resolvida</option>
              <option className="bg-theme" value="fechada">Fechada</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="linha" className="block text-sm font-medium text-theme mb-1">
              Linha
            </label>
            <input
              type="text"
              id="linha"
              name="linha"
              value={filtros.linha}
              onChange={handleChange}
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
              <option className="bg-theme" value="">Qualquer data</option>
              <option className="bg-theme" value="7dias">Últimos 7 dias</option>
              <option className="bg-theme" value="30dias">Últimos 30 dias</option>
              <option className="bg-theme" value="90dias">Últimos 90 dias</option>
              <option className="bg-theme" value="12meses">Últimos 12 meses</option>
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
            <option className="bg-theme" value="recentes">Mais recentes</option>
            <option className="bg-theme" value="antigas">Mais antigas</option>
            <option className="bg-theme" value="atualizadas">Recentemente atualizadas</option>
          </select>
        </div>
      </div>
    </div>
  )
}
