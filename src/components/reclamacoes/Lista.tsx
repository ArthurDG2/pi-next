"use client"
import ReclamacaoItem from "./ReclamacaoItem"

interface ListaReclamacoesProps {
  tipo: string
}

// Dados de exemplo
const reclamacoesMock = [
  {
    id: 1,
    titulo: "Ônibus não parou no ponto",
    categoria: "Problema com motorista/cobrador",
    linha: "305 - Terminal Central/Bairro Vista Verde",
    data: "13/05/2025",
    status: "aberta",
    descricao:
      "Hoje às 7:30 da manhã, o ônibus da linha 305 passou direto pelo ponto onde eu estava esperando, mesmo com sinal feito. Havia outras 3 pessoas no ponto também sinalizando.",
    respostas: [],
    privacidade: "privada",
  },
  {
    id: 2,
    titulo: "Cobrança incorreta de tarifa",
    categoria: "Problema com tarifa/pagamento",
    linha: "157 - Circular Centro",
    data: "10/05/2025",
    status: "em_analise",
    descricao:
      "Fui cobrado tarifa integral mesmo apresentando meu cartão de estudante. O cobrador alegou que meu cartão estava desatualizado, mas verifiquei no aplicativo e está válido.",
    respostas: [
      {
        autor: "Atendimento",
        data: "11/05/2025",
        mensagem:
          "Estamos analisando seu caso. Por favor, poderia nos informar o número do seu cartão de estudante e o horário exato da viagem?",
      },
    ],
    privacidade: "privada",
  },
  {
    id: 3,
    titulo: "Horário incorreto no aplicativo",
    categoria: "Informação incorreta de horário",
    linha: "722 - Terminal Norte/Shopping",
    data: "05/05/2025",
    status: "resolvida",
    descricao:
      "O aplicativo mostrava que o próximo ônibus da linha 722 passaria às 14:15, mas só passou às 14:45. Perdi um compromisso importante por causa desse atraso.",
    respostas: [
      {
        autor: "Atendimento",
        data: "06/05/2025",
        mensagem:
          "Identificamos um problema técnico na atualização dos horários em tempo real. Nossa equipe está trabalhando para resolver.",
      },
      {
        autor: "Atendimento",
        data: "08/05/2025",
        mensagem:
          "O problema foi corrigido e os horários estão sendo atualizados corretamente. Como compensação, estamos adicionando 2 passagens gratuitas ao seu cartão.",
      },
      {
        autor: "Você",
        data: "09/05/2025",
        mensagem: "Obrigado pela resolução e pelas passagens. O aplicativo está funcionando corretamente agora.",
      },
    ],
    privacidade: "publica",
  },
  {
    id: 4,
    titulo: "Ônibus extremamente lotado",
    categoria: "Lotação excessiva",
    linha: "405 - Terminal Sul/Centro",
    data: "01/05/2025",
    status: "fechada",
    descricao:
      "O ônibus da linha 405 que passa às 18h está sempre extremamente lotado. Hoje foi impossível entrar, e quando consegui, foi desconfortável e inseguro. Precisamos de mais ônibus nesse horário.",
    respostas: [
      {
        autor: "Atendimento",
        data: "02/05/2025",
        mensagem:
          "Agradecemos seu relato. Vamos analisar a demanda nesse horário e verificar a possibilidade de aumentar a frota.",
      },
      {
        autor: "Gerência",
        data: "03/05/2025",
        mensagem:
          "Após análise, decidimos adicionar um ônibus extra na linha 405 no horário de pico (17:30-19:00) a partir da próxima semana. Agradecemos sua contribuição para melhorarmos o serviço.",
      },
    ],
    privacidade: "publica",
  },
  {
    id: 5,
    titulo: "Ar condicionado quebrado",
    categoria: "Condição do veículo",
    linha: "210 - Expresso Aeroporto",
    data: "28/04/2025",
    status: "respondida",
    descricao:
      "O ar condicionado do ônibus da linha 210 não estava funcionando hoje. A temperatura estava muito alta e a viagem foi extremamente desconfortável, especialmente considerando que é uma linha expressa com tarifa diferenciada.",
    respostas: [
      {
        autor: "Atendimento",
        data: "29/04/2025",
        mensagem:
          "Lamentamos o ocorrido. O veículo foi encaminhado para manutenção e será substituído até que o reparo seja concluído. Agradecemos o relato.",
      },
    ],
    privacidade: "privada",
  },
]

export default function ListaReclamacoes({ tipo }: ListaReclamacoesProps) {
  // Filtramos as reclamações com base no tipo (minhas ou públicas)
  const reclamacoes = tipo === "publicas" ? reclamacoesMock.filter((r) => r.privacidade === "publica") : reclamacoesMock

  if (reclamacoes.length === 0) {
    return (
      <div className="text-center py-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-gray-400 mb-4"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma reclamação encontrada</h3>
        <p className="text-gray-500">
          {tipo === "publicas"
            ? "Não há reclamações públicas disponíveis no momento."
            : "Você ainda não registrou nenhuma reclamação ou comentário."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reclamacoes.map((reclamacao) => (
        <ReclamacaoItem key={reclamacao.id} reclamacao={reclamacao} />
      ))}
    </div>
  )
}
