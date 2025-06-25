// app/pesquisar/page.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { AdvancedSearchBar } from '@/components/AdvancedSearchBar';
import { Bus, Loader2, ServerCrash, PlusCircle, X } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Pagination } from '@/components/pagination'; 

interface OnibusResult {
  _id: string;
  Num_Onibus: string;
  Empresa_Controladora: string;
  Rota: string[];
}

export default function PesquisarPage() {
  const [allRoutes, setAllRoutes] = useState<OnibusResult[]>([]);
  const [displayedRoutes, setDisplayedRoutes] = useState<OnibusResult[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [additionalRuas, setAdditionalRuas] = useState<string[]>([]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchAllRoutes = async () => {
      try {
        const response = await axios.get('https://api-infobus-proj-pi.onrender.com/onibus'); 
        setAllRoutes(response.data);
        setDisplayedRoutes(response.data);
      } catch (err) {
        setError('Não foi possível carregar as linhas de ônibus.');
        console.error(err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllRoutes();
  }, []);

  const handleSearch = async (filtros: any) => {
    const todasAsRuas = [...(filtros.ruas || []), ...additionalRuas].filter(Boolean);
    const payload = { ...filtros, ruas: todasAsRuas, dia: 'Semana' };
    const hasFilters = Object.values(payload).some(value => Array.isArray(value) ? value.length > 0 : value);

    setCurrentPage(1); 

    if (!hasFilters) {
      setDisplayedRoutes(allRoutes);
      setIsSearchActive(false);
      return;
    }

    setIsSearching(true);
    setIsSearchActive(true);
    setError(null);

    try {
      const response = await axios.post('https://api-infobus-proj-pi.onrender.com/onibus/pesquisa-avancada', payload);
      setDisplayedRoutes(response.data);
    } catch (err) {
      setError('Ocorreu um erro ao buscar. Tente novamente.');
      setDisplayedRoutes([]);
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleAdditionalRuaChange = (index: number, value: string) => {
    const newRuas = [...additionalRuas];
    newRuas[index] = value;
    setAdditionalRuas(newRuas);
  };
  const addAdditionalRua = () => setAdditionalRuas([...additionalRuas, '']);
  const removeAdditionalRua = (index: number) => setAdditionalRuas(additionalRuas.filter((_, i) => i !== index));


  const totalPages = Math.ceil(displayedRoutes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRoutes = displayedRoutes.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto max-w-4xl py-12 px-4">
          <AdvancedSearchBar onSearch={handleSearch} isLoading={isSearching} />
          <div className="mt-4 space-y-2">
            {additionalRuas.map((rua, index) => (
              <div key={index} className="flex items-center gap-2 animate-in fade-in">
                <input type="text" placeholder={`Local adicional ${index + 1}`} value={rua} onChange={(e) => handleAdditionalRuaChange(index, e.target.value)} className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800" />
                <button onClick={() => removeAdditionalRua(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><X size={18}/></button>
              </div>
            ))}
            <button onClick={addAdditionalRua} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"><PlusCircle size={16} />Adicionar outro local de passagem</button>
          </div>
        </div>
        
        <div className="container mx-auto max-w-4xl pb-12 px-4">
          {isInitialLoading ? (
            <div className="text-center p-8"><Loader2 className="animate-spin text-blue-600 mx-auto" size={40} /></div>
          ) : error ? (
            <div className="text-center p-8 bg-red-100 border border-red-300 rounded-lg"><ServerCrash className="mx-auto text-red-500 mb-2" size={32}/><p className="text-red-700">{error}</p></div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {isSearchActive ? `Resultados da Pesquisa (${displayedRoutes.length})` : `Todas as Linhas (${displayedRoutes.length})`}
              </h2>

              {paginatedRoutes.length > 0 ? (
                
                paginatedRoutes.map((onibus) => (
                  <Link href={`/onibus/${onibus._id}`} key={onibus._id} className="block bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:border-blue-600 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Linha {onibus.Num_Onibus}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{onibus.Empresa_Controladora}</p>
                      </div>
                      <Bus className="text-blue-600" />
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {isSearchActive ? "Nenhum resultado encontrado para sua busca." : "Nenhuma linha cadastrada."}
                </p>
              )}

              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}