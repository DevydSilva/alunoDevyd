import { maskCep } from '../../utils/cvFormat'

/**
 * Formulário de dados do candidato (foto, pessoais, endereço, experiência).
 */
export function CvDataForm({
  draft,
  onUpdate,
  photoError,
  onPhotoChange,
  onRemovePhoto,
}) {
  return (
    <>
      <fieldset className="mb-4">
        <legend className="form-label fw-semibold text-primary fs-6 d-flex align-items-center gap-2">
          <i className="bi bi-image" aria-hidden />
          Foto (opcional)
        </legend>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <label className="btn btn-outline-primary btn-sm mb-0">
            <i className="bi bi-camera-fill me-1" aria-hidden />
            Escolher foto
            <input
              type="file"
              className="d-none"
              accept="image/*"
              onChange={onPhotoChange}
            />
          </label>
          {draft.photoDataUrl ? (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={onRemovePhoto}
            >
              Remover foto
            </button>
          ) : null}
        </div>
        {photoError ? (
          <p className="text-danger small mt-2 mb-0">{photoError}</p>
        ) : null}
      </fieldset>

      <h3 className="h6 text-uppercase text-body-secondary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-person-vcard" aria-hidden />
        Dados pessoais
      </h3>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <label className="form-label" htmlFor="cv-name">
            Nome completo
          </label>
          <input
            id="cv-name"
            className="form-control"
            value={draft.fullName}
            onChange={(e) => onUpdate({ fullName: e.target.value })}
            autoComplete="name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="cv-email">
            E-mail
          </label>
          <input
            id="cv-email"
            type="email"
            className="form-control"
            value={draft.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            autoComplete="email"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="cv-phone">
            Telefone / WhatsApp
          </label>
          <input
            id="cv-phone"
            className="form-control"
            value={draft.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            autoComplete="tel"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="cv-birth">
            Data de nascimento
          </label>
          <input
            id="cv-birth"
            type="date"
            className="form-control"
            value={draft.birthDate}
            onChange={(e) => onUpdate({ birthDate: e.target.value })}
          />
        </div>
      </div>

      <h3 className="h6 text-uppercase text-body-secondary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-geo-alt" aria-hidden />
        Endereço
      </h3>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <label className="form-label" htmlFor="cv-addr">
            Logradouro e número
          </label>
          <input
            id="cv-addr"
            className="form-control"
            placeholder="Rua, avenida, nº, complemento"
            value={draft.addressLine}
            onChange={(e) => onUpdate({ addressLine: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="cv-bairro">
            Bairro
          </label>
          <input
            id="cv-bairro"
            className="form-control"
            value={draft.neighborhood}
            onChange={(e) => onUpdate({ neighborhood: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="cv-city">
            Cidade
          </label>
          <input
            id="cv-city"
            className="form-control"
            value={draft.city}
            onChange={(e) => onUpdate({ city: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label" htmlFor="cv-uf">
            UF
          </label>
          <input
            id="cv-uf"
            className="form-control text-uppercase"
            maxLength={2}
            value={draft.state}
            onChange={(e) =>
              onUpdate({ state: e.target.value.toUpperCase().slice(0, 2) })
            }
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="cv-cep">
            CEP
          </label>
          <input
            id="cv-cep"
            className="form-control"
            inputMode="numeric"
            placeholder="00000-000"
            value={draft.zip}
            onChange={(e) => onUpdate({ zip: maskCep(e.target.value) })}
          />
        </div>
      </div>

      <h3 className="h6 text-uppercase text-body-secondary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-briefcase" aria-hidden />
        Conteúdo profissional
      </h3>
      <div className="mb-3">
        <label className="form-label" htmlFor="cv-summary">
          Objetivo / resumo profissional
        </label>
        <textarea
          id="cv-summary"
          className="form-control"
          rows={3}
          value={draft.summary}
          onChange={(e) => onUpdate({ summary: e.target.value })}
          placeholder="Ex.: Busco estágio em desenvolvimento web…"
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cv-edu">
          Formação acadêmica
        </label>
        <textarea
          id="cv-edu"
          className="form-control"
          rows={4}
          value={draft.education}
          onChange={(e) => onUpdate({ education: e.target.value })}
          placeholder="Curso, instituição, previsão de conclusão…"
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cv-exp">
          Experiência profissional
        </label>
        <textarea
          id="cv-exp"
          className="form-control"
          rows={4}
          value={draft.experience}
          onChange={(e) => onUpdate({ experience: e.target.value })}
          placeholder="Cargos, empresas, períodos e principais atividades…"
        />
      </div>
      <div className="mb-0">
        <label className="form-label" htmlFor="cv-skills">
          Habilidades e cursos
        </label>
        <textarea
          id="cv-skills"
          className="form-control"
          rows={3}
          value={draft.skills}
          onChange={(e) => onUpdate({ skills: e.target.value })}
          placeholder="Idiomas, ferramentas, certificações…"
        />
      </div>
    </>
  )
}
