import { CopyBlock } from './CodarCopyBlock'
import { CodarModePicker } from './CodarModePicker'

/**
 * Trilhas explicativas — modo controlado pelo pai (CodarPage).
 */
export function CodarTutorialPanel({ mode, onModeChange, onLoadSnippet, onIrParaEditor }) {
  return (
    <div className="card border-0 shadow rounded-4 mb-4 overflow-hidden border border-primary border-opacity-25">
      <div className="card-header bg-primary bg-opacity-10 py-3 px-3 px-md-4 border-0">
        <h2 className="h5 mb-2 text-primary d-flex align-items-center gap-2">
          <i className="bi bi-mortarboard-fill" aria-hidden />
          Guia da sala Codar
        </h2>
        <CodarModePicker value={mode} onChange={onModeChange} idPrefix="tutorial" />
        <p className="small text-body-secondary mb-0 mt-3">
          O mesmo seletor aparece <strong>abaixo</strong>, perto dos exemplos — os dois ficam
          sincronizados.
        </p>
      </div>
      <div className="card-body p-3 p-md-4">
        {mode === 'ppt' ? (
          <div className="tutorial-track">
            <h3 className="h6 fw-bold text-primary mb-3">
              <i className="bi bi-joystick me-2" aria-hidden />
              Criar o jogo pedra, papel e tesoura (JavaScript + objetos)
            </h3>
            <p className="small text-body-secondary mb-3">
              Aqui na <strong>Codar</strong> você roda JS puro no navegador. O jogo usa{' '}
              <strong>objeto literal</strong> para as regras (quem ganha de quem),{' '}
              <strong>array</strong> com as três opções e <strong>Math.random</strong> para sortear.
            </p>
            <ol className="small mb-4">
              <li className="mb-2">
                Crie <code>const opcoes = [&quot;pedra&quot;, &quot;papel&quot;, &quot;tesoura&quot;]</code>.
              </li>
              <li className="mb-2">
                Monte um objeto <code>regras</code>: para cada escolha, diga de quem ela{' '}
                <strong>ganha</strong> (ex.: pedra ganha de tesoura).
              </li>
              <li className="mb-2">
                Função <code>sortear()</code> retorna <code>opcoes[índice aleatório]</code> (0 a 2).
              </li>
              <li className="mb-2">
                Compare jogador vs CPU com <code>if / else</code> e mostre o resultado com{' '}
                <code>sala.log()</code>.
              </li>
              <li>Clique em <strong>Executar código</strong> e leia a saída.</li>
            </ol>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={() => {
                  onLoadSnippet('ppt')
                  onIrParaEditor?.()
                }}
              >
                <i className="bi bi-download me-2" aria-hidden />
                Carregar modelo do jogo no editor
              </button>
              <button
                type="button"
                className="btn btn-outline-primary rounded-pill"
                onClick={() => onIrParaEditor?.()}
              >
                <i className="bi bi-arrow-down-circle me-2" aria-hidden />
                Ir ao editor
              </button>
            </div>
          </div>
        ) : null}

        {mode === 'react' ? (
          <div className="tutorial-track">
            <h3 className="h6 fw-bold text-primary mb-3">
              <i className="bi bi-layers-fill me-2" aria-hidden />
              Página web com React (conceito + este projeto)
            </h3>
            <p className="small text-body-secondary mb-3">
              <strong>React</strong> organiza a interface em <strong>componentes</strong> (funções
              que retornam <strong>JSX</strong>). O navegador não entende JSX direto: o{' '}
              <strong>Vite</strong> (ou Babel) transforma em JavaScript normal.
            </p>
            <ul className="small mb-3">
              <li className="mb-2">
                Neste repositório, a árvore começa em <code>src/main.jsx</code> com{' '}
                <code>createRoot(document.getElementById(&apos;root&apos;)).render(&lt;App /&gt;)</code>.
              </li>
              <li className="mb-2">
                Cada <strong>tela</strong> é um componente em <code>src/pages/*.jsx</code> (ex.:{' '}
                <code>HomePage.jsx</code>).
              </li>
              <li className="mb-2">
                <strong>Estado</strong> com <code>useState</code> faz a UI atualizar quando os dados
                mudam.
              </li>
            </ul>
            <p className="small fw-semibold mb-2">Exemplo mental de componente (não rode na Codar):</p>
            <pre className="small font-monospace bg-body-secondary p-3 rounded-3 mb-3 overflow-x-auto">
{`function Saudacao() {
  const [nome, setNome] = useState("aluno");
  return (
    <div>
      <p>Olá, {nome}!</p>
      <button onClick={() => setNome("React")}>Trocar</button>
    </div>
  );
}`}
            </pre>
            <p className="small text-body-secondary mb-3">
              Para <strong>criar um site novo</strong> do zero com React na sua máquina, use o modo{' '}
              <strong>React + Vite</strong> e os comandos <code>npm</code> no painel correspondente.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              onClick={() => {
                onLoadSnippet('reactDica')
                onIrParaEditor?.()
              }}
            >
              <i className="bi bi-file-earmark-code me-2" aria-hidden />
              Carregar dica + objeto no editor (simula “estado”)
            </button>
          </div>
        ) : null}

        {mode === 'vite' ? (
          <div className="tutorial-track">
            <h3 className="h6 fw-bold text-primary mb-3">
              <i className="bi bi-box-seam me-2" aria-hidden />
              Novo projeto React + Vite (terminal + dependências)
            </h3>
            <p className="small text-body-secondary mb-3">
              O <strong>Vite</strong> gera a pasta do projeto, configura o servidor de desenvolvimento
              e o build. O arquivo <code>package.json</code> lista as <strong>dependências</strong>{' '}
              (React, etc.). O comando <strong>npm install</strong> baixa tudo para a pasta{' '}
              <code>node_modules</code>.
            </p>
            <ol className="small mb-3">
              <li className="mb-2">Abra o terminal na pasta onde quer o projeto.</li>
              <li className="mb-2">
                Crie o esqueleto (nome da pasta: escolha o que quiser, ex. <code>meu-site</code>).
              </li>
              <li className="mb-2">
                Entre na pasta e rode <strong>npm install</strong> para instalar dependências.
              </li>
              <li className="mb-2">
                Rode <strong>npm run dev</strong> e abra o endereço que aparecer (ex.{' '}
                <code>localhost:5173</code>).
              </li>
            </ol>
            <CopyBlock
              label="1) Criar projeto React com Vite (JavaScript)"
              command="npm create vite@latest meu-site -- --template react"
            />
            <CopyBlock label="2) Entrar na pasta" command="cd meu-site" />
            <CopyBlock
              label="3) Instalar dependências (obrigatório antes do dev)"
              command="npm install"
            />
            <CopyBlock label="4) Subir o servidor de desenvolvimento" command="npm run dev" />
            <p className="small text-body-secondary mb-3">
              Pastas importantes: <code>index.html</code> (entrada), <code>src/main.jsx</code> (monta o
              React), <code>src/App.jsx</code> (componente raiz).
            </p>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              onClick={() => {
                onLoadSnippet('viteDica')
                onIrParaEditor?.()
              }}
            >
              <i className="bi bi-terminal me-2" aria-hidden />
              Carregar lembrete no editor (comentários + objeto fictício)
            </button>
          </div>
        ) : null}

        {mode === 'bootstrap' ? (
          <div className="tutorial-track">
            <h3 className="h6 fw-bold text-primary mb-3">
              <i className="bi bi-palette-fill me-2" aria-hidden />
              Bootstrap (CSS + componentes) no seu projeto web
            </h3>
            <p className="small text-body-secondary mb-3">
              O <strong>Bootstrap</strong> traz grid, botões, cards, formulários prontos via{' '}
              <strong>classes</strong> (ex. <code>btn-primary</code>). Muitos componentes precisam do{' '}
              <strong>JavaScript do Bootstrap</strong> e do <strong>Popper</strong> (posicionamento).
              <strong> Bootstrap Icons</strong> é um pacote à parte para ícones <code>bi bi-*</code>.
            </p>
            <p className="small fw-semibold mb-2">Instalar na pasta do projeto (após npm install base):</p>
            <CopyBlock
              label="Bootstrap + Popper + ícones (como neste exemplo de aula)"
              command="npm install bootstrap @popperjs/core bootstrap-icons"
            />
            <p className="small mb-2">No <code>main.jsx</code> (ou entrada do app), importe o CSS e o JS:</p>
            <pre className="small font-monospace bg-body-secondary p-3 rounded-3 mb-3 overflow-x-auto">
{`import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'`}
            </pre>
            <p className="small text-body-secondary mb-3">
              Na área <strong>abaixo</strong>, use o editor <strong>CSS</strong> para estilizar a caixa
              do palco (como se fosse uma classe no seu componente).
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
