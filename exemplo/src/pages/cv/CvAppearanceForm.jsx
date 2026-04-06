import { CV_FONT_OPTIONS, CV_NAME_ALIGN_OPTIONS } from './cvModel'

/**
 * Controles de tipografia e alinhamento do nome no currículo.
 */
export function CvAppearanceForm({ fontId, nameAlign, onUpdate }) {
  const currentAlign = CV_NAME_ALIGN_OPTIONS.find((o) => o.id === nameAlign)

  return (
    <section className="bm-cv-appearance rounded-4 border border-primary border-opacity-25 bg-white p-3 p-md-4 mb-4 shadow-sm">
      <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-primary border-opacity-10">
        <span className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center bm-cv-icon-circle">
          <i className="bi bi-palette-fill" aria-hidden />
        </span>
        <div>
          <h3 className="h6 mb-0 fw-bold text-primary">Aparência do documento</h3>
          <p className="mb-0 small text-body-secondary">
            Fonte do texto e posição do nome na folha (também vale na impressão).
          </p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label
            className="form-label fw-semibold small text-uppercase text-body-secondary mb-2"
            htmlFor="cv-font-family"
          >
            <i className="bi bi-type me-1" aria-hidden />
            Fonte das letras
          </label>
          <select
            id="cv-font-family"
            className="form-select form-select-lg"
            value={fontId}
            onChange={(e) => onUpdate({ fontId: e.target.value })}
          >
            {CV_FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <span className="form-label fw-semibold small text-uppercase text-body-secondary d-block mb-2">
            <i className="bi bi-text-left me-1" aria-hidden />
            Posição do nome
          </span>
          <div
            className="d-grid gap-2 bm-cv-align-grid"
            role="group"
            aria-label="Alinhamento do nome no currículo"
          >
            {CV_NAME_ALIGN_OPTIONS.map((opt) => {
              const active = nameAlign === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn btn-sm py-2 ${active ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => onUpdate({ nameAlign: opt.id })}
                  aria-pressed={active}
                >
                  {opt.short}
                </button>
              )
            })}
          </div>
          <p className="small text-body-secondary mt-2 mb-0">
            {currentAlign ? (
              <>
                <strong>{currentAlign.label}</strong>
                {' — '}
                {nameAlign === 'justify'
                  ? 'nome e parágrafos abaixo com texto justificado.'
                  : nameAlign === 'center'
                    ? 'nome e seções centralizados na folha.'
                    : nameAlign === 'right'
                      ? 'nome e textos alinhados à direita.'
                      : 'layout clássico: nome à esquerda (ao lado da foto em telas largas).'}
              </>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  )
}
