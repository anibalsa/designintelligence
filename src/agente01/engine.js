import { analisarTexto } from './heuristicas.js';

let vocabulario = {};
let captchaResposta;

/**
 * CAPTCHA: Sistema de segurança original
 */
function gerarCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaResposta = num1 + num2;
    const label = document.getElementById('label-captcha');
    if (label) {
        label.innerText = `Segurança: Quanto é ${num1} + ${num2}?`;
    }
}

/**
 * BUSCA DINÂMICA: Conecta com admin.anibalsa.com
 */
async function buscarDiagnosticoNoWordPress(dados, perfilTexto) {
    const baseUrl = 'https://admin.anibalsa.com/wp-json/design-intelligence/v1/get-matriz';
    const params = new URLSearchParams({
        tipo: dados.tipoProjeto,
        momento: dados.momentoNegocio,
        perfil: perfilTexto
    });

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) throw new Error("Erro na conexão com o WP");
        const data = await response.json();
        if (data.status === 'success') {
            return {
                leitura: data.leitura,
                risco: data.risco,
                proximo: data.proximo
            };
        }
    } catch (error) {
        console.error("Falha ao buscar matriz dinâmica:", error);
    }

    // Fallback caso a API falhe
    return {
        leitura: "O teu cenário indica uma necessidade latente de organização estratégica. Notei que os sinais enviados precisam de uma curadoria mais profunda.",
        risco: "O maior risco atual é a diluição da tua autoridade por falta de um foco narrativo claro.",
        proximo: "Agendar uma reunião de diagnóstico profundo para alinhar esses pontos."
    };
}

/**
 * LOGS: Salva o briefing no WordPress (CPT projeto_ia)
 */
async function enviarParaWordPress(dados, resultado, perfilTexto) {
    const apiUrl = import.meta.env.VITE_WP_API_URL;
    const token = import.meta.env.VITE_WP_JWT_TOKEN;

    if (!apiUrl || !token) return;

    const payload = {
        title: `Briefing: ${dados.cliente} [${dados.tipoProjeto}]`,
        status: 'publish',
        content: `Dificuldade relatada: ${dados.dificuldade}`,
        acf: {
            "perfil_psicologico": perfilTexto,
            "diagnostico_gerado": resultado.leitura,
            "risco_identificado": resultado.risco,
            "proximo_passo": resultado.proximo
        }
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Erro ao enviar log:", error);
    }
}

/**
 * MOTOR PRINCIPAL (IDs sincronizados com seu index.html)
 */
export function initEngine() {
    // Sincronizado com <form id="agente-form">
    const form = document.getElementById("agente-form");
    // Sincronizado com <section id="output-section">
    const outputSection = document.getElementById("output-section");
    // Sincronizado com <input id="captcha-input">
    const inputCaptcha = document.getElementById("captcha-input");

    if (!form) {
        console.error("Erro: Formulário 'agente-form' não encontrado.");
        return;
    }

    gerarCaptcha();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validação do Captcha
        if (!inputCaptcha || parseInt(inputCaptcha.value) !== captchaResposta) {
            alert("Por favor, resolva corretamente o cálculo de segurança.");
            gerarCaptcha();
            if (inputCaptcha) inputCaptcha.value = "";
            return;
        }

        // COLETA DE DADOS - IDs EXATOS DO SEU HTML
        const dados = {
            cliente: document.getElementById("cliente_nome").value,
            tipoProjeto: document.getElementById("tipoProjeto").value,
            momentoNegocio: document.getElementById("momentoNegocio").value,
            dificuldade: document.getElementById("dificuldade").value.trim(),
            sensacao: document.getElementById("sensacao").value,
            objetivo: document.getElementById("objetivo").value
        };

        // 1. Processamento
        const perfilTexto = analisarTexto(dados.dificuldade, vocabulario);

        // 2. Inteligência WordPress
        const resultado = await buscarDiagnosticoNoWordPress(dados, perfilTexto);

        // 3. Log de segurança
        await enviarParaWordPress(dados, resultado, perfilTexto); 

        // 4. Renderização
        renderizarResultado(resultado, outputSection);
        
        // Reset
        gerarCaptcha();
        inputCaptcha.value = "";
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
        const response = await fetch("/data/vocabularios.json");
        vocabulario = await response.json();
    } catch (error) {
        console.error("Erro ao carregar vocabulário:", error);
    }
}