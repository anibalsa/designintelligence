/***********************************************************
 * MATRIZES — AGENTE 01
 * O Cérebro Estratégico: Diagnósticos e Provocações
 ***********************************************************/

const MATRIZES = {

  "Identidade de marca": {
    "Estou começando agora": {
      leitura: "No estágio embrionário, a marca não é um exercício estético, é uma decisão de fundação. O perigo aqui é gastar energia com 'perfumaria' antes de ter uma proposta de valor validada.",
      risco: "Criar uma casca visual para um negócio sem corpo estratégico. O custo de mudar depois será o dobro.",
      proximo: "Menos decoração, mais intenção. Precisamos definir o seu 'território' antes da paleta de cores."
    },
    "Já tenho clientes, quero crescer": {
      leitura: "O crescimento exige sistemas, não apenas logos. Sua marca atual provavelmente é um 'puxadinho' que funcionou até aqui, mas que agora está segurando a sua percepção de valor.",
      risco: "Escalar a inconsistência. Se cada ponto de contato comunica algo diferente, você está queimando dinheiro em marketing.",
      proximo: "Codificar sua identidade em um sistema que suporte a escala sem perder a essência autoral."
    },
    "O negócio já está estável": {
      leitura: "A estabilidade é o prefácio da obsolescência. Marcas estáveis tendem a se tornar invisíveis se não revisarem sua relevância simbólica perante novos concorrentes.",
      risco: "Ser percebido como 'datado' ou 'commodity de luxo' que não justifica mais o prêmio que cobra.",
      proximo: "Uma auditoria de percepção para alinhar o que você é hoje com o que o mercado enxerga."
    },
    "Estou passando por uma mudança ou dificuldade": {
      leitura: "Mudanças estruturais pedem um novo manifesto visual. Se o seu modelo de negócio mudou e a marca continua a mesma, você está enviando sinais contraditórios ao mercado.",
      risco: "Tentar atrair o 'cliente do amanhã' com a roupagem do 'ontem'. Ruído cognitivo total.",
      proximo: "Pivotagem estratégica da identidade para sinalizar o novo posicionamento imediatamente."
    }
  },

  "Site / Landing page": {
    "Estou começando agora": {
      leitura: "Um site no início não é um portfólio; é uma máquina de validação. Ele deve responder por que você é a escolha certa em menos de 3 segundos.",
      risco: "Complexidade desnecessária. Você não precisa de um portal, precisa de uma tese de vendas clara.",
      proximo: "Focar em arquitetura de informação e copy agressivo de autoridade."
    },
    "Já tenho clientes, quero crescer": {
      leitura: "Para crescer, seu site precisa deixar de ser um cartão de visitas passivo e se tornar um agente de vendas 24/7 que qualifica os leads por você.",
      risco: "Perder conversão por falta de clareza no fluxo de decisão do usuário.",
      proximo: "Otimizar a jornada do usuário com foco total em remoção de fricção e aumento de desejo."
    },
    "O negócio já está estável": {
      leitura: "Para negócios consolidados, o site é a prova de autoridade. Ele deve exalar profissionalismo e sofisticação em cada detalhe de interação.",
      risco: "Incongruência entre o preço que você cobra 'offline' e a experiência que entrega 'online'.",
      proximo: "Refinamento de UX/UI para elevar a percepção de marca ao nível de elite do mercado."
    },
    "Estou passando por uma mudança ou dificuldade": {
      leitura: "Se o site não está convertendo ou não reflete o novo momento, ele é um peso morto digital.",
      risco: "Alta taxa de rejeição por desalinhamento entre a promessa e a entrega visual.",
      proximo: "Diagnóstico de conversão e reestruturação narrativa completa."
    }
  },

  "Posicionamento": {
    "Estou começando agora": {
      leitura: "Posicionamento é o que as pessoas dizem de você quando você não está na sala. Se você não definir isso agora, o mercado o fará de forma genérica.",
      risco: "Ser comparado por preço desde o dia 01.",
      proximo: "Encontrar o seu 'ângulo de ataque' único que anula a concorrência direta."
    },
    "Já tenho clientes, quero crescer": {
      leitura: "Você chegou aqui pelo seu trabalho duro. Para ir além, você precisa de autoridade percebida. O posicionamento é o multiplicador de valor do seu esforço.",
      risco: "Trabalhar muito para ser visto como apenas mais um especialista no setor.",
      proximo: "Transição de 'especialista generalista' para 'autoridade insubstituível'."
    }
  }
};

/**
 * MOTOR DE INTERPRETAÇÃO (Final do Arquivo)
 */
export function gerarLeitura(dados, estado) {
  const base = MATRIZES[dados.tipoProjeto]?.[dados.momentoNegocio];

  let leitura = base?.leitura || "O cenário indica necessidade de organização estratégica.";
  let risco = base?.risco || "Tomar decisões sem clareza pode gerar desperdício.";
  let proximo = base?.proximo || "Aprofundar o diagnóstico.";

  // Adições Dinâmicas baseadas nos Scores do pesos.js
  if (estado.clareza < 0) {
    leitura += " Notei uma névoa conceitual na sua descrição; sem clareza de premissas, o design será apenas um 'curativo'.";
  }

  if (estado.risco > 5) {
    risco += " O seu momento atual é de alta fragilidade operacional. Qualquer movimento estético agora é arriscado.";
  }

  if (estado.posicionamento > 4) {
    proximo = "O foco aqui não é apenas mudar o visual, mas sim reescrever a sua posição de poder no mercado. " + proximo;
  }

  return { leitura, risco, proximo };
}