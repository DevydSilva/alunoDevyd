# Guia do projeto BATMOTOR — por onde começar

---

## Cabeçalho da atividade

| Campo | Informação |
|--------|------------|
| **Aluno** | Devyd Silva de Santana |
| **Professor** | Roque |
| **Data** | 04/03/2019 |
| **Tema** | Lógica de programação em JavaScript (exemplo com React, formulários e navegação por estado) |

Este bloco identifica **quem participa** na atividade e **quando a jornada acadêmica descrita no texto de boas-vindas teve início** (04/03/2019). Essa data é um **marco do curso/contexto da disciplina**, não a data em que este repositório ou o Vite foram criados. O restante do documento explica o **código do projeto** atual: pastas, telas, CSS e como executar.

---

## Data da atividade (2019) e ferramentas de hoje — nota histórica para o aluno

É importante não confundir **“quando a atividade começou”** (narrativa pedagógica) com **“quais ferramentas existiam naquele momento”**. O projeto que você roda **hoje** usa **React + Vite** porque são opções atuais, rápidas e adequadas para aprender. Abaixo, um resumo fiel ao que se sabia do ecossistema na época e ao surgimento do Vite (informações alinhadas a registros públicos, como os da [Wikipédia](https://pt.wikipedia.org/wiki/Vite_(software)) e à história do próprio projeto).

### O Vite não existia em 2019

O **Vite** foi criado por **Evan You** (mesmo criador do **Vue.js**). O **lançamento inicial** do Vite ocorreu em **abril de 2020**, ou seja, **depois** da data 04/03/2019 do cabeçalho da atividade. Portanto, em março de 2019 ninguém utilizava “React + Vite” da forma como conhecemos hoje.

### Cenário em 2019: React e build tools

No **Brasil** e no **mundo**, o desenvolvimento **React** era muito associado ao **Create React App (CRA)**, que por baixo usava o **Webpack**. O Webpack era **robusto** e amplamente adotado, mas em projetos grandes costumava ser percebido como **lento** no dia a dia (tempo para subir o servidor de desenvolvimento e recompilar após mudanças).

Em paralelo, o ecossistema React estava em **forte adoção dos Hooks** (React 16.8, fevereiro de 2019), ou seja: em 2019 o cenário já era de **componentes funcionais + hooks**, mas as **ferramentas de build** ainda eram, em geral, as da geração anterior ao que o Vite popularizou depois.

### Por que o Vite apareceu e quando se popularizou

O **Vite** surgiu em grande parte para **reduzir essa lentidão** no desenvolvimento, aproveitando **ES Modules nativos** no navegador durante o `dev` e uma abordagem de empacotamento otimizada para produção. A **popularização** ficou mais evidente a partir de **2020/2021**.

### Brasil: adoção do Vite

No **Brasil**, a adoção do Vite em projetos novos com React **cresceu bastante a partir de 2021**, e a combinação **“React + Vite”** tornou-se um **padrão comum** nos anos seguintes, muitas vezes preferida ao CRA pela **velocidade** e pela **configuração mais enxuta** — tendência acompanhada em blogs da área (como o da [StackBlitz](https://blog.stackblitz.com/)) e na documentação do próprio [Vite](https://vitejs.dev/).

### Conclusão para este projeto

- A **data 04/03/2019** no guia e na **Home** marca o **início da vivência acadêmica** descrita na atividade, **não** o stack técnico da época.
- O código que você estuda aqui usa **Vite** porque é a **ferramenta atual** recomendada para um exemplo moderno — e entender essa diferença ajuda a **situar no tempo** o que é *história da disciplina* e o que é *ferramenta de 2024/2025/2026*.

---

Este documento serve para a sala de aula: explica a **ordem recomendada** para estudar e desenvolver, o papel de **cada pasta**, o que faz **cada tela**, como o **CSS** está organizado e um **resumo** do que o projeto implementa.

---

## 1. Por onde começar (desenvolvimento das telas)

A ideia é seguir o **fluxo dos dados e da interface**, do ponto em que o navegador carrega o app até o formulário na tela — e, depois do login, até as telas internas (**Home** e **Criando o seu currículo**).

### Ordem sugerida (primeiro → último)

1. **`index.html`** (na raiz do projeto, fora de `src`)  
   Ponto de entrada do HTML: onde o Vite monta o React no `<div id="root">`. Também define idioma (`pt-BR`), título da aba e fontes do Google.

2. **`src/main.jsx`**  
   Primeiro arquivo JavaScript que executa. Aqui ficam os **imports globais de CSS** (Bootstrap, ícones, estilos próprios) e a chamada `createRoot(...).render(<App />)`. **Comece por aqui** para entender “o que carrega antes de qualquer tela”.

3. **`src/App.jsx`**  
   Componente raiz. Decide **qual tela está visível** usando `useState`, **sem** biblioteca de rotas (`react-router`). Funciona como um “mini-roteador”: **cadastro** → **login** →, após autenticação mock, **área logada** (Home ou Criando o seu currículo).

4. **`src/pages/`**  
   Aqui estão as **telas completas**: cadastro, login e as duas telas extras da área autenticada. Para **criar uma nova tela**, o caminho natural é adicionar um arquivo em `pages/`, declarar o nome da tela em `constants/screens.js` e incluir a renderização condicional no `App.jsx`.

5. **`src/components/`**  
   Peças reutilizáveis usadas pelas telas (campo com ícone, alternador de perfil, cartão de requisitos de senha, layout em duas colunas para login/cadastro, **layout com menu após o login**, etc.). Se uma parte da interface se repete ou pode ser usada em outra tela, ela tende a nascer aqui.

6. **`src/auth/`** e **`src/utils/`**  
   Lógica que **não é visual**: sessão fictícia em memória (`mockSession`), funções que imitam uma **API** (`apiRegister`, `apiLogin`), papéis de usuário (`userRoles`), formatação de CPF, força da senha, funções que “mudam de tela” sem URL real.

7. **`src/constants/`**  
   Textos fixos da interface, nomes das telas e referência de cores. Útil para não misturar **conteúdo** com **estrutura** no JSX.

Depois de dominar esse caminho, você pode evoluir o projeto (nova tela no painel, validações extras, ou integração com uma API real) sempre repetindo o padrão: **página em `pages/`**, **pedaços em `components/`**, **regras em `utils/` ou serviços**.

---

## 2. Cada pasta do projeto e sua função

### Raiz do projeto (`exemplo/`)

| Item | Função |
|------|--------|
| `package.json` | Lista dependências (React, Vite, Bootstrap, Bootstrap Icons, Popper) e scripts (`npm run dev`, `build`, `lint`). |
| `vite.config.js` | Configuração do Vite (empacotador que serve o app em desenvolvimento e gera a build). |
| `index.html` | HTML mínimo; o JavaScript entra pelo `main.jsx`. |
| `GUIA-PARA-ALUNOS.md` | Este guia. |

### `src/` — código-fonte da aplicação

| Pasta / arquivo | Função |
|-----------------|--------|
| **`main.jsx`** | Entrada do React: importa CSS global, renderiza `<App />`. |
| **`App.jsx`** | Estado da “rota” fictícia: `register`, `login`, `home`, `criando-curriculo`; banner após cadastro; escolhe qual página mostrar (público vs. área logada). |
| **`index.css`** | Ajustes globais leves no `body`, `#root` e estilo de `<code>`; não substitui o Bootstrap. |

#### `src/pages/`

Contém as **telas** como componentes React completos.

- **`RegisterPage.jsx`** — fluxo de cadastro (formulário, validação, chamada `apiRegister`, ida para o login).
- **`LoginPage.jsx`** — fluxo de login (`apiLogin`); em caso de sucesso, **navega para a Home** (não usa mais só `alert` como destino final).
- **`HomePage.jsx`** — primeira tela após o login: texto de boas-vindas da atividade (aluno, professor, Estácio, data de início).
- **`CriandoSeuCurriculoPage.jsx`** — segunda tela da área logada: conteúdo sobre montar o currículo; mesmo menu de navegação que a Home.
- **`index.js`** — reexporta as páginas para quem quiser importar `from './pages'`.

#### `src/components/`

**Componentes de interface** reutilizáveis, na maior parte estilizados com **classes Bootstrap**.

- **`InputField.jsx`** — grupo de input com ícone (Bootstrap Icons) e botão de mostrar/ocultar senha.
- **`UserTypeToggle.jsx`** — alternador Administrador / Funcionário (`btn-group`).
- **`StudentScreenNote.jsx`** — caixa didática (`alert`) explicando a tela.
- **`PasswordStrengthMeter.jsx`** — barra de progresso da força da senha.
- **`PasswordRequirementsBox.jsx`** — lista de requisitos com ícones de ok/pendente.
- **`layout/AuthSplitShell.jsx`** — layout em duas colunas (hero + formulário) com grid Bootstrap, usado em **cadastro e login**.
- **`layout/AuthenticatedShell.jsx`** — layout da **área após o login**: cabeçalho com rótulo **Paralela**, menu horizontal (**Home**, **Criando o seu currículo**, **Sair**) e área para o conteúdo da página ativa.
- **`index.js`** — exporta os componentes de um único lugar.

#### `src/auth/`

Tudo que simula **autenticação / usuário** sem servidor.

- **`mockSession.js`** — guarda um único “usuário de exemplo” na memória; `saveMockUser` e `tryMockLogin` são a base; **`apiRegister`** e **`apiLogin`** simulam latência e são o que as telas chamam (como se fossem `fetch` a um back-end).
- **`userRoles.js`** — constantes `admin` / `employee` usadas no toggle e no cadastro.
- **`index.js`** — reexporta o acima; permite `from '../auth'` em projetos que usem esse atalho.

#### `src/utils/`

**Funções puras ou quase puras** que apoiam as telas.

- **`cpfFormat.js`** — máscara visual e extração só de dígitos.
- **`passwordStrength.js`** — regras e nível de força da senha para o medidor e validação.
- **`mockNavigation.js`** — `createAuthNavigator`: devolve `goToRegister`, `goToLogin`, **`goToHome`**, **`goToCriandoCurriculo`** e **`logout`** para o JSX ficar legível.

#### `src/constants/`

Dados **estáticos** centralizados.

- **`screens.js`** — nomes `register`, `login`, **`home`**, **`criando-curriculo`** (evita strings soltas no código).
- **`uiCopy.js`** — textos da marca, rótulos, placeholders, mensagens de UI.
- **`colors.js`** — paleta em hexadecimal (referência; na interface prevalecem tema Bootstrap + classes).
- **`index.js`** — reexporta constantes.

#### `src/styles/`

- **`batmotor-theme.css`** — personalização da marca **em cima** do Bootstrap: variáveis `--bs-primary`, fundo do cartão, degradê do painel, fonte serifada dos títulos, placeholders em caixa alta, tamanho da ilustração.

#### `src/assets/`

Imagens estáticas importadas pelo Vite.

- **`BATMOTORLogo.svg`** — logo.
- **`imgPages.svg`** — ilustração isométrica do painel.
- **`images.js`** — reexporta logo + ilustração; as páginas devem importar daqui para evitar erros de caminho.

---

## 3. Função de cada tela do projeto

### Tela de cadastro (`RegisterPage.jsx`)

- **Objetivo didático:** mostrar formulário **controlado** (cada campo com `useState`), validação no cliente e “persistência” **apenas em memória**.
- **O que o usuário faz:** preenche nome, e-mail, CPF, senha e confirmação; escolhe perfil no toggle; pode acionar “chave de acesso” (apenas `alert` de demonstração).
- **O que o código faz ao enviar:** valida CPF (11 dígitos), requisitos da senha e confirmação; chama **`apiRegister`** em `mockSession.js` (que por dentro usa `saveMockUser`); opcionalmente dispara `onRegistered` (banner no `App`); navega para a tela de login via `navigator.goToLogin()`.

### Tela de login (`LoginPage.jsx`)

- **Objetivo didático:** reutilizar componentes (toggle, campos), consumir o mesmo mock do cadastro e mostrar mensagens de erro **sem backend** real.
- **O que o usuário faz:** informa CPF e senha iguais aos do cadastro; pode marcar “lembrar senha” (demonstração de UI); links “esqueceu senha” e “chave de acesso” continuam apenas ilustrativos.
- **O que o código faz ao enviar:** **`apiLogin`** valida contra o último usuário salvo em memória; em caso de sucesso, chama **`navigator.goToHome()`** e o aluno entra na **área autenticada**; em erro, mostra `alert-danger` no formulário.

### Tela Home (`HomePage.jsx`) — extra, após o login

- **Objetivo didático:** mostrar uma **primeira página interna** depois da autenticação mock, com texto fixo da atividade.
- **O que aparece:** mensagem de boas-vindas à atividade de lógica de programação em JavaScript, mencionando o **Professor Roque**, o aluno **Devyd Silva de Santana**, a **Faculdade Estácio** e o início em **04/03/2019** (o mesmo contexto do cabeçalho deste guia).
- **Onde encaixa no código:** o `App.jsx` renderiza `HomePage` **dentro** de `AuthenticatedShell` quando o estado da tela é `SCREENS.HOME`. O menu **Paralela** no topo permite ir para “Criando o seu currículo” ou sair.

### Tela “Criando o seu currículo” (`CriandoSeuCurriculoPage.jsx`) — extra, após o login

- **Objetivo didático:** ter **duas rotas fictícias** na área logada e treinar **navegação por estado** (trocar o que aparece sem mudar a URL).
- **O que aparece:** título e texto introdutório para você evoluir o conteúdo do currículo ao longo da disciplina; o guia explica que o menu **Paralela** liga esta tela à **Home**.
- **O que o código faz:** o `App.jsx` renderiza este componente quando o estado é `SCREENS.CRIANDO_CURRICULO`, sempre com o mesmo `AuthenticatedShell` (menu horizontal). A transição usa `navigator.goToCriandoCurriculo()` e `navigator.goToHome()`.

### O que o `App.jsx` organiza (visão geral)

- **Antes do login:** só **cadastro** ou **login** (com `AuthSplitShell` nas páginas correspondentes).
- **Depois do login:** **Home** ou **Criando o seu currículo**, sempre com **`AuthenticatedShell`** (menu Paralela + conteúdo).
- O **banner verde** no topo continua aparecendo só na tela de **login**, depois de um cadastro bem-sucedido, para reforçar que os dados estão só na memória até recarregar a página.
- **Sair** (`navigator.logout`) volta para o **login**; o usuário mock em memória **permanece** até dar F5 na página, então dá para entrar de novo com o mesmo CPF e senha.

---

## 4. CSS de todo o projeto (como está organizado)

### Ordem de carregamento (importante)

No **`main.jsx`**, a ordem é:

1. **`bootstrap/dist/css/bootstrap.min.css`** — base: grid, componentes, utilitários, variáveis `--bs-*`.
2. **`bootstrap-icons/font/bootstrap-icons.css`** — ícones `bi bi-*`.
3. **`bootstrap/dist/js/bootstrap.bundle.min.js`** — comportamento de componentes que precisam de JS (e Popper embutido no bundle).
4. **`./index.css`** — reset leve e estilo de `code`.
5. **`./styles/batmotor-theme.css`** — **tema BATMOTOR** e poucos seletores que o Bootstrap não cobre sozinho.

Arquivos carregados **depois** podem **sobrescrever** os anteriores. Por isso o tema vem por último (exceto estilos inline nas páginas, que têm prioridade ainda maior).

### O que cada arquivo CSS faz

| Arquivo | Papel |
|---------|--------|
| **Bootstrap** | Tipografia base, espaçamentos, botões, formulários, alertas, cards, barras de progresso, grid responsivo. Quase todo o visual das telas usa **classes** como `btn-primary`, `card`, `input-group`, `alert`, `progress`. |
| **Bootstrap Icons** | Fonte de ícones; os componentes usam classes `bi bi-person-fill`, `bi-eye-fill`, etc. |
| **`index.css`** | Margem zero no `body`, `#root` em largura total, suavização de fonte, aparência de `<code>` com fundo suave (`var(--bs-secondary-bg)`). |
| **`batmotor-theme.css`** | Ajusta **identidade**: cor primária (`--bs-primary`), cor do texto/link, degradê do painel esquerdo, cor de fundo do cartão do formulário, classe `.bm-font-serif` para títulos “editoriais”, `.bm-hero-img` para limitar a ilustração, e estilo dos **placeholders** em caixa alta dentro do cartão. |

### O que **não** fazemos neste projeto

- Não há um arquivo CSS enorme só para “desenhar” login e cadastro do zero: isso foi trocado pelo **Bootstrap + tema enxuto**, para vocês praticarem o sistema de classes oficial.

---

## 5. Resumo do que foi feito neste projeto

- **Stack:** React 19 + Vite 8, JavaScript (JSX).
- **UI:** Bootstrap 5 + Bootstrap Icons; tema BATMOTOR em CSS variável e poucas classes utilitárias `.bm-*`.
- **Fluxo:** **cadastro** → **login** → **Home** (área logada), com segunda tela **Criando o seu currículo** e menu **Paralela**; navegação por **estado no React** (sem `react-router`).
- **Dados:** nenhum banco; **sessão mock** em `mockSession.js` — `apiRegister` / `apiLogin` imitam chamadas de API; ao recarregar a página, o cadastro some.
- **Organização:** pastas `pages`, `components`, `auth`, `utils`, `constants`, `styles`, `assets`, com comentários nos arquivos principais apontando o próximo passo de leitura.
- **Imagens:** `src/assets/images.js` reexporta o logo e a ilustração — as páginas importam `from '../assets/images'` para não repetir caminhos nem nomes errados.
- **Pedagogia:** blocos `StudentScreenNote` nas telas de auth e este guia para alinhar turma e professor sobre **por onde começar** e **qual é a função de cada parte**.

---

## 6. Erros comuns do Vite: “Failed to resolve import …”

Estes erros aparecem quando o caminho ou o nome do ficheiro **não bate** com o que existe no disco.

### Imagens (SVG, PNG, etc.)

| Erro típico | Causa | Solução |
|-------------|--------|---------|
| `from "./assets/Logo.svg"` em `src/pages/RegisterPage.jsx` | O `.` aponta para `src/pages/`, logo o Vite procura `src/pages/assets/` (quase nunca existe). | Use `../assets/...` **ou**, neste projeto, `import { batmotorLogo, heroArt } from '../assets/images'`. |
| `from "../assets/logo-batmotor.svg"` mas o ficheiro não existe | O import inventou um nome; na pasta só há outro nome (ex.: `BATMOTORLogo.svg`). | Renomeie o ficheiro **ou** altere o import para o **nome exato** (atenção a maiúsculas em Linux/macOS). Melhor: ajuste só `src/assets/images.js`. |
| Dois ficheiros diferentes no login e no registo | Login importa `hero-login.svg` e o registo `imgPages.svg` sem teres copiado ambos. | Coloca os SVG em `src/assets/` e aponta para eles em `images.js`, ou usa o **mesmo** ficheiro nas duas telas se for o caso. |

### `from "../components"` ou `from "../auth"`

| Erro | Causa | Solução |
|------|--------|---------|
| `Failed to resolve import "../components"` | Falta o ficheiro `src/components/index.js` ou está vazio / com caminho errado. | Garanta `components/index.js` com `export { … }` de cada componente. |
| `Failed to resolve import "../auth"` | Importaste a **pasta** `auth` sem haver `index.js`. | Use `../auth/userRoles` e `../auth/mockSession` **ou** mantenha `src/auth/index.js` que reexporta tudo. |

### Checklist rápido (para outro clone do projeto, ex.: `batmotor-frontend`)

1. Pasta `src/assets/` com os mesmos ficheiros referenciados em `images.js` (ou nos imports).
2. Em `pages/`, nunca `./assets/` — sempre `../assets/…` ou `../assets/images`.
3. `src/components/index.js` presente se usares `from '../components'`.
4. `USER_ROLES` vem de `../auth/userRoles` ou de `../auth` se existir `auth/index.js`.

---

## 7. Como executar o projeto

Na pasta do projeto:

```bash
npm install
npm run dev
```

Abra o endereço que o terminal mostrar (geralmente `http://localhost:5173`). Para gerar a versão de produção:

```bash
npm run build
```

---

*Bom trabalho aos alunos e bons estudos.*
