import { useState } from 'react'
import { getMockUser } from '../auth/mockSession'
import { USER_ROLES } from '../auth/userRoles'
import { UI_COPY } from '../constants'
import { StudentScreenNote } from '../components'
import { maskCpfInput } from '../utils/cpfFormat'

function roleLabel(role) {
  if (role === USER_ROLES.ADMIN) return UI_COPY.roles.admin
  if (role === USER_ROLES.EMPLOYEE) return UI_COPY.roles.employee
  return role || '—'
}

/**
 * Tela didática: mostra o objeto gravado em memória por `saveMockUser` / `apiRegister`.
 * Os alunos veem “de onde o login lê” os dados após o cadastro.
 */
export function UsuarioCadastradoPage() {
  const user = getMockUser()
  const [showPassword, setShowPassword] = useState(false)

  if (!user) {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4 p-md-5 text-center">
          <i className="bi bi-person-x fs-1 text-warning d-block mb-3" aria-hidden />
          <h1 className="h4 text-primary">Nenhum usuário na memória</h1>
          <p className="text-body-secondary mb-0">
            O objeto <code>mockUser</code> em <code>src/auth/mockSession.js</code> está vazio.
            Faça um <strong>cadastro</strong> e o <strong>login</strong> de novo (sem recarregar a
            página com F5).
          </p>
        </div>
      </div>
    )
  }

  const cpfFormatted = user.cpf ? maskCpfInput(user.cpf) : '—'

  return (
    <div>
      <StudentScreenNote title="Objetivo desta tela na aula">
        <p className="mb-2">
          Aqui o React apenas <strong>lê</strong> o que está em{' '}
          <code>getMockUser()</code> (<code>mockSession.js</code>) — o mesmo objeto preenchido no
          cadastro. Não há lista de vários usuários: é um <strong>único registro de exemplo</strong>{' '}
          na RAM do navegador.
        </p>
        <p className="mb-0 small">
          Em produção, dados viriam de uma API ou banco; a senha <strong>nunca</strong> seria
          armazenada em texto puro nem exibida assim. Aqui é só para visualizar o fluxo didático.
        </p>
      </StudentScreenNote>

      <div className="card border-0 shadow bm-cv-sheet rounded-4 overflow-hidden mt-4">
        <div className="card-header bm-cv-form-card-header text-white py-3 px-4">
          <h1 className="h5 mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-person-badge-fill" aria-hidden />
            Dados do usuário cadastrado
          </h1>
          <p className="small mb-0 mt-1 opacity-90">
            Leitura do objeto em memória — espelho do último cadastro de exemplo
          </p>
        </div>
        <div className="card-body p-0">
          <dl className="row mb-0 g-0">
            <div className="col-12 border-bottom bg-body-tertiary bg-opacity-50">
              <div className="row g-0 px-3 px-md-4 py-3">
                <dt className="col-sm-4 col-lg-3 text-body-secondary small text-uppercase fw-semibold">
                  Nome completo
                </dt>
                <dd className="col-sm-8 col-lg-9 mb-0 fw-semibold">{user.fullName || '—'}</dd>
              </div>
            </div>
            <div className="col-12 border-bottom">
              <div className="row g-0 px-3 px-md-4 py-3">
                <dt className="col-sm-4 col-lg-3 text-body-secondary small text-uppercase fw-semibold">
                  E-mail
                </dt>
                <dd className="col-sm-8 col-lg-9 mb-0">{user.email || '—'}</dd>
              </div>
            </div>
            <div className="col-12 border-bottom bg-body-tertiary bg-opacity-50">
              <div className="row g-0 px-3 px-md-4 py-3">
                <dt className="col-sm-4 col-lg-3 text-body-secondary small text-uppercase fw-semibold">
                  CPF
                </dt>
                <dd className="col-sm-8 col-lg-9 mb-0 font-monospace">{cpfFormatted}</dd>
              </div>
            </div>
            <div className="col-12 border-bottom">
              <div className="row g-0 px-3 px-md-4 py-3">
                <dt className="col-sm-4 col-lg-3 text-body-secondary small text-uppercase fw-semibold">
                  Perfil no cadastro
                </dt>
                <dd className="col-sm-8 col-lg-9 mb-0">
                  <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary border border-primary">
                    {roleLabel(user.role)}
                  </span>
                </dd>
              </div>
            </div>
            <div className="col-12">
              <div className="row g-0 px-3 px-md-4 py-3 align-items-center">
                <dt className="col-sm-4 col-lg-3 text-body-secondary small text-uppercase fw-semibold">
                  Senha (demo)
                </dt>
                <dd className="col-sm-8 col-lg-9 mb-0">
                  <span className="font-monospace me-3">
                    {showPassword ? user.password : '••••••••'}
                  </span>
                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cv-show-pass-demo"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label className="form-check-label small" htmlFor="cv-show-pass-demo">
                      Mostrar (apenas aula)
                    </label>
                  </div>
                </dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="card-footer bg-body-tertiary small text-body-secondary py-3 px-4">
          <strong>Arquivo-fonte:</strong>{' '}
          <code className="user-select-all">src/auth/mockSession.js</code> — variável{' '}
          <code>mockUser</code>. Perdida ao dar F5 na página.
        </div>
      </div>
    </div>
  )
}
