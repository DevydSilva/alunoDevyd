/**
 * Análise simples de força de senha para o medidor visual do cadastro.
 * Critérios alinhados à caixa “A sua senha deve conter”.
 */

export const STRENGTH_LEVELS = {
  VERY_SHORT: 'very_short',
  WEAK: 'weak',
  MEDIUM: 'medium',
  STRONG: 'strong',
}

const labels = {
  [STRENGTH_LEVELS.VERY_SHORT]: 'MUITO CURTA',
  [STRENGTH_LEVELS.WEAK]: 'FRACA',
  [STRENGTH_LEVELS.MEDIUM]: 'MÉDIA',
  [STRENGTH_LEVELS.STRONG]: 'FORTE',
}

/**
 * @param {string} password
 */
export function analyzePassword(password) {
  const len = password.length
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  const checks = {
    lengthOk: len >= 8,
    lower: hasLower,
    number: hasNumber,
    special: hasSpecial,
  }

  const score =
    (checks.lengthOk ? 1 : 0) +
    (checks.lower ? 1 : 0) +
    (checks.number ? 1 : 0) +
    (checks.special ? 1 : 0)

  let level = STRENGTH_LEVELS.VERY_SHORT
  if (len === 0) {
    level = STRENGTH_LEVELS.VERY_SHORT
  } else if (len < 6 || score <= 1) {
    level = STRENGTH_LEVELS.WEAK
  } else if (score === 2 || score === 3) {
    level = STRENGTH_LEVELS.MEDIUM
  } else {
    level = STRENGTH_LEVELS.STRONG
  }

  const fillRatio =
    level === STRENGTH_LEVELS.VERY_SHORT
      ? Math.min(1, len / 8) * 0.25
      : level === STRENGTH_LEVELS.WEAK
        ? 0.35
        : level === STRENGTH_LEVELS.MEDIUM
          ? 0.65
          : 1

  return {
    checks,
    level,
    label: labels[level],
    /** 0 a 1 para a barra de progresso */
    fillRatio,
  }
}
