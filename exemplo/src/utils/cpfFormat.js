/**
 * Utilitários de CPF apenas para máscara visual e normalização.
 * Não valida dígitos verificadores — o foco do exemplo é navegação e UI.
 */

/** Remove tudo que não é dígito */
export function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

/**
 * Formata como 000.000.000-00 enquanto o usuário digita.
 */
export function maskCpfInput(raw) {
  const d = onlyDigits(raw).slice(0, 11)
  const p1 = d.slice(0, 3)
  const p2 = d.slice(3, 6)
  const p3 = d.slice(6, 9)
  const p4 = d.slice(9, 11)
  let out = p1
  if (p2) out += `.${p2}`
  if (p3) out += `.${p3}`
  if (p4) out += `-${p4}`
  return out
}
