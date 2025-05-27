"use client"

import { useState } from "react"

import { useTheme } from "@/hooks/useTheme";


export default function PreferencesSection() {
  const { theme, changeTheme } = useTheme();
  const [preferences, setPreferences] = useState({
    theme: "light",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  })

  const handleNotificationChange = (type: string) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [type]: !preferences.notifications[type as keyof typeof preferences.notifications],
      },
    })
  }

  return (
    <div className="space-y-6 bg-theme">
      <h2 className="text-xl font-semibold border-b pb-2">Preferências</h2>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tema</h3>
          <div className="flex gap-4">
            <button
              onClick={() => changeTheme("light")}
              className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-400"
                }`}
            >
              <div className="w-16 h-16 bg-theme border border-gray-200 rounded-lg mb-2 flex items-center justify-center">
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
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <span>Claro</span>
            </button>

            <button
              onClick={() => changeTheme("dark")}
              className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${theme === "dark" ? "border-blue-500 bg-gray-800" : "border-gray-200 hover:bg-gray-400"
                }`}
            >
              <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg mb-2 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
              <span>Escuro</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notificações</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por Email</p>
                <p className="text-sm text-gray-500">Receba atualizações por email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications.email}
                  onChange={() => handleNotificationChange("email")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações Push</p>
                <p className="text-sm text-gray-500">Receba notificações no navegador</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications.push}
                  onChange={() => handleNotificationChange("push")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações SMS</p>
                <p className="text-sm text-gray-500">Receba notificações por SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications.sms}
                  onChange={() => handleNotificationChange("sms")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
