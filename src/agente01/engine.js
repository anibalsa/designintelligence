import { PESOS } from './pesos.js';
import { analisarTexto } from './heuristicas.js';
import { gerarLeitura } from './matrizes.js';

let vocabulario = {};

function criarEstadoBase() {
    return { clareza: 0, risco: 0, foco: 0, conversao: 0, posicionamento: 0, estrutura: 0 };
}

function aplicarPesos(estado, dados, perfilTexto) {
    const aplicar = (categoria) => {
        if (!categoria) return;
        Object.keys(categoria).forEach(chave => {
            if (estado[chave] !== undefined) estado[chave] += categoria[chave];
        });
    };

    aplicar(PESOS.tipoProjeto[dados.tipoProjeto]);
    aplicar(PESOS.momentoNegocio[dados.momentoNegocio]);
    aplicar(PESOS.sensacao[dados.sensacao]);
    aplicar(PESOS.objetivo[dados.objetivo]);
    aplicar(PESOS.texto[perfilTexto]);

    return estado;
}

// Note o "export" aqui para o main.js poder usar
export function inicializarAgente01() {
    const form = document.getElementById("agente-form");
    const outputSection = document.getElementById("output-section");

    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const dados = {
            tipoProjeto: document.getElementById("tipoProjeto").value,
            momentoNegocio: document.getElementById("momentoNegocio").value,
            dificuldade: document.getElementById("dificuldade").value.trim(),
            sensacao: document.getElementById("sensacao").value,
            objetivo: document.getElementById("objetivo").value
        };

        // Passamos o vocabulario carregado para a heurística
        const perfilTexto = analisarTexto(dados.dificuldade, vocabulario);
        let estado = aplicarPesos(criarEstadoBase(), dados, perfilTexto);
        const resultado = gerarLeitura(dados, estado);

        renderizarResultado(resultado, outputSection);
    });

    carregarDados();
}

function renderizarResultado(resultado, container) {
    document.getElementById("leitura").innerText = resultado.leitura;
    document.getElementById("risco").innerText = resultado.risco;
    document.getElementById("proximo").innerText = resultado.proximo;
    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function carregarDados() {
    try {
        // No Vite, arquivos em public/ são acessados pela raiz /
        const response = await fetch("/data/vocabularios.json");
        vocabulario = await response.json();
    } catch (error) {
        console.error("Erro ao carregar vocabulário:", error);
        vocabulario = { tecnico: [], emocional: [], vago: [] };
    }
}