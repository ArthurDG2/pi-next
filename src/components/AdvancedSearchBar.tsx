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
      {/* Inputs como já estavam */}
      {/* ... */}
    </form>
  );
}

export default AdvancedSearchBar;
