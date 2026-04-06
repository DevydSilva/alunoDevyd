/**
 * Modelo e regras do currículo (aparência + validação) — lógica pura, sem React.
 */

export const CV_FONT_PRESETS = {
  inter: {
    id: 'inter',
    label: 'Inter — limpa e profissional',
    cssFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  libre: {
    id: 'libre',
    label: 'Libre Baskerville — clássica',
    cssFamily: "'Libre Baskerville', Georgia, 'Times New Roman', serif",
  },
  georgia: {
    id: 'georgia',
    label: 'Georgia — serifa tradicional',
    cssFamily: 'Georgia, "Times New Roman", serif',
  },
  system: {
    id: 'system',
    label: 'Sistema — fonte do SO',
    cssFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  mono: {
    id: 'mono',
    label: 'Monoespaçada — técnica',
    cssFamily: 'ui-monospace, Consolas, "Cascadia Code", monospace',
  },
}

export const CV_NAME_ALIGN = {
  left: { id: 'left', label: 'À esquerda', short: 'Esquerda' },
  center: { id: 'center', label: 'Ao centro', short: 'Centro' },
  right: { id: 'right', label: 'À direita', short: 'Direita' },
  justify: { id: 'justify', label: 'Justificado', short: 'Justif.' },
}

export const DEFAULT_CV_FONT_ID = 'inter'
export const DEFAULT_CV_NAME_ALIGN = 'left'

export const CV_FONT_OPTIONS = Object.values(CV_FONT_PRESETS)
export const CV_NAME_ALIGN_OPTIONS = Object.values(CV_NAME_ALIGN)

export function isValidCvFontId(id) {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(CV_FONT_PRESETS, id)
}

export function isValidCvNameAlign(id) {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(CV_NAME_ALIGN, id)
}

/**
 * Garante campos de aparência válidos após carga do storage ou versões antigas.
 */
export function sanitizeCvAppearance(draft) {
  const d = draft && typeof draft === 'object' ? draft : {}
  return {
    fontId: isValidCvFontId(d.fontId) ? d.fontId : DEFAULT_CV_FONT_ID,
    nameAlign: isValidCvNameAlign(d.nameAlign) ? d.nameAlign : DEFAULT_CV_NAME_ALIGN,
  }
}

export function getCvFontFamily(fontId) {
  const preset = CV_FONT_PRESETS[isValidCvFontId(fontId) ? fontId : DEFAULT_CV_FONT_ID]
  return preset.cssFamily
}

/**
 * Classes do cabeçalho (foto + nome) conforme alinhamento escolhido.
 */
export function getCvHeaderLayout(nameAlign) {
  const align = isValidCvNameAlign(nameAlign) ? nameAlign : DEFAULT_CV_NAME_ALIGN

  switch (align) {
    case 'center':
      return {
        root: 'd-flex flex-column align-items-center text-center gap-4',
        photoWrap: 'flex-shrink-0',
        textBlock: 'w-100',
        nameClass: 'mb-1 text-center',
        metaClass: 'mb-1 small text-body-secondary text-center',
        birthClass: 'mb-0 small text-body-secondary text-center',
      }
    case 'right':
      return {
        root: 'd-flex flex-column flex-sm-row-reverse align-items-center align-items-sm-start gap-4',
        photoWrap: 'flex-shrink-0 mx-auto mx-sm-0',
        textBlock: 'flex-grow-1 text-center text-sm-end',
        nameClass: 'mb-1 text-sm-end',
        metaClass: 'mb-1 small text-body-secondary text-sm-end',
        birthClass: 'mb-0 small text-body-secondary text-sm-end',
      }
    case 'justify':
      return {
        root: 'd-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4',
        photoWrap: 'flex-shrink-0 mx-auto mx-sm-0',
        textBlock: 'flex-grow-1 text-sm-start',
        nameClass: 'mb-1 text-justify',
        metaClass: 'mb-1 small text-body-secondary text-justify',
        birthClass: 'mb-0 small text-body-secondary text-justify',
      }
    case 'left':
    default:
      return {
        root: 'd-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4',
        photoWrap: 'flex-shrink-0 mx-auto mx-sm-0',
        textBlock: 'flex-grow-1 text-center text-sm-start',
        nameClass: 'mb-1 text-sm-start',
        metaClass: 'mb-1 small text-body-secondary',
        birthClass: 'mb-0 small text-body-secondary',
      }
  }
}

/** Alinhamento do corpo (endereço e seções), coerente com o nome. */
export function getCvBodySectionClasses(nameAlign) {
  const align = isValidCvNameAlign(nameAlign) ? nameAlign : DEFAULT_CV_NAME_ALIGN
  switch (align) {
    case 'center':
      return {
        block: 'text-center',
        heading: 'text-center',
        paragraph: 'text-center',
        address: 'text-center',
      }
    case 'right':
      return {
        block: 'text-end',
        heading: 'text-end',
        paragraph: 'text-end',
        address: 'text-end',
      }
    case 'justify':
      return {
        block: 'text-start',
        heading: 'text-start',
        paragraph: 'text-justify',
        address: 'text-justify',
      }
    case 'left':
    default:
      return {
        block: 'text-start',
        heading: 'text-start',
        paragraph: 'text-start',
        address: 'text-start',
      }
  }
}
