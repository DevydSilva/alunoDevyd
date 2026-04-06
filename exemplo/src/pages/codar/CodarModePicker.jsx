import { CODAR_MODES } from './modes'

/** Seletor de modo — radio + label para cliques confiáveis. */
export function CodarModePicker({ value, onChange, idPrefix = 'codar-mode' }) {
  return (
    <fieldset className="border-0 m-0 p-0">
      <legend className="form-label fw-bold text-primary mb-2 d-flex align-items-center gap-2">
        <i className="bi bi-ui-checks-grid" aria-hidden />
        Escolha o que vai praticar
      </legend>
      <div
        className="d-flex flex-wrap gap-2 codar-mode-picker"
        role="radiogroup"
        aria-label="Modo de aprendizado na sala Codar"
      >
        {CODAR_MODES.map((m) => {
          const selected = value === m.id
          return (
            <label
              key={m.id}
              className={`btn mb-0 rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 ${
                selected ? 'btn-primary' : 'btn-outline-primary'
              }`}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <input
                type="radio"
                className="visually-hidden"
                name={`${idPrefix}-group`}
                value={m.id}
                checked={selected}
                onChange={() => onChange(m.id)}
              />
              <i className={`bi ${m.icon}`} aria-hidden />
              <span>{m.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
