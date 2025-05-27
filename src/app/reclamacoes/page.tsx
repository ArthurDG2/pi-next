"use client"

import { useState } from "react"
import NovaReclamacaoForm from "@/components/reclamacoes/Novas"
import ListaReclamacoes from "@/components/reclamacoes/Lista"
import FiltrosReclamacoes from "@/components/reclamacoes/Filtros"
import { Navbar } from "@/components/Navbar"

export default function ReclamacoesComentariosPage() {
  const [activeTab, setActiveTab] = useState("minhas")
  const [filtros, setFiltros] = useState({
    status: "",
    periodo: "",
    linha: "",
    ordenacao: "recentes",
  })

  const tabs = [
    { id: "minhas", label: "Minhas Reclamações" },
    { id: "publicas", label: "Reclamações Públicas" },
    { id: "nova", label: "Reportar Problema" },
  ]

  // Função para atualizar os filtros
  const handleFiltroChange = (novosFiltros: any) => {
    setFiltros((prev) => ({ ...prev, ...novosFiltros }))
  }

  return (
    <main className="w-full">
      <Navbar />
      <div className="bg-theme rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-center font-medium text-sm ${activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "nova" ? (
            <NovaReclamacaoForm onClose={() => setActiveTab("minhas")} />
          ) : (
            <>
              <FiltrosReclamacoes filtros={filtros} onFiltroChange={handleFiltroChange} />
              <ListaReclamacoes tipo={activeTab} filtros={filtros} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
