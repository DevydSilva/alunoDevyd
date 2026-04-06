/**
 * Persistência do currículo de exemplo (sala de aula) — localStorage.
 * Sobrevive ao F5; é só do navegador (não é nuvem).
 */
export const CV_STORAGE_KEY = 'batmotor-curriculo-demo-v1'

export function getDefaultCvDraft() {
  return {
    photoDataUrl: '',
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    addressLine: '',
    neighborhood: '',
    city: '',
    state: '',
    zip: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
    /** @type {'inter'|'libre'|'georgia'|'system'|'mono'} */
    fontId: 'inter',
    /** @type {'left'|'center'|'right'|'justify'} */
    nameAlign: 'left',
  }
}

/**
 * @returns {ReturnType<typeof getDefaultCvDraft>}
 */
export function loadCvDraft() {
  try {
    const raw = localStorage.getItem(CV_STORAGE_KEY)
    if (!raw) return getDefaultCvDraft()
    const parsed = JSON.parse(raw)
    return { ...getDefaultCvDraft(), ...parsed }
  } catch {
    return getDefaultCvDraft()
  }
}

/**
 * @param {ReturnType<typeof getDefaultCvDraft>} draft
 */
export function saveCvDraft(draft) {
  localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(draft))
}

export function clearCvDraft() {
  localStorage.removeItem(CV_STORAGE_KEY)
}
