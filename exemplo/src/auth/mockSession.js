/**
 * Sessão fictícia em memória — substitui banco de dados neste exemplo.
 *
 * Fluxo pedagógico:
 * 1) Aluno preenche o cadastro e clica em ENTRAR → gravamos um “usuário demo”.
 * 2) Aluno vai para o login e usa o mesmo CPF/senha → validamos contra esse objeto.
 *
 * Ao recarregar a página (F5), os dados somem: é proposital para mostrar
 * que não há persistência sem API ou storage.
 */

/** @type {{ fullName: string, email: string, cpf: string, password: string, role: string } | null} */
let mockUser = null

/**
 * Salva o cadastro de demonstração (único usuário na memória).
 */
export function saveMockUser(payload) {
  mockUser = { ...payload }
}

/**
 * Retorna o usuário demo atual ou null.
 */
export function getMockUser() {
  return mockUser
}

/**
 * Tenta autenticar com CPF e senha digitados no login.
 * @returns {{ ok: true, user: object } | { ok: false, message: string }}
 */
export function tryMockLogin(cpfDigits, password) {
  if (!mockUser) {
    return {
      ok: false,
      message:
        'Não há cadastro de exemplo na memória. Faça o cadastro primeiro e depois o login.',
    }
  }
  if (mockUser.cpf !== cpfDigits || mockUser.password !== password) {
    return {
      ok: false,
      message:
        'CPF ou senha não batem com o último cadastro de exemplo salvo na memória.',
    }
  }
  return { ok: true, user: mockUser }
}

/**
 * Camada de “API” fictícia — simula latência de rede e centraliza o contrato
 * que um front real usaria com `fetch`/`axios`.
 *
 * @param {object} payload mesmo formato de `saveMockUser`
 * @returns {Promise<{ ok: true }>}
 */
export async function apiRegister(payload) {
  await new Promise((r) => setTimeout(r, 250))
  saveMockUser(payload)
  return { ok: true }
}

/**
 * @returns {Promise<{ ok: true, user: object } | { ok: false, message: string }>}
 */
export async function apiLogin(cpfDigits, password) {
  await new Promise((r) => setTimeout(r, 250))
  return tryMockLogin(cpfDigits, password)
}

/**
 * Simula pedido de recuperação de senha (sem envio de e-mail real).
 *
 * @param {string} email e-mail já normalizado (trim + minúsculas)
 * @returns {Promise<{ ok: true, matchedMockUser: boolean, message: string }>}
 */
export async function apiRequestPasswordReset(email) {
  await new Promise((r) => setTimeout(r, 350))
  const u = getMockUser()
  const matched = Boolean(u && u.email === email)
  return {
    ok: true,
    matchedMockUser: matched,
    message: matched
      ? 'E-mail encontrado no cadastro de exemplo. Em produção, enviaríamos um link seguro para redefinir a senha.'
      : 'Se esse e-mail estiver cadastrado em nossa base, você receberá instruções em breve. (Neste exemplo não há envio real.)',
  }
}
