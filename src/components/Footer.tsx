import { Bus } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-950 border-t border-gray-700">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Bus className="h-7 w-7 text-blue-500" />
              <span className="text-xl font-bold">InfoBus</span>
            </Link>
            <p className="text-sm text-gray-400 mt-2">Seu guia de transporte para a cidade.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-blue-500">Início</Link>
              <Link href="/pesquisar" className="text-gray-300 hover:text-blue-500">Pesquisar</Link>
              <Link href="/minha-conta" className="text-gray-300 hover:text-blue-500">Minha Conta</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} InfoBus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}