'use client'

import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { EditableField } from '@/components/EditableField';
import Image from "next/image";

export default function AcountPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "João Silva",
        email: "usuario@exemplo.com",
        phone: "(11) 98765-4321",
      });

    const handleSave = () => {
        setIsEditing(false);
        //lógica para enviar os dados atualizados para o backend
      };

    return (
        <div>
            <Navbar />
            <div>
                <div>
                    <Image
                        className="rounded-full aspect-square"
                        src="/perfil.jpg"
                        alt="Imagem de perfil"
                        width={100}
                        height={100}
                    />
                    <h1>Gustavo Silva</h1>
                    <h2>gustacar2009@gmail.com</h2>
                </div>

                <div>
      <h3>Dados da Conta</h3>
      <div className="max-w-62">
        <EditableField
          label="Nome"
          value={user.name}
          isEditing={isEditing}
          onChange={(value) => setUser({ ...user, name: value })}
        />
        <EditableField
          label="E-mail"
          value={user.email}
          isEditing={isEditing}
          onChange={(value) => setUser({ ...user, email: value })}
        />
        <EditableField
          label="Telefone"
          value={user.phone}
          isEditing={isEditing}
          onChange={(value) => setUser({ ...user, phone: value })}
        />
      </div>
      {isEditing ? (
        <div className="flex gap-2">
          <button 
            onClick={handleSave}
            className="px-4 py-2 border border-black text-black rounded-md"
          >
            Salvar
          </button>
          <button 
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 border border-black text-black rounded-md"
        >
          Editar dados
        </button>
      )}
    </div>
            </div>
        </div>
    )
}