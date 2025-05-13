"use client"

import type React from "react"

import { useState } from "react"

interface NovaReclamacaoFormProps {
  onClose: () => void
}

export default function NovaReclamacaoForm({ onClose }: NovaReclamacaoFormProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    linha: "",
    descricao: "",
    privacidade: "privada",
    anexos: [] as File[],
  })

  const categorias = [
    "Atraso de ônibus",
    "Problema com motorista/cobrador",
    "Condição do veículo",
    "Lotação excessiva",
    "Informação incorreta de horário",
    "Problema com tarifa/pagamento",
    "Problema com itinerário/rota",
    "Outros",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, anexos: [...prev.anexos, ...filesArray] }))
    }
  }

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      anexos: prev.anexos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você enviaria os dados para o servidor
    console.log("Dados do formulário:", formData)
    alert("Reclamação enviada com sucesso!")
    onClose()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Nova Reclamação</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            value={formData.titulo}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Resumo da sua reclamação"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            value={formData.categoria}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="linha" className="block text-sm font-medium text-gray-700 mb-1">
            Linha de Ônibus
          </label>
          <input
            type="text"
            id="linha"
            name="linha"
            value={formData.linha || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ex: 123 - Centro/Bairro"
          />
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            required
            value={formData.descricao}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Descreva detalhadamente sua reclamação ou comentário"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Privacidade</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="privacidade"
                value="privada"
                checked={formData.privacidade === "privada"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Privada (apenas você e a empresa)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="privacidade"
                value="publica"
                checked={formData.privacidade === "publica"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Pública (visível para todos)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Anexos</label>
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
              <span>Adicionar Arquivos</span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
            <span className="text-sm text-gray-500">Máximo 5 arquivos (imagens, PDF, documentos)</span>
          </div>

          {formData.anexos.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.anexos.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-gray-500"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Enviar Reclamação
          </button>
        </div>
      </form>
    </div>
  )
}
