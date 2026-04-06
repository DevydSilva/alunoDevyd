import { CODAR_SNIPPETS } from './snippets'

/**
 * Cada desafio tem gabarito em `snippets.js`. O editor deve ser idêntico ao modelo (após normalização).
 */
export const CODAR_CHALLENGE_DEFS = [
  {
    id: 'jokenpo',
    unlockKey: 'jokenpo',
    menuLabel: 'Jokenpô (React)',
    title: 'Desafio 1 — Pedra, papel e tesoura',
    description:
      'O código JavaScript deve ser exatamente o programa do jogo (mesmo texto do botão «Pedra / papel / tesoura» no modo PPT). Use Executar para testar; depois clique em Verificar desafio.',
    solutionSnippetKey: 'ppt',
    rewardHint: 'Menu: Jokenpô (React) — jogo completo na interface web.',
  },
  {
    id: 'cardapio',
    unlockKey: 'cardapio',
    menuLabel: 'Cardápio (React)',
    title: 'Desafio 2 — Cardápio de restaurante',
    description:
      'Reproduza o modelo: array de pratos (entrada, principal, sobremesa), sala.log do nome do restaurante, forEach que lista cada item com preço, e última linha com a quantidade de itens. Você pode usar «Carregar modelo do desafio» e depois Verificar (o texto precisa ficar idêntico ao gabarito).',
    solutionSnippetKey: 'cardapioDesafio',
    rewardHint: 'Menu: Cardápio (React) — página web do restaurante.',
  },
]

/** @param {string | null} id */
export function getCodarChallengeById(id) {
  if (!id) return null
  return CODAR_CHALLENGE_DEFS.find((c) => c.id === id) ?? null
}

/** @param {{ solutionSnippetKey: string }} def */
export function getChallengeSolutionJs(def) {
  return CODAR_SNIPPETS[def.solutionSnippetKey] ?? ''
}
