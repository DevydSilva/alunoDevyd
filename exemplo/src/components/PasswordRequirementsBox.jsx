import { UI_COPY } from '../constants'

/**
 * Lista de requisitos com `card` do Bootstrap e ícones `bi-*`.
 *
 * Evitamos CSS próprio: alinhamento com `d-flex`, `gap-2`, `list-unstyled`.
 */
export function PasswordRequirementsBox({ checks }) {
  const items = [
    { ok: checks.lengthOk, text: UI_COPY.register.reqLength },
    { ok: checks.lower, text: UI_COPY.register.reqLower },
    { ok: checks.number, text: UI_COPY.register.reqNumber },
    { ok: checks.special, text: UI_COPY.register.reqSpecial },
  ]

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body py-3">
        <p className="fw-bold mb-3">{UI_COPY.register.requirementsTitle}</p>
        <ul className="list-unstyled small mb-0">
          {items.map((row) => (
            <li
              key={row.text}
              className="d-flex align-items-center gap-2 py-1"
            >
              <i
                className={`bi ${row.ok ? 'bi-check-circle-fill text-success' : 'bi-circle text-secondary'}`}
                aria-hidden
              />
              <span>{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
