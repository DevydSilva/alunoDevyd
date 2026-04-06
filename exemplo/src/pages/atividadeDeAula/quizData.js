/**
 * Banco de perguntas — Atividade de aula (quiz gamificado).
 * Temas: projeto BATMOTOR, JavaScript, React, Vite, Bootstrap.
 */

/** @typedef {'projeto' | 'javascript' | 'react' | 'vite' | 'bootstrap'} QuizCategory */

/**
 * @typedef {Object} QuizQuestionChoice
 * @property {string} id
 * @property {QuizCategory} category
 * @property {'choice'} type
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 * @property {number} points
 * @property {string} explanation
 */

/**
 * @typedef {Object} QuizQuestionCode
 * @property {string} id
 * @property {QuizCategory} category
 * @property {'code'} type
 * @property {string} question
 * @property {string} [codePrompt]
 * @property {string[]} acceptableAnswers
 * @property {string} [hint]
 * @property {number} points
 * @property {string} explanation
 */

/** @type {(QuizQuestionChoice | QuizQuestionCode)[]} */
export const QUIZ_QUESTIONS = [
  {
    id: 'p1',
    category: 'projeto',
    type: 'choice',
    question:
      'Neste exemplo, onde o cadastro do usuário fictício fica guardado após clicar em cadastrar?',
    options: [
      'No localStorage do navegador',
      'Na variável mockUser em mockSession.js (memória RAM)',
      'Em um arquivo JSON na pasta public/',
      'No GitHub automaticamente',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      'O `saveMockUser` grava em `mockUser` no módulo `src/auth/mockSession.js`. Some ao dar F5.',
  },
  {
    id: 'p2',
    category: 'projeto',
    type: 'choice',
    question: 'Como o App.jsx decide qual tela mostrar (Home, login, etc.)?',
    options: [
      'Com react-router e URLs diferentes',
      'Com useState guardando um “código de tela” e renderização condicional',
      'Só com CSS display:none',
      'Com um banco de dados SQLite',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      'Usamos constantes em `screens.js` e `screen === SCREENS.HOME` etc., sem react-router de propósito didático.',
  },
  {
    id: 'js1',
    category: 'javascript',
    type: 'choice',
    question: 'O que `async function` combinado com `await` ajuda a expressar no JavaScript?',
    options: [
      'Código que parece síncrono mas espera Promises terminarem',
      'Que o código roda só no servidor',
      'Que variáveis são privadas',
      'Que não pode usar return',
    ],
    correctIndex: 0,
    points: 10,
    explanation:
      '`await` pausa a função async até a Promise resolver — usado em `apiLogin` e `apiRegister` no projeto.',
  },
  {
    id: 'js2',
    category: 'javascript',
    type: 'code',
    question: 'Qual método de array cria um novo array com os itens que passam em um teste?',
    codePrompt: 'const ativos = lista._______(item => item.ativo)',
    acceptableAnswers: ['filter'],
    hint: 'Nome em inglês: filtrar.',
    points: 15,
    explanation: '`filter` retorna um novo array apenas com elementos onde a função retorna true.',
  },
  {
    id: 'r1',
    category: 'react',
    type: 'choice',
    question: 'Para que serve o hook useState em um componente funcional?',
    options: [
      'Importar CSS',
      'Guardar estado local que pode mudar e re-renderizar a UI',
      'Conectar ao Webpack',
      'Substituir o HTML',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      '`useState` devolve [valor, setValor]; ao chamar o setter, o React atualiza a tela.',
  },
  {
    id: 'r2',
    category: 'react',
    type: 'code',
    question: 'Complete o hook usado para estado no React (um só nome, sem parênteses):',
    codePrompt: 'const [nome, setNome] = ___________("")',
    acceptableAnswers: ['useState'],
    hint: 'Começa com use e termina com State.',
    points: 15,
    explanation: '`useState` é o hook mais comum para estado em componentes funcionais.',
  },
  {
    id: 'r3',
    category: 'react',
    type: 'choice',
    question: 'O que JSX representa na prática?',
    options: [
      'Um banco de dados',
      'Sintaxe que lembra HTML mas vira chamadas como React.createElement',
      'Um tipo de arquivo só do Vite',
      'CSS embutido',
    ],
    correctIndex: 1,
    points: 10,
    explanation: 'JSX é açúcar sintático sobre a API do React para descrever a interface.',
  },
  {
    id: 'v1',
    category: 'vite',
    type: 'choice',
    question: 'Qual é um papel principal do Vite no desenvolvimento?',
    options: [
      'Substituir o JavaScript por Python',
      'Servidor de dev rápido e build otimizado usando ES modules nativos',
      'Gerenciar senhas',
      'Criar apenas páginas estáticas sem React',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      'O Vite acelera o `npm run dev` e empacota o projeto com `npm run build`.',
  },
  {
    id: 'v2',
    category: 'vite',
    type: 'code',
    question:
      'Digite o comando npm (só as palavras-chave, sem "npm") usado para subir o servidor de desenvolvimento neste projeto:',
    acceptableAnswers: ['run dev', 'dev', 'npm run dev', 'npmrundev'],
    hint: 'No package.json scripts: dois termos separados por espaço, ou só o segundo.',
    points: 12,
    explanation: 'Comandos típicos: `npm run dev` (ou às vezes o projeto expõe `npm dev`).',
  },
  {
    id: 'b1',
    category: 'bootstrap',
    type: 'choice',
    question: 'O que a classe Bootstrap `btn-primary` costuma fazer?',
    options: [
      'Esconder o botão',
      'Aplicar o estilo visual principal (cor primária) do tema',
      'Transformar em link externo',
      'Desativar JavaScript',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      'Classes utilitárias e de componente do Bootstrap definem aparência; a primária vem das variáveis `--bs-primary`.',
  },
  {
    id: 'b2',
    category: 'bootstrap',
    type: 'choice',
    question:
      'Qual componente Bootstrap usamos no menu lateral após o login (gaveta que desliza)?',
    options: ['Modal', 'Offcanvas', 'Accordion', 'Toast'],
    correctIndex: 1,
    points: 10,
    explanation: '`offcanvas` cria o painel que entra pela lateral — nosso “navigation drawer”.',
  },
  {
    id: 'b3',
    category: 'bootstrap',
    type: 'code',
    question:
      'Complete a classe do ícone Bootstrap Icons para uma casa (home), sem o prefixo bi-:',
    codePrompt: '<i class="bi bi-________"></i>',
    acceptableAnswers: ['house', 'house-door', 'house-fill', 'house-door-fill'],
    hint: 'Pode ser house, house-door, house-fill… qualquer variante aceita.',
    points: 14,
    explanation:
      'Bootstrap Icons usa `bi` + nome, ex.: `bi-house-door-fill` na navegação.',
  },
  {
    id: 'p3',
    category: 'projeto',
    type: 'choice',
    question: 'Onde o currículo do aluno persiste após clicar em Salvar na tela de currículo?',
    options: [
      'No mockSession junto com a senha',
      'No localStorage do navegador (chave batmotor-curriculo-demo-v1)',
      'No e-mail do professor',
      'No Vite.config.js',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      '`cvStorage.js` usa localStorage — diferente do login mock que some com F5.',
  },
  {
    id: 'r4',
    category: 'react',
    type: 'choice',
    question: 'Por que usamos useCallback em alguns componentes ao passar funções para filhos?',
    options: [
      'Para o código rodar mais rápido sempre',
      'Para estabilizar a referência da função e evitar re-renders desnecessários (e clareza)',
      'Porque useState não funciona sem ele',
      'Para substituir useState',
    ],
    correctIndex: 1,
    points: 10,
    explanation:
      'Útil quando a função é dependência de outros hooks ou otimizações com React.memo.',
  },
]

export const QUIZ_MAX_SCORE = QUIZ_QUESTIONS.reduce((acc, q) => acc + q.points, 0)

export const CATEGORY_LABELS = {
  projeto: { label: 'Projeto', icon: 'bi-folder2-open', color: 'primary' },
  javascript: { label: 'JavaScript', icon: 'bi-braces', color: 'warning' },
  react: { label: 'React', icon: 'bi-layers-fill', color: 'info' },
  vite: { label: 'Vite', icon: 'bi-lightning-charge-fill', color: 'success' },
  bootstrap: { label: 'Bootstrap', icon: 'bi-bricks', color: 'secondary' },
}
