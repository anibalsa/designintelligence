const PESOS = {

  tipoProjeto: {
    "Identidade de marca": { posicionamento: +2, estrutura: +1 },
    "Site / Landing page": { conversao: +2, estrutura: +1 },
    "Posicionamento": { posicionamento: +3, foco: +1 },
    "Não sei / preciso de orientação": { clareza: -1, risco: +1 }
  },

  momentoNegocio: {
    "Estou começando agora": { risco: +2, estrutura: -1 },
    "Já tenho clientes, quero crescer": { foco: +2, conversao: +1 },
    "O negócio já está estável": { clareza: +2 },
    "Estou passando por uma mudança ou dificuldade": { risco: +3, clareza: -2 }
  },

  sensacao: {
    "Confuso": { clareza: -2, risco: +2 },
    "Fraco / sem impacto": { clareza: -1, risco: +1 },
    "Incoerente": { clareza: -2, risco: +2 },
    "Travado": { clareza: -3, risco: +3 },
    "Não sei explicar": { clareza: -2, risco: +1 }
  },

  objetivo: {
    "Clareza": { foco: +3 },
    "Credibilidade": { foco: +2 },
    "Vender mais": { conversao: +3 },
    "Me diferenciar": { posicionamento: +3 },
    "Organizar o que já existe": { estrutura: +3 }
  },

  texto: {
    baixa_clareza: { clareza: -2, risco: +2 },
    ansiedade: { risco: +3 },
    maturidade_alta: { clareza: +2, foco: +1 }
  }
};
