"use client"

import { useState } from "react"
import ProfileSection from "@/components/conta/ProfileSection"
import SecuritySection from "@/components/conta/SecuritySection"
import PreferencesSection from "@/components/conta/PreferencesSection"
import DataSection from "@/components/conta/DataSection"
import { Navbar } from "@/components/Navbar"

export default function MinhaContaPage() {
  const [activeTab, setActiveTab] = useState("perfil")

  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "seguranca", label: "Segurança" },
    { id: "preferencias", label: "Preferências" },
    { id: "dados", label: "Dados" },
  ]

  return (
    <main className="w-full">
      <Navbar />

      <div className="flex flex-col md:flex-row gap-8 py-10 mx-10">
        {/* Sidebar / Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      activeTab === tab.id ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === "perfil" && <ProfileSection />}
          {activeTab === "seguranca" && <SecuritySection />}
          {activeTab === "preferencias" && <PreferencesSection />}
          {activeTab === "dados" && <DataSection />}
        </div>
      </div>
    </main>
  )
}
