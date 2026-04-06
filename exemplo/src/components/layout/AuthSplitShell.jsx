/**
 * Layout em duas colunas usando apenas o grid do Bootstrap.
 *
 * Por que existe?
 * - Login e cadastro repetem a mesma estrutura: hero à esquerda, cartão à direita.
 * - Centralizar aqui evita copiar `row` / `col-lg-6` e mantém o aluno focado
 *   nas páginas (`pages/`) como lugar onde nasce o fluxo (estado, submit, etc.).
 *
 * Leia também: documentação oficial “Layout > Grid” no site do Bootstrap 5.
 */
export function AuthSplitShell({ heroColumn, formColumn }) {
  return (
    <div className="container-fluid px-0 min-vh-100">
      <div className="row g-0 min-vh-100">
        <div className="col-lg-6 bm-auth-hero-panel d-flex flex-column justify-content-center px-4 px-lg-5 py-4 py-lg-5">
          {heroColumn}
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center bg-body-tertiary py-4 px-3 px-lg-4">
          {formColumn}
        </div>
      </div>
    </div>
  )
}
