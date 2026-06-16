document.addEventListener('DOMContentLoaded', () => {
  const DATA_INICIO = new Date('2026-06-17T00:00:00');

  const elDias = document.getElementById('dias-limpos');
  const elMensagem = document.getElementById('mensagem');
  const elRing = document.getElementById('ring-progress');
  const elMilestones = document.getElementById('milestones-list');

  // ── SVG gradient ────────────────────────────────────────────
  const svg = document.querySelector('.ring');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#5eead4"/>
    </linearGradient>`;
  svg.prepend(defs);
  elRing.setAttribute('stroke', 'url(#ringGradient)');

  // ── Milestones config ────────────────────────────────────────
  const MILESTONES = [
    { dias: 1, icon: '🌅', label: '1º Dia', desc: 'Primeiro passo dado' },
    { dias: 7, icon: '🌱', label: '1 Semana', desc: 'Sete dias de força' },
    { dias: 30, icon: '🌿', label: '1 Mês', desc: 'Um ciclo completo' },
    { dias: 90, icon: '🔥', label: '3 Meses', desc: 'Novo hábito consolidado' },
    { dias: 180, icon: '⚡', label: '6 Meses', desc: 'Meio ano de liberdade' },
    { dias: 365, icon: '✨', label: '1 Ano', desc: 'Um ano de renascimento' },
  ];

  // ── Mensagens por faixa ──────────────────────────────────────
  function getMensagem(dias) {
    if (dias === 0) return 'O hoje já é uma vitória. Cada hora conta.';
    if (dias === 1) return 'Primeiro Sol! Um dia incrível de renovação.';
    if (dias <= 7) return `Semana de Descoberta — cada ${dias}º dia é um passo gigantesco.`;
    if (dias <= 30) return `Força e Coragem! Você está construindo uma nova fundação. ${dias} dias de superação.`;
    if (dias <= 90) return `Novo Ciclo — ${dias} dias de liberdade são um presente enorme.`;
    if (dias <= 180) return `Voando Alto! Seu futuro está mais leve e claro. ${dias} dias de resiliência.`;
    if (dias <= 364) return `Quase um Ano — ${dias} dias de pura força. O espelho reflete a melhor versão de você.`;
    const anos = Math.floor(dias / 365);
    return `${dias} dias — ${anos} ${anos > 1 ? 'Anos' : 'Ano'} de Milagre! Seu renascimento inspira o mundo.`;
  }

  // ── Ring progress (teto em 365 dias para animação) ───────────
  const CIRCUNFERENCIA = 2 * Math.PI * 88; // r=88 → ~553
  function setRing(dias) {
    const progresso = Math.min(dias / 365, 1);
    const offset = CIRCUNFERENCIA * (1 - progresso);
    elRing.setAttribute('stroke-dasharray', CIRCUNFERENCIA.toFixed(1));
    elRing.setAttribute('stroke-dashoffset', offset.toFixed(1));
  }

  // ── Milestones render ─────────────────────────────────────────
  function renderMilestones(diasAtuais) {
    elMilestones.innerHTML = '';

    // Próximos 3 não atingidos + todos os atingidos (últimos 2)
    const atingidos = MILESTONES.filter(m => diasAtuais >= m.dias);
    const proximos = MILESTONES.filter(m => diasAtuais < m.dias).slice(0, 3);

    const mostrar = [...atingidos.slice(-2), ...proximos];

    mostrar.forEach(m => {
      const alcancado = diasAtuais >= m.dias;
      const li = document.createElement('li');
      li.className = `milestone${alcancado ? ' milestone--achieved' : ''}`;

      const faltam = m.dias - diasAtuais;
      const sub = alcancado
        ? `Alcançado em ${m.dias} dias`
        : faltam === 1 ? 'Amanhã!' : `Faltam ${faltam} dias`;

      li.innerHTML = `
        <span class="milestone__icon">${m.icon}</span>
        <span class="milestone__info">
          <span class="milestone__name">${m.label}</span>
          <span class="milestone__sub">${sub}</span>
        </span>
        ${alcancado ? '<span class="milestone__check">✓</span>' : ''}`;
      elMilestones.appendChild(li);
    });
  }

  // ── Contador com animação de count-up ─────────────────────────
  function calcularDias() {
    const diff = new Date() - DATA_INICIO;
    return Math.max(0, Math.floor(diff / 86400000));
  }

  function animarContador(alvo) {
    const duracao = 1000;
    const inicio = performance.now();
    const de = 0;

    function step(agora) {
      const t = Math.min((agora - inicio) / duracao, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      elDias.textContent = Math.round(de + (alvo - de) * ease);
      if (t < 1) requestAnimationFrame(step);
      else elDias.textContent = alvo;
    }
    requestAnimationFrame(step);
  }

  // ── Init ──────────────────────────────────────────────────────
  function atualizar() {
    const dias = calcularDias();
    animarContador(dias);
    elMensagem.textContent = getMensagem(dias);
    setRing(dias);
    renderMilestones(dias);
  }

  atualizar();

  // Atualiza à meia-noite
  const agora = new Date();
  const ateMeiaNoite = new Date(agora);
  ateMeiaNoite.setHours(24, 0, 0, 0);
  setTimeout(() => {
    atualizar();
    setInterval(atualizar, 86400000);
  }, ateMeiaNoite - agora);
});
