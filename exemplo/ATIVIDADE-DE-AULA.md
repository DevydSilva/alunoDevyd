# Atividade de aula — guia rápido

Este documento resume **os assuntos** cobertos pelo quiz gamificado e onde está o código.

## Onde jogar no app

Depois do **login**, abra o menu **☰ Paralela** → **Atividade de aula**.  
Arquivos principais:

| Arquivo | Função |
|---------|--------|
| `src/pages/AtividadeDeAulaPage.jsx` | Tela do jogo: pontos, sequência, progresso, fim com estrelas |
| `src/pages/atividadeDeAula/quizData.js` | Perguntas (múltipla escolha + digitar código) |
| `src/pages/atividadeDeAula/quizLogic.js` | Validar respostas de código e recorde no `localStorage` |

## Temas cobertos (alinhados ao projeto)

1. **Projeto BATMOTOR** — `mockSession`, `mockUser`, `App.jsx` e telas, `localStorage` do currículo vs memória do login.
2. **JavaScript** — `async`/`await`, método de array na pergunta de código.
3. **React** — `useState`, JSX, `useCallback` (conceito).
4. **Vite** — papel no dev/build; comando `npm run dev`.
5. **Bootstrap** — classes (`btn-primary`), **Offcanvas** (gaveta), **Bootstrap Icons**.

## Regras do joguinho

- Cada acerto soma **pontos** (valores diferentes por pergunta).
- Perguntas de **código**: digite a resposta; espaços e maiúsculas são normalizados.
- **Recorde** e última pontuação ficam no navegador (`localStorage`), só para motivação — **não substitui prova formal**.
- Ao terminar: **estrelas** conforme percentual, opção **Jogar de novo**.

## Para o professor

- Edite ou amplie perguntas em `quizData.js` (mantenha `correctIndex` ou `acceptableAnswers` coerentes).
- Ajuste `QUIZ_MAX_SCORE` é calculado automaticamente a partir dos `points` de cada item.
