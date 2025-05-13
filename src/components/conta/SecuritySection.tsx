"use client"

import type React from "react"

import { useState } from "react"

export default function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Todos os campos são obrigatórios")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres")
      return
    }

    // Simulação de alteração de senha bem-sucedida
    setSuccess("Senha alterada com sucesso!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Segurança</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <h3 className="text-lg font-medium">Alterar Senha</h3>

        {error && <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded">{error}</div>}

        {success && <div className="p-3 bg-green-100 border border-green-200 text-green-700 rounded">{success}</div>}

        <div className="space-y-1">
          <label htmlFor="currentPassword" className="text-sm text-gray-500">
            Senha Atual
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="newPassword" className="text-sm text-gray-500">
            Nova Senha
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm text-gray-500">
            Confirmar Nova Senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Alterar Senha
        </button>
      </form>
    </div>
  )
}
