/**
 * Permite importar de `../auth` quando o bundler exige um ficheiro explícito.
 * Preferimos na mesma os caminhos completos (`../auth/mockSession`) para ficar
 * claro de onde vem cada função — mas este índice evita o erro
 * “Failed to resolve import ../auth”.
 */
export {
  saveMockUser,
  getMockUser,
  tryMockLogin,
  apiRegister,
  apiLogin,
  apiRequestPasswordReset,
} from './mockSession'
export { USER_ROLES } from './userRoles'
