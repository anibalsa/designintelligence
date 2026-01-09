/*********************************
 * ENGINE — AGENTE 01
 * Núcleo de decisão heurística
 *********************************/

let vocabulario = {};

/* ===============================
   ESTADO BASE
================================*/
function criarEstadoBase() {
  return {
    clareza: 0,
    risco: 0,
    foco: 0,
    conversao: 0,
    posicionamento: 0,
    estrutura: 0
  };
}

/* ===============================
   APLICAÇÃO DE PESOS
================================*/
function aplicarPesos(estado, dados, leituraTexto) {

  function aplicar(pesos) {
    if (!pesos) return;
    Object.keys(pesos).forEach(chave => {
      if (estado[chave] !== undefined) {
        estado[chave] += pesos[chave];
      }
    });
  }

  aplicar(PESOS.tipoProjeto[dados.tipoProjeto]);
  aplicar(PESOS.momentoNegocio[dados.momentoNegocio]);
  aplicar(PESOS.sensacao[dados.sensacao]);
  aplicar(PESOS.objetivo[dados.objetivo]);
  aplicar(PESOS.texto[leituraTexto]);

  return estado;
}

/* ===============================
   INICIALIZAÇÃO
================================*/
function inicializarAgente() {
  const form = document.getElementById("agentForm");

  if (!form) {
    console.error("Formulário #agentForm não encontrado.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
      tipoProjeto: document.getElementById("tipoProjeto").value,
      momentoNegocio: document.getElementById("momentoNegocio").value,
      dificuldade: document.getElementById("dificuldade").value.trim(),
      sensacao: document.getElementById("sensacao").value,
      objetivo: document.getElementById("objetivo").value
    };

    // Validação mínima
    if (
      !dados.tipoProjeto ||
      !dados.momentoNegocio ||
      !dados.dificuldade ||
      !dados.sensacao ||
      !dados.objetivo
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Pipeline lógico
    const leituraTexto = analisarTexto(dados.dificuldade);
    let estado = criarEstadoBase();
    estado = aplicarPesos(estado, dados, leituraTexto);

    const resultado = gerarLeitura(dados, estado);

    // Render
    document.getElementById("leitura").innerText = resultado.leitura;
    document.getElementById("risco").innerText = resultado.risco;
    document.getElementById("proximo").innerText = resultado.proximo;

    document.getElementById("output").style.display = "block";
  });
}

/* ===============================
   LOAD DE VOCABULÁRIO
================================*/
fetch("data/vocabularios.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Falha ao carregar vocabularios.json");
    }
    return response.text();
  })
  .then(text => {
    if (!text) {
      throw new Error("vocabularios.json está vazio");
    }
    vocabulario = JSON.parse(text);
    inicializarAgente();
  })
  .catch(error => {
    console.error("Erro ao carregar vocabulários:", error);
  });
