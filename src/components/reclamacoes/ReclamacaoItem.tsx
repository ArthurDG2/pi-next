"use client"

import type React from "react"

import { useState } from "react"

interface Resposta {
  autor: string
  data: string
  mensagem: string
}

interface Reclamacao {
  id: number
  titulo: string
  categoria: string
  linha: string
  data: string
  status: string
  descricao: string
  respostas: Resposta[]
  privacidade: string
}

interface ReclamacaoItemProps {
  reclamacao: Reclamacao
}

export default function ReclamacaoItem({ reclamacao }: ReclamacaoItemProps) {
  const [expandida, setExpandida] = useState(false)
  const [novaResposta, setNovaResposta] = useState("")
  const [mostrarFormResposta, setMostrarFormResposta] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      aberta: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Aberta" },
      em_analise: { bg: "bg-blue-100", text: "text-blue-800", label: "Em análise" },
      respondida: { bg: "bg-purple-100", text: "text-purple-800", label: "Respondida" },
      resolvida: { bg: "bg-green-100", text: "text-green-800", label: "Resolvida" },
      fechada: { bg: "bg-gray-100", text: "text-gray-800", label: "Fechada" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.aberta

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    )
  }

  const handleSubmitResposta = (e: React.FormEvent) => {
    e.preventDefault()
    if (novaResposta.trim()) {
      // Aqui você enviaria a resposta para o servidor
      console.log("Nova resposta:", novaResposta)
      alert("Resposta enviada com sucesso!")
      setNovaResposta("")
      setMostrarFormResposta(false)
    }
  }

  return (
    <div className="border-theme border rounded-lg overflow-hidden">
      <div
        className="p-4 bg-card cursor-pointer hover-theme transition-colors"
        onClick={() => setExpandida(!expandida)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-medium text-theme">{reclamacao.titulo}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted">
              <span>#{reclamacao.id}</span>
              <span>•</span>
              <span>{reclamacao.categoria}</span>
              <span>•</span>
              <span>Linha: {reclamacao.linha}</span>
              <span>•</span>
              <span>{reclamacao.data}</span>
              {reclamacao.privacidade === "publica" && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Pública
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(reclamacao.status)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${expandida ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {expandida && (
        <div className="border-t border-theme p-4 bg-card">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-theme mb-2">Descrição</h4>
            <p className="text-theme whitespace-pre-line">{reclamacao.descricao}</p>
          </div>

          {reclamacao.respostas.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-theme mb-2">Respostas</h4>
              <div className="space-y-3">
                {reclamacao.respostas.map((resposta, index) => (
                  <div key={index} className="bg-theme p-3 rounded border border-theme">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-medium ${resposta.autor === "Você" ? "text-primary" : "text-theme"}`}>
                        {resposta.autor}
                      </span>
                      <span className="text-xs text-muted">{resposta.data}</span>
                    </div>
                    <p className="text-theme">{resposta.mensagem}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {!mostrarFormResposta && reclamacao.status !== "fechada" && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setMostrarFormResposta(true)
                }}
                className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded hover:opacity-90 transition-colors"
              >
                Responder
              </button>
            )}

            {reclamacao.status !== "fechada" && (
              <button className="px-3 py-1.5 bg-card text-theme text-sm rounded hover-theme transition-colors">
                {reclamacao.status === "resolvida" ? "Reabrir" : "Marcar como resolvida"}
              </button>
            )}
          </div>

          {mostrarFormResposta && (
            <form onSubmit={handleSubmitResposta} className="mt-4">
              <textarea
                value={novaResposta}
                onChange={(e) => setNovaResposta(e.target.value)}
                className="w-full p-2 border border-input bg-input rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                rows={3}
                placeholder="Escreva sua resposta..."
                required
              ></textarea>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setMostrarFormResposta(false)}
                  className="px-3 py-1.5 bg-card text-theme text-sm rounded hover-theme transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded hover:opacity-90 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
