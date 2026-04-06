import { UI_COPY } from '../constants'
import { STRENGTH_LEVELS } from '../utils/passwordStrength'

/**
 * Medidor visual com componente nativo `progress` do Bootstrap.
 *
 * Variantes: `bg-danger`, `bg-warning`, `bg-success` — nomes fixos (sem template
 * dinâmico tipo `bg-${x}`) para o bundler sempre incluir as classes.
 */
export function PasswordStrengthMeter({ analysis }) {
  const { fillRatio, label, level } = analysis
  const pct = Math.round(fillRatio * 100)

  let barClass = 'bg-danger'
  if (level === STRENGTH_LEVELS.MEDIUM) barClass = 'bg-warning'
  if (level === STRENGTH_LEVELS.STRONG) barClass = 'bg-success'

  let textClass = 'text-danger'
  if (level === STRENGTH_LEVELS.MEDIUM) textClass = 'text-warning-emphasis'
  if (level === STRENGTH_LEVELS.STRONG) textClass = 'text-success'

  return (
    <div className="mb-3">
      <div className="progress" style={{ height: '0.4rem' }} aria-hidden>
        <div
          className={`progress-bar ${barClass}`}
          role="progressbar"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="small fw-bold text-uppercase mt-2 mb-0">
        {UI_COPY.register.strengthPrefix}{' '}
        <span className={textClass}>{label}</span>
      </p>
    </div>
  )
}
