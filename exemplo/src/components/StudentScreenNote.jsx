/**
 * Faixa didática para a sala de aula usando `alert` do Bootstrap.
 *
 * `alert-warning` chama atenção sem parecer erro; `small` deixa o texto denso
 * e legível dentro do cartão.
 */
export function StudentScreenNote({ title, children }) {
  return (
    <aside className="alert alert-warning border border-warning small mb-3 py-3" role="note">
      <strong className="alert-heading d-block mb-2 text-uppercase">{title}</strong>
      <div className="mb-0 text-body-secondary">{children}</div>
    </aside>
  )
}
