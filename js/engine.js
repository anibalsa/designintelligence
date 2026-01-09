/***********************************************************
 * ENGINE — AGENTE 01
 * O Núcleo de Processamento do Design Intelligence
 ***********************************************************/

let vocabulario = {};

/**
 * ESTADO BASE: O ponto zero das métricas de negócio
 */
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

/**
 * APLICAÇÃO DE PESOS: Onde as escolhas viram números
 */
function aplicarPesos(estado, dados, perfilTexto) {
    const aplicar = (categoria) => {
        if (!categoria) return;
        Object.keys(categoria).forEach(chave => {
            if (estado[chave] !== undefined) {
                estado[chave] += categoria[chave];
            }
        });
    };

    // Aplica pesos baseados nas seleções do formulário
    aplicar(PESOS.tipoProjeto[dados.tipoProjeto]);
    aplicar(PESOS.momentoNegocio[dados.momentoNegocio]);
    aplicar(PESOS.sensacao[dados.sensacao]);
    aplicar(PESOS.objetivo[dados.objetivo]);
    
    // Aplica o peso crucial vindo da inteligência de texto
    aplicar(PESOS.texto[perfilTexto]);

    return estado;
}

/**
 * INICIALIZAÇÃO: Configuração do Event Listener
 */
function inicializarAgente() {
    const form = document.getElementById("agente-form");
    const outputSection = document.getElementById("output-section");

    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Captura de Dados
        const dados = {
            tipoProjeto: document.getElementById("tipoProjeto").value,
            momentoNegocio: document.getElementById("momentoNegocio").value,
            dificuldade: document.getElementById("dificuldade").value.trim(),
            sensacao: document.getElementById("sensacao").value,
            objetivo: document.getElementById("objetivo").value
        };

        // 1. Processamento Heurístico do Texto
        const perfilTexto = analisarTexto(dados.dificuldade);

        // 2. Cálculo do Estado Estratégico
        let estado = criarEstadoBase();
        estado = aplicarPesos(estado, dados, perfilTexto);

        // 3. Consulta às Matrizes de Especialista
        const resultado = gerarLeitura(dados, estado);

        // 4. Renderização com suavidade (scroll para o resultado)
        renderizarResultado(resultado, outputSection);
    });
}

/**
 * RENDER: Injeta o diagnóstico na página
 */
function renderizarResultado(resultado, container) {
    document.getElementById("leitura").innerText = resultado.leitura;
    document.getElementById("risco").innerText = resultado.risco;
    document.getElementById("proximo").innerText = resultado.proximo;

    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * CARGA DE DADOS EXTERNOS (Vocabulários)
 */
async function carregarDados() {
    try {
        const response = await fetch("data/vocabularios.json");
        if (!response.ok) throw new Error("Erro ao carregar base de dados.");
        vocabulario = await response.json();
        
        // Só inicializa o agente após carregar os dados necessários
        inicializarAgente();
    } catch (error) {
        console.error("Design Intelligence Error:", error);
        // Fallback para não travar o formulário se o JSON falhar
        vocabulario = { tecnico: [], emocional: [], vago: [] };
        inicializarAgente();
    }
}

// Início do Processo
carregarDados();