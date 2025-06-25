"use client";

import { useState } from 'react';
import { Search, MapPin, Clock, Building } from 'lucide-react';

interface FiltroBusca {
  cidade: string;
  ruas: string[];
  horario: string;
  empresa: string;
}

type SearchBarProps = {
  onSearch: (filtros: FiltroBusca) => void;
  isLoading: boolean;
};

export function AdvancedSearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [cidade, setCidade] = useState('Indaiatuba');
  const [rua, setRua] = useState('');
  const [horario, setHorario] = useState('');
  const [empresa, setEmpresa] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      cidade,
      ruas: rua ? [rua] : [],
      horario,
      empresa,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-700 shadow-lg"
    >
      {/* Input: Cidade */}
      <div className="flex items-center pl-5 pr-3 flex-shrink-0">
        <MapPin size={18} className="text-gray-400" />
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Cidade"
          className="bg-transparent focus:outline-none p-2 w-32 text-gray-700 dark:text-gray-200"
        />
      </div>
      {/* Separador vertical */}
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-600"></div>

      {/* Input: Passa por (Rua) - O campo principal */}
      <div className="flex items-center pl-4 flex-grow">
        <input
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          placeholder="Passa por qual rua ou bairro?"
          className="bg-transparent focus:outline-none p-2 w-full text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Input: Horário (opcional) */}
      <div className="flex items-center pr-3 flex-shrink-0">
        <Clock size={18} className="text-gray-400" />
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          className="bg-transparent focus:outline-none p-2 text-gray-500 dark:text-gray-400"
        />
      </div>
      
       {/* Separador vertical */}
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-600"></div>

      {/* Input: Empresa (opcional) */}
       <div className="flex items-center pl-4 pr-2 flex-shrink-0">
         <Building size={18} className="text-gray-400" />
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Empresa"
            className="bg-transparent focus:outline-none p-2 w-32 text-gray-700 dark:text-gray-200"
          />
       </div>

      {/* Botão de Pesquisa */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-full p-3 m-1 disabled:bg-gray-400"
      >
        <Search size={24} />
      </button>
    </form>
  );
}

export default AdvancedSearchBar;
