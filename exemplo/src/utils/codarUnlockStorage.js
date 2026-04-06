/**
 * Desbloqueio de telas «recompensa» após o aluno acertar o desafio na Sala Codar.
 */

const STORAGE_KEY = 'bm_paralela_codar_unlocks_v1'

export const CODAR_UNLOCKS_EVENT = 'bm:codar-unlocks-updated'

const PENDING_CHALLENGE_KEY = 'bm_codar_pending_challenge'

export function normalizeCodarSolution(source) {
  if (typeof source !== 'string') return ''
  return source
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/u, ''))
    .join('\n')
    .trim()
}

function readRaw() {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (!s) return {}
    const o = JSON.parse(s)
    return typeof o === 'object' && o !== null ? o : {}
  } catch {
    return {}
  }
}

export function readCodarUnlocks() {
  const raw = readRaw()
  return {
    jokenpo: Boolean(raw.jokenpo),
    cardapio: Boolean(raw.cardapio),
  }
}

export function setCodarChallengeUnlocked(id) {
  const raw = readRaw()
  raw[id] = true
  localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  window.dispatchEvent(new Event(CODAR_UNLOCKS_EVENT))
}

export function clearAllCodarUnlocks() {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(CODAR_UNLOCKS_EVENT))
}

export function setPendingCodarChallenge(id) {
  sessionStorage.setItem(PENDING_CHALLENGE_KEY, id)
}

export function consumePendingCodarChallenge() {
  const v = sessionStorage.getItem(PENDING_CHALLENGE_KEY)
  sessionStorage.removeItem(PENDING_CHALLENGE_KEY)
  if (v === 'jokenpo' || v === 'cardapio') return v
  return null
}
