# 🌿 Jornada Limpa

<p align="left">
  <a href="https://github.com/danhpaiva/jornada-limpa-claude/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" />
  </a>
  <a href="https://danhpaiva.github.io/jornada-limpa-claude/">
    <img src="https://img.shields.io/badge/GitHub%20Pages-deployed-blue?style=flat-square&logo=github" alt="GitHub Pages" />
  </a>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <a href="https://github.com/danhpaiva/jornada-limpa-claude/commits/main">
    <img src="https://img.shields.io/github/last-commit/danhpaiva/jornada-limpa-claude?style=flat-square" alt="Last Commit" />
  </a>
</p>

Contador de dias de sobriedade com design escuro, anel de progresso animado e marcos da jornada. Sem dependências, sem build — apenas HTML, CSS e JavaScript puro.

**[→ Ver ao vivo](https://danhpaiva.github.io/jornada-limpa-claude/)**

---

## Funcionalidades

- **Contador de dias** — calcula automaticamente os dias desde a data de início, com animação count-up
- **Ring de progresso SVG** — anel animado com gradiente, evolui de 0% a 100% ao completar 365 dias
- **Mensagem dinâmica** — frases motivacionais que mudam conforme o tempo passa
- **Marcos da jornada** — exibe milestones atingidos ✓ e os próximos por vir, com contagem regressiva
- **Atualização automática** — página se atualiza precisamente à meia-noite

## Estrutura

```
jornada-limpa-claude/
├── jornada/                        # Raiz publicada no GitHub Pages
│   ├── index.html                  # Markup semântico
│   └── assets/
│       ├── css/style.css           # Design system (dark mode, CSS custom properties)
│       └── js/script.js            # Lógica de contador, ring SVG e milestones
└── .github/
    └── workflows/static.yml        # CI/CD — deploy automático no GitHub Pages
```

## Stack

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e acessibilidade (`aria-live`, `aria-label`) |
| CSS3 + Custom Properties | Design tokens, animações, layout responsivo |
| JavaScript ES2020 | Lógica de datas, animações via `requestAnimationFrame` |
| SVG inline | Ring de progresso com gradiente |
| Google Fonts (Inter) | Tipografia |
| GitHub Actions | Deploy automatizado no GitHub Pages |

## Deploy

O deploy acontece automaticamente a cada push em `main` ou `master`:

```bash
git push origin main
```

O workflow em `.github/workflows/static.yml` empacota o conteúdo de `jornada/` e publica via OIDC no GitHub Pages. Nenhum step de build necessário.

## Desenvolvimento local

Sem dependências ou build steps. Qualquer servidor estático funciona:

```bash
# Com Node.js
npx serve jornada

# Com Python
python -m http.server 8080 --directory jornada

# Ou abrir direto no browser
open jornada/index.html
```

## Customização

**Data de início** — edite `assets/js/script.js`:

```js
const DATA_INICIO = new Date('2026-06-15T00:00:00');
```

**Cores** — edite as variáveis CSS em `assets/css/style.css`:

```css
:root {
  --color-accent:   #7c6af7;  /* roxo principal */
  --color-accent-2: #5eead4;  /* teal do gradiente */
  --color-success:  #34d399;  /* verde dos marcos atingidos */
}
```

**Milestones** — edite o array em `assets/js/script.js`:

```js
const MILESTONES = [
  { dias: 1,   icon: '🌅', label: '1º Dia',   desc: 'Primeiro passo dado' },
  { dias: 7,   icon: '🌱', label: '1 Semana', desc: 'Sete dias de força'  },
  // ...
];
```

## Licença

MIT © [Daniel Paiva](https://github.com/danhpaiva)
