/** Máscara simples de CEP para o formulário do currículo. */
export function maskCep(value) {
  const d = value.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 5) return d
  return `${d.slice(0, 5)}-${d.slice(5)}`
}
