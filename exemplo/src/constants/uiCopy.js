/**
 * Textos fixos da interface (rótulos, placeholders, mensagens educativas).
 * Separar de JSX ajuda alunos a entender “conteúdo” vs “estrutura”.
 */
export const UI_COPY = {
  brand: {
    name: 'BATMOTOR',
    tagline: 'Motores e Baterias',
    panelTitle: 'BEM-VINDO (A) PAINEL BATMOTORES',
    panelSubtitle: 'central de dados em tempo real',
  },
  roles: {
    admin: 'ADMINISTRADOR',
    employee: 'FUNCIONÁRIO',
  },
  login: {
    cpfPlaceholder: 'CPF',
    passwordPlaceholder: 'SENHA',
    remember: 'Lembrar Senha',
    forgot: 'Esqueceu senha?',
    accessKey: 'CHAVE DE ACESSO',
    submit: 'ENTRAR',
    registerPrompt: 'Ainda não é registrado?',
    registerLink: 'Cadastre-se',
  },
  forgotPassword: {
    cardTitle: 'Recuperar senha',
    noteTitle: 'Como funciona neste exemplo?',
    noteBody:
      'Informe o e-mail da sua conta. O projeto simula o envio de instruções — não há e-mail real nem servidor.',
    emailPlaceholder: 'E-MAIL CADASTRADO',
    submit: 'ENVIAR INSTRUÇÕES',
    backToLogin: 'Voltar ao login',
  },
  register: {
    title: 'cadastre-se',
    namePlaceholder: 'NOME COMPLETO',
    emailPlaceholder: 'E-MAIL',
    cpfPlaceholder: 'CPF',
    passwordPlaceholder: 'SENHA',
    confirmPlaceholder: 'CONFIRMAR SENHA',
    accessKey: 'chave de acesso',
    submit: 'ENTRAR',
    loginPrompt: 'já possui conta?',
    loginLink: 'Login',
    strengthPrefix: 'FORÇA DA SENHA:',
    requirementsTitle: 'A sua senha deve conter:',
    reqLength: 'Pelo menos 8 caracteres',
    reqLower: 'Letras minúsculas (a-z)',
    reqNumber: 'Números (0-9)',
    reqSpecial: 'Caractere especial (!@#$ etc.)',
  },
}
