import {
  getCvBodySectionClasses,
  getCvFontFamily,
  getCvHeaderLayout,
} from './cvModel'

/**
 * Folha de currículo (pré-visualização + área de impressão).
 */
export function CvPreviewSheet({ draft }) {
  const fontFamily = getCvFontFamily(draft.fontId)
  const header = getCvHeaderLayout(draft.nameAlign)
  const body = getCvBodySectionClasses(draft.nameAlign)

  const addressLine = [
    draft.addressLine,
    draft.neighborhood,
    [draft.city, draft.state].filter(Boolean).join(' / '),
    draft.zip ? `CEP ${draft.zip}` : '',
  ]
    .filter(Boolean)
    .join(' — ')

  return (
    <article
      className="card bm-cv-print-area border-0 shadow bm-cv-sheet rounded-4 overflow-hidden bg-white"
      style={{ fontFamily }}
      aria-label="Currículo para impressão"
    >
      <div className="bm-cv-sheet-inner p-4 p-md-5">
        <header
          className={`${header.root} border-bottom border-primary border-opacity-25 pb-4 mb-4`}
        >
          <div className={header.photoWrap}>
            {draft.photoDataUrl ? (
              <img
                src={draft.photoDataUrl}
                alt="Foto do candidato"
                className="rounded-3 object-fit-cover border border-light shadow-sm"
                width={120}
                height={120}
              />
            ) : (
              <div
                className="rounded-3 bg-body-secondary d-flex align-items-center justify-content-center text-body-secondary border bm-cv-photo-placeholder"
                style={{ width: 120, height: 120 }}
              >
                <i className="bi bi-person-fill bm-cv-photo-placeholder-icon" aria-hidden />
              </div>
            )}
          </div>
          <div className={header.textBlock}>
            <h1 className={`h3 fw-bold text-primary ${header.nameClass}`}>
              {draft.fullName.trim() || 'Seu nome completo'}
            </h1>
            <p className={header.metaClass}>
              {[draft.email, draft.phone].filter(Boolean).join(' · ') ||
                'E-mail e telefone'}
            </p>
            {draft.birthDate ? (
              <p className={header.birthClass}>
                Nascimento:{' '}
                {new Date(`${draft.birthDate}T12:00:00`).toLocaleDateString('pt-BR')}
              </p>
            ) : null}
          </div>
        </header>

        <div className={body.block}>
          <section className="mb-4">
            <h2 className={`h6 text-uppercase fw-bold text-primary mb-2 ${body.heading}`}>
              Endereço
            </h2>
            <address className={`mb-0 small fst-normal text-body ${body.address}`}>
              {addressLine || 'Preencha o endereço no formulário.'}
            </address>
          </section>

          {draft.summary.trim() ? (
            <section className="mb-4">
              <h2 className={`h6 text-uppercase fw-bold text-primary mb-2 ${body.heading}`}>
                Objetivo
              </h2>
              <p
                className={`mb-0 small text-body ${body.paragraph}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {draft.summary}
              </p>
            </section>
          ) : null}

          {draft.education.trim() ? (
            <section className="mb-4">
              <h2 className={`h6 text-uppercase fw-bold text-primary mb-2 ${body.heading}`}>
                Formação
              </h2>
              <p
                className={`mb-0 small text-body ${body.paragraph}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {draft.education}
              </p>
            </section>
          ) : null}

          {draft.experience.trim() ? (
            <section className="mb-4">
              <h2 className={`h6 text-uppercase fw-bold text-primary mb-2 ${body.heading}`}>
                Experiência
              </h2>
              <p
                className={`mb-0 small text-body ${body.paragraph}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {draft.experience}
              </p>
            </section>
          ) : null}

          {draft.skills.trim() ? (
            <section className="mb-0">
              <h2 className={`h6 text-uppercase fw-bold text-primary mb-2 ${body.heading}`}>
                Habilidades
              </h2>
              <p
                className={`mb-0 small text-body ${body.paragraph}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {draft.skills}
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  )
}
