import { UI_COPY } from '../constants'

/**
 * Alternador de perfil com `btn-group` do Bootstrap.
 *
 * Estado ativo: `btn-primary` + ícone `bi-check-lg`.
 * Inativo: `btn-light` com borda para contraste sobre o cartão azul claro.
 */
export function UserTypeToggle({ value, onChange }) {
  const isAdmin = value === 'admin'

  return (
    <div
      className="btn-group w-100 mb-3 shadow-sm"
      role="group"
      aria-label="Tipo de usuário"
    >
      <button
        type="button"
        className={`btn btn-lg ${isAdmin ? 'btn-primary' : 'btn-light border'}`}
        aria-pressed={isAdmin}
        onClick={() => onChange('admin')}
      >
        {isAdmin ? <i className="bi bi-check-lg me-1" aria-hidden /> : null}
        <span className="small fw-bold">{UI_COPY.roles.admin}</span>
      </button>
      <button
        type="button"
        className={`btn btn-lg ${!isAdmin ? 'btn-primary' : 'btn-light border'}`}
        aria-pressed={!isAdmin}
        onClick={() => onChange('employee')}
      >
        {!isAdmin ? <i className="bi bi-check-lg me-1" aria-hidden /> : null}
        <span className="small fw-bold">{UI_COPY.roles.employee}</span>
      </button>
    </div>
  )
}
