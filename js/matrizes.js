const MATRIZES = {

  /* ===============================
     IDENTIDADE DE MARCA
  =============================== */

  "Identidade de marca": {

    "Estou começando agora": {
      leitura: "No início do negócio, a identidade precisa nascer como estrutura estratégica, não como estética isolada.",
      risco: "Criar marca antes de clareza pode gerar desalinhamento precoce.",
      proximo: "Definir posicionamento, público e mensagem antes da forma."
    },

    "Já tenho clientes, quero crescer": {
      leitura: "A identidade atual precisa sustentar crescimento e reconhecimento.",
      risco: "Escalar inconsistência visual e discursiva.",
      proximo: "Organizar sistema de marca e narrativa."
    },

    "O negócio já está estável": {
      leitura: "A marca precisa refletir maturidade e coerência ao longo do tempo.",
      risco: "Manter uma identidade que não acompanha a evolução do negócio.",
      proximo: "Avaliar se a marca ainda representa o momento atual."
    },

    "Estou passando por uma mudança ou dificuldade": {
      leitura: "A identidade pode estar desalinhada com a nova fase do negócio.",
      risco: "Comunicar algo que o negócio já não é.",
      proximo: "Revisitar fundamentos antes de redesenhar."
    }
  },

  /* ===============================
     SITE / LANDING PAGE
  =============================== */

  "Site / Landing page": {

    "Estou começando agora": {
      leitura: "O site deve funcionar como estrutura de clareza, não apenas presença digital.",
      risco: "Criar páginas sem foco estratégico.",
      proximo: "Definir objetivo principal do site antes do layout."
    },

    "Já tenho clientes, quero crescer": {
      leitura: "O site precisa apoiar conversão e posicionamento.",
      risco: "Ter tráfego sem direção clara.",
      proximo: "Alinhar mensagem, fluxo e proposta de valor."
    },

    "O negócio já está estável": {
      leitura: "O site deve reforçar credibilidade e consistência.",
      risco: "Ter um site funcional, porém inexpressivo.",
      proximo: "Refinar experiência e narrativa."
    },

    "Estou passando por uma mudança ou dificuldade": {
      leitura: "O site precisa refletir o novo momento do negócio.",
      risco: "Manter uma comunicação desatualizada.",
      proximo: "Reestruturar objetivos antes de redesenhar páginas."
    }
  },

  /* ===============================
     POSICIONAMENTO
  =============================== */

  "Posicionamento": {

    "Estou começando agora": {
      leitura: "Antes de comunicar, é essencial definir claramente o lugar que o negócio quer ocupar.",
      risco: "Ser genérico e pouco memorável.",
      proximo: "Mapear público, proposta e diferenciação."
    },

    "Já tenho clientes, quero crescer": {
      leitura: "O posicionamento precisa evoluir para sustentar autoridade.",
      risco: "Crescer com discurso frágil.",
      proximo: "Revisar mensagem, foco e tom."
    },

    "O negócio já está estável": {
      leitura: "Um posicionamento sólido garante coerência e longevidade.",
      risco: "Estagnar enquanto o mercado evolui.",
      proximo: "Validar se o posicionamento ainda é competitivo."
    },

    "Estou passando por uma mudança ou dificuldade": {
      leitura: "Mudanças exigem reposicionamento consciente.",
      risco: "Confundir o público durante a transição.",
      proximo: "Redefinir narrativa antes de comunicar externamente."
    }
  },

  /* ===============================
     NÃO SEI / PRECISO DE ORIENTAÇÃO
  =============================== */

  "Não sei / preciso de orientação": {

    "Estou começando agora": {
      leitura: "A falta de clareza é natural no início, mas precisa ser organizada.",
      risco: "Tomar decisões desconectadas.",
      proximo: "Estruturar um diagnóstico guiado."
    },

    "Já tenho clientes, quero crescer": {
      leitura: "O negócio funciona, mas a direção estratégica não está clara.",
      risco: "Crescer sem coerência.",
      proximo: "Organizar prioridades e foco."
    },

    "O negócio já está estável": {
      leitura: "Mesmo estável, o negócio pode estar operando no automático.",
      risco: "Perder relevância ao longo do tempo.",
      proximo: "Reavaliar objetivos e diferenciação."
    },

    "Estou passando por uma mudança ou dificuldade": {
      leitura: "Momentos de dificuldade pedem pausa estratégica.",
      risco: "Reagir sem diagnóstico.",
      proximo: "Compreender causas antes de agir."
    }
  }

};


function gerarLeitura(dados, estado) {

  const base =
    MATRIZES[dados.tipoProjeto]?.[dados.momentoNegocio];

  let leitura = base?.leitura || "O cenário indica necessidade de organização estratégica.";
  let risco = base?.risco || "Tomar decisões sem clareza pode gerar desperdício.";
  let proximo = base?.proximo || "Aprofundar o diagnóstico.";

  // Interpretação do estado
  if (estado.risco >= 4) {
    risco += " O nível de risco percebido é alto.";
  }

  if (estado.clareza <= -3) {
    leitura += " Há um déficit significativo de clareza.";
  }

  if (estado.posicionamento >= 3) {
    proximo += " Com atenção especial ao posicionamento.";
  }

  if (estado.conversao >= 3) {
    proximo += " Orientado a resultados e conversão.";
  }

  if (estado.estrutura >= 3) {
    proximo += " Priorizando organização e consistência.";
  }

  if (estado.clareza <= -4) {
    leitura += " A percepção geral indica desorganização conceitual.";
  }

  if (estado.foco >= 3) {
    leitura += " Existe potencial de direcionamento estratégico.";
  }

  if (estado.risco >= 5) {
    risco += " A tomada de decisão sem ajuste prévio pode gerar perdas relevantes.";
  }

  if (estado.posicionamento >= 4) {
    proximo += " Trabalhar diferenciação será decisivo.";
  }


  return { leitura, risco, proximo };
}

