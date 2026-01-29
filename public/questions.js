// Legal Operations Diagnosis - Question Bank
// 10 sections with 5 questions each = 50 total questions

const questionnaire = {
  metadata: {
    title: "Diagnóstico Operacional - Escritórios de Advocacia",
    version: "1.0",
    estimatedTime: "20-30 minutos",
    totalSections: 10
  },
  
  sections: [
    {
      id: 1,
      title: "Captação e Admissão de Clientes",
      description: "Identificar gargalos na captação de leads, qualificação e onboarding de novos clientes.",
      estimatedTime: "3-4 minutos",
      questions: [
        {
          id: "q1_1",
          text: "Como você rastreia atualmente a origem das consultas de novos clientes?",
          type: "multiple-choice",
          required: true,
          options: [
            "Não rastreamos a origem",
            "Rastreamento informal (memória, anotações)",
            "Planilha ou documento",
            "CRM ou sistema de gestão",
            "Plataforma dedicada de análise de marketing"
          ]
        },
        {
          id: "q1_2",
          text: "Qual é o tempo médio de resposta desde o contato inicial até a primeira consulta?",
          type: "multiple-choice",
          required: true,
          options: [
            "Até 1 hora útil",
            "Até 4 horas úteis",
            "Até 24 horas",
            "2-3 dias",
            "Mais de 3 dias",
            "Não acompanhamos este indicador"
          ]
        },
        {
          id: "q1_3",
          text: "Quanto tempo leva, em média, o processo de verificação de conflitos de interesse?",
          type: "numeric",
          required: true,
          unit: "horas",
          min: 0,
          max: 168,
          helpText: "Informe o tempo em horas (ex: 24 para um dia, 48 para dois dias)"
        },
        {
          id: "q1_4",
          text: "Quantas pessoas precisam aprovar um contrato de honorários antes de enviá-lo ao cliente?",
          type: "numeric",
          required: true,
          min: 0,
          max: 10
        },
        {
          id: "q1_5",
          text: "Quantas vezes as informações do cliente são reinseridas em sistemas diferentes?",
          type: "multiple-choice",
          required: true,
          options: [
            "Nenhuma (entrada única)",
            "1 vez (2 sistemas)",
            "2 vezes (3 sistemas)",
            "3 vezes (4 sistemas)",
            "4 ou mais vezes (5+ sistemas)"
          ]
        }
      ]
    },
    
    {
      id: 2,
      title: "Gestão de Processos e Fluxo de Trabalho",
      description: "Identificar ineficiências no manuseio de casos, atribuição de tarefas e acompanhamento de progresso.",
      estimatedTime: "3-4 minutos",
      questions: [
        {
          id: "q2_1",
          text: "Como você organiza os arquivos dos processos?",
          type: "multiple-choice",
          required: true,
          options: [
            "Principalmente arquivos físicos",
            "Principalmente arquivos digitais",
            "Híbrido (físico e digital)",
            "Sistema de gestão documental em nuvem",
            "Sistema de gestão de processos integrado"
          ]
        },
        {
          id: "q2_2",
          text: "Como os prazos são rastreados e comunicados aos advogados responsáveis?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Agenda de papel",
            "Agenda digital pessoal (Outlook, Google)",
            "Agenda compartilhada da equipe",
            "Sistema de gestão de processos",
            "Sistema dedicado de controle de prazos",
            "Lembretes manuais da equipe administrativa"
          ],
          helpText: "Selecione todas as opções que se aplicam"
        },
        {
          id: "q2_3",
          text: "Quando vários advogados trabalham em um documento, como você gerencia as versões?",
          type: "multiple-choice",
          required: true,
          options: [
            "Anexos de e-mail com números de versão",
            "Pasta compartilhada com convenções de nomenclatura",
            "Sistema de gestão documental com controle de versão",
            "Ferramentas de colaboração em nuvem (Google Docs, Office 365)",
            "Sem controle formal de versões"
          ]
        },
        {
          id: "q2_4",
          text: "Se um cliente solicitar uma atualização do status do caso, em quanto tempo você pode fornecê-la?",
          type: "multiple-choice",
          required: true,
          options: [
            "Imediatamente (acesso em tempo real)",
            "Até 1 hora (preciso reunir informações)",
            "Até 4 horas",
            "Até 24 horas",
            "Mais de 24 horas"
          ]
        },
        {
          id: "q2_5",
          text: "Quanto tempo leva, em média, a transferência de um processo de um advogado para outro?",
          type: "numeric",
          required: true,
          unit: "horas",
          min: 0,
          max: 168,
          helpText: "Considere o tempo total desde a decisão até a conclusão da transferência"
        }
      ]
    },
    
    {
      id: 3,
      title: "Controle de Tempo e Faturamento",
      description: "Identificar vazamento de receita, descontos e ineficiências no faturamento.",
      estimatedTime: "3-4 minutos",
      questions: [
        {
          id: "q3_1",
          text: "Com que frequência os advogados registram seu tempo de trabalho?",
          type: "multiple-choice",
          required: true,
          options: [
            "Em tempo real (conforme o trabalho é realizado)",
            "Várias vezes por dia",
            "Uma vez por dia",
            "Semanalmente",
            "Quinzenalmente ou mensalmente",
            "De forma inconsistente"
          ]
        },
        {
          id: "q3_2",
          text: "Que percentual do tempo trabalhado você estima que nunca é faturado?",
          type: "numeric",
          required: true,
          unit: "%",
          min: 0,
          max: 100,
          helpText: "Informe um valor entre 0 e 100"
        },
        {
          id: "q3_3",
          text: "Quem revisa os lançamentos de tempo antes de se tornarem faturas?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Sem processo de revisão",
            "Autorrevisão do advogado",
            "Revisão do sócio",
            "Revisão do coordenador de faturamento",
            "Revisão prévia com o cliente"
          ]
        },
        {
          id: "q3_4",
          text: "Com que frequência você reduz ou cancela valores de tempo lançado?",
          type: "likert",
          required: true,
          scale: 5,
          labels: {
            1: "Nunca",
            2: "Raramente",
            3: "Às vezes",
            4: "Frequentemente",
            5: "Muito frequentemente"
          }
        },
        {
          id: "q3_5",
          text: "Quanto tempo leva desde o fim do mês até a entrega das faturas aos clientes?",
          type: "numeric",
          required: true,
          unit: "dias",
          min: 0,
          max: 60
        }
      ]
    },
    
    {
      id: 4,
      title: "Produção de Documentos e Gestão do Conhecimento",
      description: "Revelar retrabalho, caos em modelos e silos de conhecimento.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q4_1",
          text: "Onde seus modelos de documentos estão armazenados?",
          type: "multiple-choice",
          required: true,
          options: [
            "Drives locais individuais",
            "Pasta de rede compartilhada",
            "Sistema de gestão documental",
            "Armazenamento em nuvem",
            "Sem localização central"
          ]
        },
        {
          id: "q4_2",
          text: "Quanto tempo leva, em média, para encontrar um documento precedente relevante?",
          type: "numeric",
          required: true,
          unit: "minutos",
          min: 0,
          max: 120
        },
        {
          id: "q4_3",
          text: "Com que frequência os advogados pesquisam questões já pesquisadas por colegas sem saber?",
          type: "likert",
          required: true,
          scale: 5,
          labels: {
            1: "Nunca",
            2: "Raramente",
            3: "Às vezes",
            4: "Frequentemente",
            5: "Muito frequentemente"
          }
        },
        {
          id: "q4_4",
          text: "Quanto tempo leva para personalizar um modelo para um novo caso?",
          type: "numeric",
          required: true,
          unit: "minutos",
          min: 0,
          max: 480,
          helpText: "Considere o tempo médio de personalização"
        },
        {
          id: "q4_5",
          text: "Como a pesquisa jurídica e a expertise são compartilhadas no escritório?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Sistema formal de gestão do conhecimento",
            "Base de dados compartilhada de pesquisas",
            "Memorandos ou boletins internos",
            "Conversas informais",
            "Distribuição por e-mail",
            "Não é compartilhado sistematicamente"
          ]
        }
      ]
    },
    
    {
      id: 5,
      title: "Comunicação e Colaboração com Clientes",
      description: "Identificar lacunas de comunicação, atrasos de resposta e riscos de satisfação do cliente.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q5_1",
          text: "Quais canais os clientes usam para se comunicar com você?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "E-mail",
            "Telefone",
            "WhatsApp/Telegram",
            "Portal do cliente",
            "Reuniões presenciais",
            "Videoconferência"
          ]
        },
        {
          id: "q5_2",
          text: "Qual é o tempo médio real de resposta para e-mails de clientes?",
          type: "multiple-choice",
          required: true,
          options: [
            "Até 1 hora",
            "Até 4 horas",
            "Até 24 horas",
            "2-3 dias",
            "Mais de 3 dias",
            "Não acompanhamos este indicador"
          ]
        },
        {
          id: "q5_3",
          text: "Como você compartilha documentos com os clientes?",
          type: "multiple-choice",
          required: true,
          options: [
            "Anexos de e-mail",
            "Portal seguro do cliente",
            "Armazenamento em nuvem (Dropbox, Google Drive)",
            "Entrega física",
            "Outros métodos"
          ]
        },
        {
          id: "q5_4",
          text: "Com que frequência você atualiza proativamente os clientes sobre o status dos casos?",
          type: "multiple-choice",
          required: true,
          options: [
            "Semanalmente",
            "Quinzenalmente",
            "Mensalmente",
            "Apenas quando há novidades significativas",
            "Apenas quando o cliente solicita"
          ]
        },
        {
          id: "q5_5",
          text: "Como você coleta feedback dos clientes?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Pesquisas formais de satisfação",
            "Conversas informais",
            "Reuniões de avaliação pós-caso",
            "E-mail de acompanhamento",
            "Não coletamos feedback sistematicamente"
          ]
        }
      ]
    },
    
    {
      id: 6,
      title: "Operações Financeiras e Cobrança",
      description: "Descobrir problemas de fluxo de caixa, atrasos de cobrança e fricção de pagamento.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q6_1",
          text: "Como você entrega as faturas aos clientes?",
          type: "multiple-choice",
          required: true,
          options: [
            "E-mail",
            "Correio físico",
            "Portal do cliente",
            "Pessoalmente",
            "Combinação de métodos"
          ]
        },
        {
          id: "q6_2",
          text: "Quais métodos de pagamento você aceita?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Cheque",
            "Transferência bancária/TED",
            "PIX",
            "Cartão de crédito",
            "Boleto bancário",
            "Débito automático"
          ]
        },
        {
          id: "q6_3",
          text: "Que percentual das faturas está em aberto há mais de 60 dias?",
          type: "numeric",
          required: true,
          unit: "%",
          min: 0,
          max: 100
        },
        {
          id: "q6_4",
          text: "Qual é o seu processo para acompanhamento de faturas vencidas?",
          type: "multiple-choice",
          required: true,
          options: [
            "Acompanhamento automático por sistema",
            "Acompanhamento manual sistemático",
            "Acompanhamento ocasional",
            "Apenas quando muito atrasado",
            "Sem processo formal"
          ]
        },
        {
          id: "q6_5",
          text: "Com que frequência você concilia contas de depósito/caução?",
          type: "multiple-choice",
          required: true,
          options: [
            "Diariamente",
            "Semanalmente",
            "Mensalmente",
            "Trimestralmente",
            "Anualmente",
            "Não aplicável (não mantemos contas de depósito)"
          ]
        }
      ]
    },
    
    {
      id: 7,
      title: "Colaboração Interna e Operações",
      description: "Identificar fricção interna, falhas de comunicação e drenos de produtividade.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q7_1",
          text: "Quais ferramentas sua equipe usa para comunicação interna?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "E-mail",
            "WhatsApp/Telegram",
            "Slack/Microsoft Teams",
            "Sistema de gestão de processos",
            "Reuniões presenciais",
            "Telefone"
          ]
        },
        {
          id: "q7_2",
          text: "Quanto tempo os advogados gastam em reuniões internas por semana?",
          type: "numeric",
          required: true,
          unit: "horas",
          min: 0,
          max: 40
        },
        {
          id: "q7_3",
          text: "Quais tarefas administrativas os advogados realizam que poderiam ser delegadas?",
          type: "text",
          required: false,
          maxLength: 500,
          helpText: "Descreva brevemente (opcional)"
        },
        {
          id: "q7_4",
          text: "Quão efetivamente os paralegais e equipe de apoio são utilizados?",
          type: "likert",
          required: true,
          scale: 5,
          labels: {
            1: "Muito ineficaz",
            2: "Ineficaz",
            3: "Neutro",
            4: "Eficaz",
            5: "Muito eficaz"
          }
        },
        {
          id: "q7_5",
          text: "Como diferentes áreas de prática compartilham recursos e conhecimento?",
          type: "multiple-choice",
          required: true,
          options: [
            "Compartilhamento formal e sistemático",
            "Compartilhamento informal frequente",
            "Compartilhamento ocasional",
            "Raramente compartilham",
            "Cada área opera de forma isolada"
          ]
        }
      ]
    },
    
    {
      id: 8,
      title: "Tecnologia e Sistemas",
      description: "Revelar fragmentação de sistemas, lacunas de integração e dívida tecnológica.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q8_1",
          text: "Quantos sistemas de software diferentes você usa diariamente?",
          type: "numeric",
          required: true,
          min: 0,
          max: 20,
          helpText: "Conte todos os sistemas que você ou sua equipe usam regularmente"
        },
        {
          id: "q8_2",
          text: "Quantas vezes as mesmas informações do cliente são inseridas em sistemas diferentes?",
          type: "numeric",
          required: true,
          min: 0,
          max: 10
        },
        {
          id: "q8_3",
          text: "Quais tarefas exigem transferência manual de dados entre sistemas?",
          type: "text",
          required: false,
          maxLength: 500,
          helpText: "Descreva brevemente (opcional)"
        },
        {
          id: "q8_4",
          text: "Quão confiantes todos os membros da equipe estão no uso dos sistemas principais?",
          type: "likert",
          required: true,
          scale: 5,
          labels: {
            1: "Muito inseguros",
            2: "Inseguros",
            3: "Neutro",
            4: "Confiantes",
            5: "Muito confiantes"
          }
        },
        {
          id: "q8_5",
          text: "Quando você tem um problema tecnológico, em quanto tempo ele é resolvido?",
          type: "multiple-choice",
          required: true,
          options: [
            "Imediatamente (< 1 hora)",
            "No mesmo dia",
            "1-2 dias",
            "3-5 dias",
            "Mais de 5 dias",
            "Muitos problemas nunca são resolvidos"
          ]
        }
      ]
    },
    
    {
      id: 9,
      title: "Conformidade e Gestão de Riscos",
      description: "Identificar lacunas de conformidade, exposição a riscos e prontidão para auditorias.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q9_1",
          text: "Como você garante que prazos críticos nunca sejam perdidos?",
          type: "multiple-choice",
          required: true,
          options: [
            "Sistema automatizado de controle de prazos",
            "Calendário compartilhado com alertas",
            "Controle manual sistemático",
            "Responsabilidade individual de cada advogado",
            "Sem sistema formal"
          ]
        },
        {
          id: "q9_2",
          text: "Sua política de retenção de documentos é aplicada de forma:",
          type: "multiple-choice",
          required: true,
          options: [
            "Totalmente automatizada",
            "Parcialmente automatizada",
            "Manualmente de forma sistemática",
            "Manualmente de forma ocasional",
            "Não temos política formal",
            "Não aplicável"
          ]
        },
        {
          id: "q9_3",
          text: "Com que frequência as verificações de conflito são atualizadas para casos existentes?",
          type: "multiple-choice",
          required: true,
          options: [
            "Continuamente (a cada novo cliente)",
            "Mensalmente",
            "Trimestralmente",
            "Anualmente",
            "Apenas no início do caso",
            "Não atualizamos"
          ]
        },
        {
          id: "q9_4",
          text: "Como você protege informações confidenciais dos clientes?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Criptografia de e-mail",
            "Armazenamento seguro de arquivos",
            "Controle de acesso por função",
            "Treinamento regular da equipe",
            "Políticas formais de segurança",
            "Sem medidas formais"
          ]
        },
        {
          id: "q9_5",
          text: "Como você acompanha e garante conformidade com requisitos regulatórios?",
          type: "multiple-choice",
          required: true,
          options: [
            "Sistema automatizado de rastreamento",
            "Checklist manual sistemático",
            "Revisões periódicas",
            "Responsabilidade individual",
            "Não acompanhamos formalmente"
          ]
        }
      ]
    },
    
    {
      id: 10,
      title: "Planejamento Estratégico e Crescimento",
      description: "Compreender restrições de crescimento, planejamento de capacidade e visibilidade estratégica.",
      estimatedTime: "2-3 minutos",
      questions: [
        {
          id: "q10_1",
          text: "Você consegue identificar rapidamente suas áreas de prática mais e menos lucrativas?",
          type: "multiple-choice",
          required: true,
          options: [
            "Sim, em tempo real",
            "Sim, com análise mensal",
            "Sim, com análise trimestral",
            "Sim, mas leva tempo significativo",
            "Não, não temos essa visibilidade"
          ]
        },
        {
          id: "q10_2",
          text: "Como você determina se tem capacidade para aceitar um novo caso?",
          type: "multiple-choice",
          required: true,
          options: [
            "Dashboard de capacidade em tempo real",
            "Análise manual sistemática",
            "Estimativa informal",
            "Decisão baseada em intuição",
            "Aceitamos todos os casos"
          ]
        },
        {
          id: "q10_3",
          text: "Você conhece o custo de aquisição de um novo cliente e o valor vitalício?",
          type: "multiple-choice",
          required: true,
          options: [
            "Sim, acompanhamos ambos",
            "Conhecemos o custo de aquisição",
            "Conhecemos o valor vitalício",
            "Temos estimativas aproximadas",
            "Não acompanhamos esses indicadores"
          ]
        },
        {
          id: "q10_4",
          text: "Quais métricas você usa para avaliar a produtividade dos advogados?",
          type: "multiple-choice-multiple",
          required: true,
          options: [
            "Horas faturáveis",
            "Receita gerada",
            "Taxa de realização (realization rate)",
            "Satisfação do cliente",
            "Casos concluídos",
            "Não avaliamos formalmente"
          ]
        },
        {
          id: "q10_5",
          text: "Quais dados você gostaria de ter para tomar melhores decisões estratégicas?",
          type: "text",
          required: false,
          maxLength: 500,
          helpText: "Descreva brevemente (opcional)"
        }
      ]
    }
  ]
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questionnaire;
}
