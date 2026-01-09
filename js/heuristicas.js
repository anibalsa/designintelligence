/***********************************************************
 * HEURÍSTICAS — AGENTE 01
 * Análise de Texto e Detecção de Perfil Cognitivo
 ***********************************************************/

/**
 * Analisa o texto do utilizador para identificar maturidade,
 * estado emocional e clareza estratégica.
 * @param {string} texto - O conteúdo do campo 'dificuldade'
 * @returns {string} - Uma chave de perfil para aplicação de pesos
 */
function analisarTexto(texto) {
    if (!texto || texto.length < 10) return "baixa_clareza";

    const textoMinusculo = texto.toLowerCase();
    
    // Contadores de categorias
    let scores = {
        estrategico: 0,
        emocional: 0,
        vago: 0,
        estetico: 0
    };

    // 1. Verificação via Vocabulário (JSON)
    // Nota: O vocabulário é carregado globalmente pelo engine.js
    if (vocabulario.tecnico) {
        vocabulario.tecnico.forEach(p => {
            if (textoMinusculo.includes(p.toLowerCase())) scores.estrategico += 1.5;
        });
    }

    if (vocabulario.emocional) {
        vocabulario.emocional.forEach(p => {
            if (textoMinusculo.includes(p.toLowerCase())) scores.emocional++;
        });
    }

    if (vocabulario.vago) {
        vocabulario.vago.forEach(p => {
            if (textoMinusculo.includes(p.toLowerCase())) scores.vago++;
        });
    }

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

    // Perfil: Briefing Raso (O maior inimigo da produtividade)
    if (contagemPalavras < 8 || scores.vago > scores.estrategico) {
        return "baixa_clareza";
    }

    // Padrão: Se não cair nos extremos, tratamos como necessidade de orientação
    return "baixa_clareza";
}

/**
 * Heurística Auxiliar: Deteta se o texto é puramente estético
 * Útil para o Agente sugerir que "Design não é apenas perfumaria"
 */
function detectarFocoEstetico(texto) {
    const termosEsteticos = ["bonito", "lindo", "cor", "logotipo", "desenho", "estética"];
    let count = 0;
    termosEsteticos.forEach(t => {
        if (texto.toLowerCase().includes(t)) count++;
    });
    return count > 2;
}