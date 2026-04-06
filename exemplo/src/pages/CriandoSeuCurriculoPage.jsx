import { useCallback, useState } from 'react'
import { StudentScreenNote } from '../components'
import {
  CV_STORAGE_KEY,
  clearCvDraft,
  getDefaultCvDraft,
  loadCvDraft,
  saveCvDraft,
} from '../utils/cvStorage'
import { fileToJpegDataUrl } from '../utils/cvPhoto'
import { sanitizeCvAppearance } from './cv/cvModel'
import { CvAppearanceForm } from './cv/CvAppearanceForm'
import { CvDataForm } from './cv/CvDataForm'
import { CvPreviewSheet } from './cv/CvPreviewSheet'

function mergeLoadedDraft() {
  const loaded = loadCvDraft()
  return { ...loaded, ...sanitizeCvAppearance(loaded) }
}

/**
 * Inscrição de currículo — formulário, aparência (fonte + alinhamento), salvar e imprimir.
 */
export function CriandoSeuCurriculoPage() {
  const [draft, setDraft] = useState(mergeLoadedDraft)
  const [saveMsg, setSaveMsg] = useState('')
  const [photoError, setPhotoError] = useState('')

  const update = useCallback((patch) => {
    setDraft((d) => ({ ...d, ...patch }))
    setSaveMsg('')
  }, [])

  function handleSave() {
    saveCvDraft(draft)
    setSaveMsg(
      'Currículo salvo neste navegador (dados e aparência). Você pode imprimir quando quiser.',
    )
  }

  function handleClear() {
    if (
      !window.confirm(
        'Apagar todos os dados do currículo salvos neste computador? Esta ação não pode ser desfeita.',
      )
    ) {
      return
    }
    clearCvDraft()
    setDraft(getDefaultCvDraft())
    setSaveMsg('Rascunho limpo. Os campos foram zerados.')
  }

  async function handlePhoto(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    setPhotoError('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setPhotoError('Escolha um arquivo de imagem (JPG, PNG, etc.).')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setPhotoError('Imagem muito grande. Use uma foto de até cerca de 4 MB.')
      return
    }
    try {
      const dataUrl = await fileToJpegDataUrl(file)
      update({ photoDataUrl: dataUrl })
    } catch {
      setPhotoError('Não foi possível carregar a imagem. Tente outro arquivo.')
    }
  }

  function handlePrint() {
    document.body.classList.add('bm-printing-cv')
    window.print()
    setTimeout(() => document.body.classList.remove('bm-printing-cv'), 800)
  }

  function removePhoto() {
    update({ photoDataUrl: '' })
  }

  return (
    <div className="pb-5 bm-cv-page">
      <header className="no-print mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-md-between gap-3 mb-3">
          <div>
            <h1 className="h3 fw-bold text-primary mb-1 d-flex align-items-center gap-2">
              <i className="bi bi-file-earmark-person-fill" aria-hidden />
              Inscrição de currículo
            </h1>
            <p className="text-body-secondary mb-0 small">
              Preencha os dados, personalize a folha e salve para gerar a versão para impressão ou
              PDF.
            </p>
          </div>
          <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary border border-primary px-3 py-2">
            Prática guiada — dados só no seu navegador
          </span>
        </div>

        <StudentScreenNote title="Como usar nesta aula">
          <p className="mb-2">
            Os blocos simulam um <strong>sistema de cadastro de currículo</strong>. Tudo é gravado
            no <strong>localStorage</strong> (<code>{CV_STORAGE_KEY}</code>) ao clicar em{' '}
            <strong>Salvar</strong>, incluindo <strong>fonte</strong> e{' '}
            <strong>alinhamento do nome</strong>.
          </p>
          <p className="mb-0 small">
            Use <strong>Imprimir currículo</strong> (Ctrl+P → salvar como PDF, se disponível).
          </p>
        </StudentScreenNote>
      </header>

      {saveMsg ? (
        <div className="alert alert-success no-print py-2" role="status">
          {saveMsg}
        </div>
      ) : null}

      <div className="row g-4 align-items-start">
        <div className="col-lg-6 no-print">
          <div className="card border-0 shadow bm-cv-form-card rounded-4 overflow-hidden">
            <div className="card-header bm-cv-form-card-header text-white py-3 px-3 px-md-4">
              <h2 className="h5 mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-ui-checks-grid" aria-hidden />
                Formulário de inscrição
              </h2>
              <p className="small mb-0 mt-1 opacity-90">
                Aparência primeiro; depois dados pessoais e profissionais.
              </p>
            </div>
            <div className="card-body p-3 p-md-4 bg-body-tertiary bg-opacity-50">
              <CvAppearanceForm
                fontId={draft.fontId}
                nameAlign={draft.nameAlign}
                onUpdate={update}
              />
              <CvDataForm
                draft={draft}
                onUpdate={update}
                photoError={photoError}
                onPhotoChange={handlePhoto}
                onRemovePhoto={removePhoto}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="no-print d-flex flex-wrap gap-2 mb-3 align-items-center justify-content-between">
            <h2 className="h5 mb-0 text-primary d-flex align-items-center gap-2">
              <i className="bi bi-eye" aria-hidden />
              Pré-visualização
            </h2>
            <div className="d-flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSave}>
                <i className="bi bi-floppy-fill me-1" aria-hidden />
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={handlePrint}
              >
                <i className="bi bi-printer-fill me-1" aria-hidden />
                Imprimir
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleClear}
              >
                Limpar
              </button>
            </div>
          </div>

          <CvPreviewSheet draft={draft} />
        </div>
      </div>
    </div>
  )
}
