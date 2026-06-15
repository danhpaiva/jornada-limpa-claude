document.addEventListener('DOMContentLoaded', () => {
  const dataInicio = new Date('2026-06-15T00:00:00');
  const elementoDiasLimpos = document.getElementById('dias-limpos');
  const elementoMensagem = document.getElementById('mensagem');

  function calcularDiasLimpos() {
    const hoje = new Date();

    const diferencaTempo = hoje.getTime() - dataInicio.getTime();

    const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

    return dias > 0 ? dias : 0;
  }

  function atualizarContadorEMensagem() {
    const dias = calcularDiasLimpos();
    elementoDiasLimpos.textContent = dias;

    let mensagem = "";

    if (dias === 0) {
      mensagem = "Ainda não chegamos a 1 dia, mas o hoje é a maior vitória!";
    } else if (dias === 1) {
      mensagem = "Primeiro Sol! Um dia incrível de renovação. Continue firme!";
    } else if (dias >= 2 && dias <= 7) {
      mensagem = `Semana de Descoberta! Cada ${dias}º dia é um passo gigantesco.`;
    } else if (dias >= 8 && dias <= 30) {
      mensagem = `Força e Coragem! Você está construindo uma nova fundação de vida. ${dias} dias de superação!`;
    } else if (dias >= 31 && dias <= 90) {
      mensagem = `Novo Ciclo! ${dias} dias de liberdade são um presente. O universo conspira a seu favor.`;
    } else if (dias >= 91 && dias <= 180) {
      mensagem = `Voando Alto! Seu futuro está mais leve e claro. Essa jornada é um testemunho de força.`;
    } else if (dias >= 181 && dias <= 364) {
      mensagem = `Quase um Ano! O espelho reflete a melhor versão de você. ${dias} dias de pura resiliência!`;
    } else if (dias >= 365) {

      const anos = Math.floor(dias / 365);
      mensagem = `✨ ${dias} DIAS: ${anos} ${anos > 1 ? 'Anos' : 'Ano'} de Milagre! Seu renascimento inspira o mundo. A vitória é sua!`;
    } else {
      mensagem = "Preparando a decolagem! O momento da sua jornada está quase chegando.";
    }

    elementoMensagem.textContent = mensagem;
  }

  atualizarContadorEMensagem();
  setInterval(atualizarContadorEMensagem, 1000 * 60 * 60 * 24);
});