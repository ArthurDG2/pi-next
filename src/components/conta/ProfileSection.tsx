"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
  })
  const [tempData, setTempData] = useState({ ...profileData })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempData({ ...tempData, [name]: value })
  }

  const handleSave = () => {
    setProfileData({ ...tempData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData({ ...profileData })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Informações Pessoais</h2>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Foto de perfil"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Alterar foto"
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
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14l2 2 4-4"></path>
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-4 w-full">
          {!isEditing ? (
            <>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Nome</p>
                <p className="font-medium">{profileData.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profileData.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium">{profileData.phone}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Editar Informações
              </button>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm text-gray-500">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm text-gray-500">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={tempData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
