import { useState } from 'react'
import { batmotorLogo, heroArt } from '../assets/images'
import { apiRequestPasswordReset } from '../auth/mockSession'
import { UI_COPY } from '../constants'
import { AuthSplitShell, InputField, StudentScreenNote } from '../components'

const copy = UI_COPY.forgotPassword

/**
 * Recuperação de senha — abre a partir de “Esqueceu senha?” no login.
 */
export function ForgotPasswordPage({ navigator }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@')) {
      setError('Informe um e-mail válido para o exemplo.')
      return
    }

    setSubmitting(true)
    try {
      const result = await apiRequestPasswordReset(trimmed)
      setSuccessMessage(result.message)
    } finally {
      setSubmitting(false)
    }
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
        <StudentScreenNote title={copy.noteTitle}>
          <p className="mb-0">{copy.noteBody}</p>
        </StudentScreenNote>

        {error ? (
          <div className="alert alert-danger py-2 small" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden />
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="alert alert-success py-2 small" role="status">
            <i className="bi bi-envelope-check-fill me-2" aria-hidden />
            {successMessage}
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
          <div className="small text-body-secondary">{copy.cardTitle}</div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            icon="envelope"
            type="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            id="forgot-email"
          />

          <button
            type="submit"
            className="btn btn-lg btn-primary rounded-pill w-100 fw-bold text-uppercase mb-3"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden
                />
                Enviando…
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2" aria-hidden />
                {copy.submit}
              </>
            )}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-link w-100 text-decoration-none"
          onClick={navigator.goToLogin}
        >
          <i className="bi bi-arrow-left me-1" aria-hidden />
          {copy.backToLogin}
        </button>
      </div>
    </div>
  )

  return <AuthSplitShell heroColumn={heroColumn} formColumn={formColumn} />
}
