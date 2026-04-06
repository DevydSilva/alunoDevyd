/**
 * Campo de formulário no padrão Bootstrap: `input-group` + `form-control`.
 *
 * Ícones: Bootstrap Icons (`bi bi-*`), carregados em `main.jsx`.
 * Botão do olho: `btn btn-outline-secondary` no grupo, acessível com `aria-label`.
 *
 * Mapa `ICON_NAMES`: nome lógico do projeto → classe do Bootstrap Icons.
 */
const ICON_NAMES = {
  person: 'bi-person-fill',
  envelope: 'bi-envelope-fill',
  id: 'bi-person-vcard-fill',
  lock: 'bi-lock-fill',
}

export function InputField({
  icon = 'person',
  type = 'text',
  placeholder,
  value,
  onChange,
  showPasswordToggle,
  passwordVisible,
  onTogglePassword,
  autoComplete,
  id,
}) {
  const iconClass = ICON_NAMES[icon] ?? ICON_NAMES.person
  // Com toggle ativo: visível → text (senha legível); oculto → password.
  // Não reutilizar `type` do pai quando visível — ele costuma ser "password" e continuaria mascarando.
  const inputType = showPasswordToggle
    ? passwordVisible
      ? 'text'
      : 'password'
    : type

  return (
    <div className="input-group input-group-lg mb-3">
      <span
        className="input-group-text bg-white text-primary"
        id={id ? `${id}-addon` : undefined}
      >
        <i className={`bi ${iconClass}`} aria-hidden />
      </span>
      <input
        id={id}
        className="form-control fw-semibold small"
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-describedby={id ? `${id}-addon` : undefined}
      />
      {showPasswordToggle ? (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onTogglePassword}
          aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          <i
            className={`bi ${passwordVisible ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
            aria-hidden
          />
        </button>
      ) : null}
    </div>
  )
}
