/***********************************************************
 * HEURÍSTICAS — AGENTE 01 (Evolução Científica)
 * Análise de Densidade Semântica e Concretude
 ***********************************************************/

export function analisarTexto(texto, vocabulario) {
    if (!vocabulario || !vocabulario.tecnico) {
        console.warn("Vocabulário não carregado.");
        return "baixa_clareza";
    }

    if (!texto || texto.length < 10) return "baixa_clareza";

    const textoMinusculo = texto.toLowerCase();
    const palavras = textoMinusculo.split(/\s+/).filter(p => p.length > 3);
    const contagemPalavras = palavras.length;
    
    let scores = {
        estrategico: 0,
        emocional: 0,
        conflito: 0,
        tecnico_especifico: 0
    };

    // 1. Scoring Ponderado (Densidade Semântica)
    vocabulario.tecnico.forEach(p => {
        if (textoMinusculo.includes(p.toLowerCase())) {
            scores.estrategico += 2.0; // Aumentamos o peso para autoridade
            scores.tecnico_especifico++;
        }
    });

    vocabulario.emocional.forEach(p => {
        if (textoMinusculo.includes(p.toLowerCase())) scores.emocional++;
    });

    // 2. Detecção de Multipotencialidade (O Diferencial Científico)
    const indicadoresConcretos = ["sou", "trabalho", "áreas", "campos", "atuação", "mas", "porém", "dúvida"];
    indicadoresConcretos.forEach(termo => {
        if (textoMinusculo.includes(termo)) scores.conflito += 1.0;
    });

    // --- CLASSIFICAÇÃO ---

    // PERFIL: CONFLITO DE POSICIONAMENTO (Caso Diamar)
    // Se o texto é denso e tem termos técnicos + indicadores de dúvida/campo de atuação
    if (contagemPalavras > 25 && (scores.tecnico_especifico >= 2 || scores.conflito > 3)) {
        return "conflito_multipotencial";
    }

    // PERFIL: MATURIDADE ALTA
    if (scores.estrategico > 6 || (scores.estrategico > scores.emocional && contagemPalavras > 20)) {
        return "maturidade_alta";
    }

    // PERFIL: ANSIEDADE ESTRATÉGICA
    if (scores.emocional > scores.estrategico && scores.emocional > 2) {
        return "ansiedade";
    }

    // PERFIL: BAIXA CLAREZA (Somente para briefings realmente rasos)
    if (contagemPalavras < 12 && scores.tecnico_especifico < 1) {
        return "baixa_clareza";
    }

    return "em_definicao";
}

export function detectarFocoEstetico(texto) {
    const termosEsteticos = ["bonito", "lindo", "cor", "logotipo", "desenho", "estética"];
    let count = 0;
    termosEsteticos.forEach(t => {
        if (texto.toLowerCase().includes(t)) count++;
    });
    return count > 2;
}