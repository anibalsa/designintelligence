/***********************************************************
 * HEURÍSTICAS — AGENTE 01
 * Análise de Texto e Detecção de Perfil Cognitivo
 ***********************************************************/

/**
 * Analisa o texto do utilizador para identificar maturidade.
 * @param {string} texto - O conteúdo do campo 'dificuldade'
 * @param {object} vocabulario - O objeto vindo do JSON carregado no engine
 * @returns {string} - Uma chave de perfil para aplicação de pesos
 */
export function analisarTexto(texto, vocabulario) {
    // Verificação de segurança: se o vocabulário não existir, evita quebrar o código
    if (!vocabulario || !vocabulario.tecnico) {
        console.warn("Vocabulário não carregado nas heurísticas.");
        return "baixa_clareza";
    }

    if (!texto || texto.length < 10) return "baixa_clareza";

    const textoMinusculo = texto.toLowerCase();
    
    // Contadores de categorias
    let scores = {
        estrategico: 0,
        emocional: 0,
        vago: 0,
        estetico: 0
    };

    // 1. Verificação via Vocabulário (JSON recebido via parâmetro)
    vocabulario.tecnico.forEach(p => {
        if (textoMinusculo.includes(p.toLowerCase())) scores.estrategico += 1.5;
    });

    vocabulario.emocional.forEach(p => {
        if (textoMinusculo.includes(p.toLowerCase())) scores.emocional++;
    });

    vocabulario.vago.forEach(p => {
        if (textoMinusculo.includes(p.toLowerCase())) scores.vago++;
    });

    // 2. Heurísticas de Densidade (Diferencial de Especialista)
    const palavras = textoMinusculo.split(/\s+/).filter(p => p.length > 3);
    const contagemPalavras = palavras.length;

    // Termos de "Negócio de Alto Nível" (Hardcoded para garantir autoridade)
    const termosAutoridade = [
        "processo", "método", "lucro", "margem", "audiência", 
        "conversão", "posicionamento", "autoridade", "escala", 
        "consistência", "valor", "percepção", "investimento"
    ];
    
    termosAutoridade.forEach(termo => {
        if (textoMinusculo.includes(termo)) scores.estrategico += 2;
    });

    // 3. Classificação do Perfil
    
    // Perfil: Maturidade Alta (Sinal claro de que sabe o que quer)
    if (scores.estrategico > 5 || (scores.estrategico > scores.emocional && contagemPalavras > 20)) {
        return "maturidade_alta";
    }

    // Perfil: Ansiedade (Muitos termos emocionais, pouca clareza de processo)
    if (scores.emocional > scores.estrategico && scores.emocional > 2) {
        return "ansiedade";
    }

    // Perfil: Briefing Raso
    if (contagemPalavras < 8 || scores.vago > scores.estrategico) {
        return "baixa_clareza";
    }

    return "baixa_clareza";
}

/**
 * Heurística Auxiliar: Deteta se o texto é puramente estético
 */
export function detectarFocoEstetico(texto) {
    const termosEsteticos = ["bonito", "lindo", "cor", "logotipo", "desenho", "estética"];
    let count = 0;
    termosEsteticos.forEach(t => {
        if (texto.toLowerCase().includes(t)) count++;
    });
    return count > 2;
}