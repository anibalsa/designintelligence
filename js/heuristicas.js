function analisarTexto(texto) {
  texto = texto.toLowerCase();

  let score = {
    emocional: 0,
    tecnico: 0,
    vago: 0
  };

  vocabulario.emocional.forEach(p => {
    if (texto.includes(p)) score.emocional++;
  });

  vocabulario.tecnico.forEach(p => {
    if (texto.includes(p)) score.tecnico++;
  });

  vocabulario.vago.forEach(p => {
    if (texto.includes(p)) score.vago++;
  });

  if (score.tecnico > score.emocional && score.tecnico > score.vago) {
    return "maturidade_alta";
  }

  if (score.emocional > score.tecnico) {
    return "ansiedade";
  }

  return "baixa_clareza";
}
