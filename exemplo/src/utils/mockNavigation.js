/**
 * Fábrica de funções de navegação entre telas do exemplo.
 *
 * Por que existir este arquivo?
 * - O App.jsx passa `setScreen` do useState; aqui encapsulamos os nomes
 *   das transições para o código das páginas ficar legível:
 *   `goToLogin()` em vez de `setScreen('login')`.
 *
 * @param {(screen: string) => void} setScreen
 */
export function createAuthNavigator(setScreen, { SCREENS }) {
  return {
    /** Vai para a tela de cadastro (primeiro passo do fluxo demo). */
    goToRegister: () => setScreen(SCREENS.REGISTER),
    /** Vai para a tela de login (segundo passo, após cadastrar). */
    goToLogin: () => setScreen(SCREENS.LOGIN),
    /** Recuperar senha (link no login). */
    goToForgotPassword: () => setScreen(SCREENS.FORGOT_PASSWORD),
    /** Após login bem-sucedido — área autenticada. */
    goToHome: () => setScreen(SCREENS.HOME),
    /** Navegação interna — “Criando o seu currículo”. */
    goToCriandoCurriculo: () => setScreen(SCREENS.CRIANDO_CURRICULO),
    /** Dados do cadastro em memória (`getMockUser`) — didática. */
    goToUsuarioCadastrado: () => setScreen(SCREENS.USUARIO_CADASTRADO),
    /** Quiz / atividade de aula gamificada. */
    goToAtividadeAula: () => setScreen(SCREENS.ATIVIDADE_AULA),
    /** Laboratório Codar — prática de JS e CSS. */
    goToCodar: () => setScreen(SCREENS.CODAR),
    /** Jokenpô — mesmo jogo do HTML/JS, em React. */
    goToJokenpo: () => setScreen(SCREENS.JOKENPO),
    /** Cardápio do restaurante — página React de recompensa. */
    goToCardapio: () => setScreen(SCREENS.CARDAPIO),
    /** Encerra a sessão de UI e volta ao login (o cadastro em memória permanece até F5). */
    logout: () => setScreen(SCREENS.LOGIN),
  }
}
