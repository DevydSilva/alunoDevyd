/**
 * Validação de respostas do quiz (código e normalização).
 */

/**
 * @param {string} input
 * @param {string[]} acceptable
 */
export function matchesCodeAnswer(input, acceptable) {
  const raw = String(input || '').trim()
  if (!raw) return false

  const normalized = raw.replace(/\s+/g, '').toLowerCase()

  return acceptable.some((expected) => {
    const exp = String(expected).trim().replace(/\s+/g, '').toLowerCase()
    return normalized === exp
  })
}

const HIGH_KEY = 'batmotor-quiz-highscore'
const LAST_KEY = 'batmotor-quiz-last'

export function loadHighScore() {
  try {
    const n = Number.parseInt(localStorage.getItem(HIGH_KEY) || '0', 10)
    return Number.isFinite(n) ? Math.max(0, n) : 0
  } catch {
    return 0
  }
}

export function saveHighScore(score) {
  try {
    const prev = loadHighScore()
    if (score > prev) {
      localStorage.setItem(HIGH_KEY, String(score))
      return true
    }
  } catch {
    /* ignore */
  }
  return false
}

export function saveLastScore(score, total, correctCount) {
  try {
    localStorage.setItem(
      LAST_KEY,
      JSON.stringify({ score, total, correctCount, at: Date.now() }),
    )
  } catch {
    /* ignore */
  }
}
