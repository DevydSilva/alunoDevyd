/**
 * Nomes das “telas” deste exemplo didático.
 * Não usamos react-router de propósito: o fluxo fica explícito no App.jsx
 * para quem está aprendendo a ver estado + renderização condicional.
 */
export const SCREENS = {
  /** Primeira tela do fluxo de exemplo: criar usuário fictício na memória */
  REGISTER: 'register',
  /** Segunda tela: entrar com os dados salvos pelo cadastro de exemplo */
  LOGIN: 'login',
  /** Recuperação de senha (fluxo a partir de “Esqueceu senha?” no login) */
  FORGOT_PASSWORD: 'forgot-password',
  /** Área autenticada: boas-vindas e navegação do exemplo */
  HOME: 'home',
  /** Área autenticada: conteúdo “Criando o seu currículo” */
  CRIANDO_CURRICULO: 'criando-curriculo',
  /** Área autenticada: ver dados do usuário salvo no mock (aula) */
  USUARIO_CADASTRADO: 'usuario-cadastrado',
  /** Área autenticada: quiz gamificado (perguntas + código) */
  ATIVIDADE_AULA: 'atividade-aula',
  /** Área autenticada: laboratório de código (JS + CSS + palco) */
  CODAR: 'codar',
  /** Área autenticada: Jokenpô em React (exemplo do jogo completo na UI) */
  JOKENPO: 'jokenpo',
  /** Área autenticada: cardápio de restaurante em React (recompensa do desafio 2) */
  CARDAPIO: 'cardapio',
}
