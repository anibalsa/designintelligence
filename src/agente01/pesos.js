/***********************************************************
 * PESOS — AGENTE 01
 * Configuração de impacto para o motor de decisão
 ***********************************************************/

export const PESOS = {

  // Impacto baseado no tipo de desafio escolhido
  tipoProjeto: {
    "Identidade de marca": { posicionamento: +3, estrutura: +1, foco: +1 },
    "Site / Landing page": { conversao: +3, estrutura: +2, clareza: +1 },
    "Posicionamento": { posicionamento: +4, clareza: +1, foco: +2 },
    "Não sei / preciso de orientação": { clareza: -3, risco: +3, foco: -1 }
  },

  // Impacto baseado na fase atual da empresa
  momentoNegocio: {
    "Estou começando agora": { risco: +3, estrutura: -2, clareza: -1 },
    "Já tenho clientes, quero crescer": { foco: +2, conversao: +2, estrutura: +1 },
    "O negócio já está estável": { clareza: +2, posicionamento: +1, risco: -1 },
    "Estou passando por uma mudança ou dificuldade": { risco: +4, clareza: -3, posicionamento: -1 }
  },

  // Impacto do estado emocional declarado
  sensacao: {
    "Confuso": { clareza: -2, risco: +2, foco: -1 },
    "Fraco / sem impacto": { posicionamento: -3, clareza: -1, risco: +2 },
    "Incoerente": { estrutura: -3, clareza: -2, posicionamento: -2 },
    "Travado": { clareza: -4, risco: +4, foco: -3 },
    "Não sei explicar": { clareza: -3, risco: +2 }
  },

  // Impacto do objetivo principal (onde o usuário quer chegar)
  objetivo: {
    "Clareza": { foco: +4, clareza: +3 },
    "Credibilidade": { posicionamento: +4, estrutura: +2 },
    "Vender mais": { conversao: +5, risco: +1 },
    "Me diferenciar": { posicionamento: +5, foco: +2 },
    "Organizar o que já existe": { estrutura: +5, clareza: +2 }
  },

  // Impacto da análise de texto (Vem do heuristicas.js)
  // É aqui que a "inteligência" de 30 anos de repertório se manifesta
  texto: {
    "maturidade_alta": { 
        clareza: +4, 
        posicionamento: +2, 
        risco: -2, 
        foco: +2 
    },
    "ansiedade": { 
        clareza: -2, 
        risco: +3, 
        foco: -2, 
        estrutura: -1 
    },
    "baixa_clareza": { 
        clareza: -5, 
        risco: +4, 
        foco: -3, 
        estrutura: -2 
    }
  }
};