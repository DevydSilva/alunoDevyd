import { useState } from 'react'
import { batmotorLogo, heroArt } from '../assets/images'
import { apiLogin } from '../auth/mockSession'
import { USER_ROLES } from '../auth/userRoles'
import { UI_COPY } from '../constants'
import { AuthSplitShell, InputField, StudentScreenNote, UserTypeToggle } from '../components'
import { maskCpfInput, onlyDigits } from '../utils/cpfFormat'

/**
 * LOGIN — segundo passo do fluxo de exemplo.
 *
 * Ordem sugerida para estudar o arquivo:
 * 1) Estado do formulário e do toggle de perfil (só UI; o mock grava o perfil do cadastro).
 * 2) `handleSubmit` chama `apiLogin` em `auth/mockSession.js` (camada tipo API).
 * 3) Layout: `AuthSplitShell` + `card` Bootstrap + `form-check` para “Lembrar senha”.
 */
export function LoginPage({ navigator }) {
  const [role, setRole] = useState(USER_ROLES.ADMIN)
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  function handleCpfChange(e) {
    setCpf(maskCpfInput(e.target.value))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const digits = onlyDigits(cpf)
    const result = await apiLogin(digits, password)
    if (!result.ok) {
      setError(result.message)
      return
    }

    navigator.goToHome()
  }

  function mockAccessKey() {
    window.alert(
      'Demonstração: fluxo de “chave de acesso” para administrador. Sem API neste projeto — ' +
        'apenas para mostrar o botão no layout.',
    )
  }

  const heroColumn = (
    <>
      <h1 className="bm-font-serif fw-bold text-primary lh-sm display-6 mb-3">
        {UI_COPY.brand.panelTitle}
      </h1>
      <p className="bm-font-serif lead text-body-secondary mb-4">
        {UI_COPY.brand.panelSubtitle}
      </p>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <img
          src={heroArt}
          className="bm-hero-img"
          alt="Ilustração isométrica do painel de dados"
        />
      </div>
    </>
  )

  const formColumn = (
    <div className="card bm-auth-form-card border-0 shadow-lg rounded-4 w-100">
      <div className="card-body p-3 p-md-4">
        <StudentScreenNote title="O que esta tela faz no exemplo de aula?">
          <p className="mb-2">
            Use o <strong>mesmo CPF e a mesma senha</strong> do cadastro. O login chama{' '}
            <code>apiLogin</code> (<code>src/auth/mockSession.js</code>), que valida como um
            back-end fictício. Recarregar a página apaga o cadastro — não há banco.
          </p>
          <p className="mb-0 small">
            <strong>Esqueceu senha?</strong> abre a tela de recuperação. O botão{' '}
            <strong>Chave de acesso</strong> aparece só para <strong>Administrador</strong> —{' '}
            funcionários usam recuperação por e-mail.
          </p>
        </StudentScreenNote>

        {error ? (
          <div className="alert alert-danger py-2 small" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden />
            {error}
          </div>
        ) : null}

        <div className="text-center mb-4">
          <img
            src={batmotorLogo}
            alt=""
            width={56}
            height={56}
            className="mb-2"
          />
          <div className="fw-bold text-primary text-uppercase fs-5">
            {UI_COPY.brand.name}
          </div>
          <div className="small text-body-secondary">{UI_COPY.brand.tagline}</div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <UserTypeToggle
            value={role === USER_ROLES.ADMIN ? 'admin' : 'employee'}
            onChange={(v) =>
              setRole(v === 'admin' ? USER_ROLES.ADMIN : USER_ROLES.EMPLOYEE)
            }
          />

          <InputField
            icon="person"
            placeholder={UI_COPY.login.cpfPlaceholder}
            value={cpf}
            onChange={handleCpfChange}
            autoComplete="username"
          />
          <InputField
            icon="lock"
            type="password"
            placeholder={UI_COPY.login.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            passwordVisible={showPass}
            onTogglePassword={() => setShowPass((s) => !s)}
            autoComplete="current-password"
          />

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div className="form-check mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember-pass"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="remember-pass">
                {UI_COPY.login.remember}
              </label>
            </div>
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-decoration-underline"
              onClick={navigator.goToForgotPassword}
            >
              {UI_COPY.login.forgot}
            </button>
          </div>

          {role === USER_ROLES.ADMIN ? (
            <button
              type="button"
              className="btn btn-lg btn-outline-primary w-100 mb-2 text-uppercase fw-semibold"
              onClick={mockAccessKey}
            >
              {UI_COPY.login.accessKey}
            </button>
          ) : null}

          <button
            type="submit"
            className="btn btn-lg btn-primary rounded-pill w-100 fw-bold text-uppercase"
          >
            <i className="bi bi-box-arrow-in-right me-2" aria-hidden />
            {UI_COPY.login.submit}
          </button>
        </form>

        <p className="text-center small mt-3 mb-0 text-body-secondary">
          {UI_COPY.login.registerPrompt}{' '}
          <button
            type="button"
            className="btn btn-link btn-sm p-0 align-baseline"
            onClick={navigator.goToRegister}
          >
            {UI_COPY.login.registerLink}
          </button>
        </p>
      </div>
    </div>
  )

  return (
    <AuthSplitShell heroColumn={heroColumn} formColumn={formColumn} />
  )
}
