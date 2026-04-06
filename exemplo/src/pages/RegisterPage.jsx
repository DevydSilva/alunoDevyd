import { useMemo, useState } from 'react'
import { batmotorLogo, heroArt } from '../assets/images'
import { apiRegister } from '../auth/mockSession'
import { USER_ROLES } from '../auth/userRoles'
import { UI_COPY } from '../constants'
import {
  AuthSplitShell,
  InputField,
  PasswordRequirementsBox,
  PasswordStrengthMeter,
  StudentScreenNote,
  UserTypeToggle,
} from '../components'
import { maskCpfInput, onlyDigits } from '../utils/cpfFormat'
import { analyzePassword } from '../utils/passwordStrength'

/**
 * CADASTRO — primeiro passo do fluxo de exemplo.
 *
 * Ordem sugerida para estudar o arquivo:
 * 1) Hooks de estado no topo (cada campo = um pedaço do formulário controlado).
 * 2) `handleSubmit`: validação → `apiRegister` → navegação via `navigator`.
 * 3) JSX: quase só classes Bootstrap + componentes em `src/components/`.
 */
export function RegisterPage({ navigator, onRegistered }) {
  const [role, setRole] = useState(USER_ROLES.ADMIN)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formError, setFormError] = useState('')

  const analysis = useMemo(() => analyzePassword(password), [password])

  function handleCpfChange(e) {
    setCpf(maskCpfInput(e.target.value))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const digits = onlyDigits(cpf)
    if (digits.length !== 11) {
      setFormError('Informe um CPF com 11 dígitos (exemplo didático).')
      return
    }
    if (!fullName.trim() || !email.trim()) {
      setFormError('Preencha nome completo e e-mail para o exemplo.')
      return
    }
    if (
      !analysis.checks.lengthOk ||
      !analysis.checks.lower ||
      !analysis.checks.number ||
      !analysis.checks.special
    ) {
      setFormError('A senha ainda não atende a todos os requisitos da lista abaixo.')
      return
    }
    if (password !== confirm) {
      setFormError('A confirmação da senha precisa ser igual à senha.')
      return
    }

    await apiRegister({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      cpf: digits,
      password,
      role,
    })

    onRegistered?.()
    navigator.goToLogin()
  }

  function mockAccessKey() {
    window.alert(
      'Demonstração: aqui entraria um fluxo de “chave de acesso” (e-mail/SMS). ' +
        'Neste projeto não há servidor — só a navegação entre telas.',
    )
  }

  const heroColumn = (
    <>
      <div className="d-flex align-items-center gap-3 mb-3 mb-lg-4">
        <img
          src={batmotorLogo}
          alt=""
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <div>
          <span className="d-block fs-4 fw-bold text-uppercase text-primary">
            {UI_COPY.brand.name}
          </span>
          <span className="small text-primary">{UI_COPY.brand.tagline}</span>
        </div>
      </div>
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
          <p className="mb-0">
            Aqui você simula o <strong>cadastro</strong> de um usuário. Os dados são
            guardados só na <strong>memória do navegador</strong> (veja{' '}
            <code>src/auth/mockSession.js</code>). Depois, use o mesmo CPF e senha no
            login para fechar o ciclo.
          </p>
        </StudentScreenNote>

        {formError ? (
          <div className="alert alert-danger py-2 small" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden />
            {formError}
          </div>
        ) : null}

        <h1 className="h3 text-center text-primary text-lowercase fw-bold mb-4">
          {UI_COPY.register.title}
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <UserTypeToggle
            value={role === USER_ROLES.ADMIN ? 'admin' : 'employee'}
            onChange={(v) =>
              setRole(v === 'admin' ? USER_ROLES.ADMIN : USER_ROLES.EMPLOYEE)
            }
          />

          <InputField
            icon="person"
            placeholder={UI_COPY.register.namePlaceholder}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
          <InputField
            icon="envelope"
            type="email"
            placeholder={UI_COPY.register.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <InputField
            icon="id"
            placeholder={UI_COPY.register.cpfPlaceholder}
            value={cpf}
            onChange={handleCpfChange}
            autoComplete="off"
          />
          <InputField
            icon="lock"
            type="password"
            placeholder={UI_COPY.register.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            passwordVisible={showPass}
            onTogglePassword={() => setShowPass((s) => !s)}
            autoComplete="new-password"
          />

          <PasswordStrengthMeter analysis={analysis} />
          <PasswordRequirementsBox checks={analysis.checks} />

          <InputField
            icon="lock"
            type="password"
            placeholder={UI_COPY.register.confirmPlaceholder}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            showPasswordToggle
            passwordVisible={showConfirm}
            onTogglePassword={() => setShowConfirm((s) => !s)}
            autoComplete="new-password"
          />

          <button
            type="button"
            className="btn btn-lg btn-outline-primary w-100 mb-2"
            onClick={mockAccessKey}
          >
            <em className="fw-semibold fst-italic text-lowercase">
              {UI_COPY.register.accessKey}
            </em>
          </button>

          <button
            type="submit"
            className="btn btn-lg btn-primary rounded-pill w-100 fw-bold text-uppercase"
          >
            <i className="bi bi-box-arrow-in-right me-2" aria-hidden />
            {UI_COPY.register.submit}
          </button>
        </form>

        <p className="text-center small mt-3 mb-0 text-body-secondary">
          {UI_COPY.register.loginPrompt}{' '}
          <button
            type="button"
            className="btn btn-link btn-sm p-0 align-baseline"
            onClick={navigator.goToLogin}
          >
            {UI_COPY.register.loginLink}
          </button>
        </p>
      </div>
    </div>
  )

  return (
    <AuthSplitShell heroColumn={heroColumn} formColumn={formColumn} />
  )
}
