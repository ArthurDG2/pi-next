
// src/app/onibus/page.tsx
import Link from 'next/link';
import { Navbar } from '@/components/Navbar'; // Ajuste o caminho se necessário
import { Bus } from 'lucide-react';

// Define a "forma" dos dados do ônibus
interface Onibus {
  _id: string;
  Num_Onibus: string;
  Empresa_Controladora: string;
  Rota: string[];
}

// Função para buscar os dados na sua API
async function getOnibus(): Promise<Onibus[]> {
  try {
    const res = await fetch('http://localhost:3000/onibus', {
      cache: 'no-store', // Garante que os dados sejam sempre frescos
    });
    if (!res.ok) {
      throw new Error('Falha ao buscar dados dos ônibus');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}

// O componente da página
export default async function ListaOnibusPage() {
  const onibusList = await getOnibus();

  return (
    <div className="bg-theme min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-theme">
          Todas as Rotas
        </h1>
        {onibusList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onibusList.map((onibus) => (
              <Link href={`/onibus/${onibus._id}`} key={onibus._id}>
                <div className="bg-card p-6 rounded-lg shadow hover:shadow-xl transition-shadow border border-theme">
                  <div className="flex items-center gap-4 mb-2">
                    <Bus className="text-primary" size={28} />
                    <h2 className="text-2xl font-bold text-card">
                      Linha {onibus.Num_Onibus}
                    </h2>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    Operado por: {onibus.Empresa_Controladora}
                  </p>
                  <div className="text-xs text-muted">
                    <p>Início: {onibus.Rota[0]}</p>
                    <p>Fim: {onibus.Rota[onibus.Rota.length - 1]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Nenhuma rota encontrada.</p>
        )}
      </main>
    </div>
  );
}