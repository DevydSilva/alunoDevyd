import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StudentScreenNote } from '../components'
import { useCodarUnlocks } from '../hooks/useCodarUnlocks'
import {
  consumePendingCodarChallenge,
  normalizeCodarSolution,
  setCodarChallengeUnlocked,
} from '../utils/codarUnlockStorage'
import { CodarModePicker } from './codar/CodarModePicker'
import { CodarTutorialPanel } from './codar/CodarTutorialPanel'
import {
  CODAR_CHALLENGE_DEFS,
  getChallengeSolutionJs,
  getCodarChallengeById,
} from './codar/challenges'
import { CODAR_CSS_EXEMPLO, CODAR_SNIPPETS } from './codar/snippets'

const STYLE_ID = 'codar-user-dynamic-style'

const MSG_SEM_MODULOS =
  'A Sala Codar não executa módulos ES (import/export). Use só JavaScript com o objeto sala. Código de React/Vite (.jsx) não roda aqui — use as telas do projeto no editor ou o interpretador sem import.'

function codigoUsaImportExport(js) {
  for (const line of js.split('\n')) {
    const t = line.trim()
    if (
      t.startsWith('import ') ||
      t.startsWith('export ') ||
      /^export\s*\{/.test(t) ||
      /^export\s+default\b/.test(t)
    ) {
      return true
    }
  }
  return false
}

function humanizarErroCodar(mensagem) {
  if (
    mensagem.includes('Cannot use import statement outside a module') ||
    mensagem.includes('Unexpected token \'export\'') ||
    mensagem.includes('Unexpected reserved word') && mensagem.toLowerCase().includes('import')
  ) {
    return MSG_SEM_MODULOS
  }
  return mensagem
}

/**
 * Sala Codar — prática de JavaScript (objetos, lógica), CSS na caixa e saída no console.
 */
export function CodarPage() {
  const unlocks = useCodarUnlocks()
  const [activeChallengeId, setActiveChallengeId] = useState(null)
  const [verifyFeedback, setVerifyFeedback] = useState(null)

  const [mode, setMode] = useState('ppt')
  const [jsCode, setJsCode] = useState(CODAR_SNIPPETS.objeto)
  const [cssCode, setCssCode] = useState(CODAR_CSS_EXEMPLO)
  const [logs, setLogs] = useState([])
  const [runError, setRunError] = useState('')
  const [pos, setPos] = useState({ x: 10, y: 40 })
  const [boxBg, setBoxBg] = useState('#2b50aa')
  const [stageBg, setStageBg] = useState('#dfeaf8')
  const [boxText, setBoxText] = useState('')

  const intervalIdsRef = useRef([])

  const pararAnimacoes = useCallback(() => {
    intervalIdsRef.current.forEach((id) => clearInterval(id))
    intervalIdsRef.current = []
  }, [])

  useEffect(() => {
    const pending = consumePendingCodarChallenge()
    if (pending) setActiveChallengeId(pending)
  }, [])

  useEffect(() => {
    setVerifyFeedback(null)
  }, [activeChallengeId])

  useEffect(() => {
    return () => {
      pararAnimacoes()
      const el = document.getElementById(STYLE_ID)
      if (el) el.remove()
    }
  }, [pararAnimacoes])

  const aplicarCssNoDom = useCallback(() => {
    let el = document.getElementById(STYLE_ID)
    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }
    el.textContent = `.codar-stage .codar-movable { ${cssCode} }`
  }, [cssCode])

  /** Palco reflete o CSS ao editar — não depende de «Executar». */
  useLayoutEffect(() => {
    aplicarCssNoDom()
  }, [aplicarCssNoDom])

  const executar = useCallback(() => {
    pararAnimacoes()
    setLogs([])
    setRunError('')

    const sala = {
      log(...args) {
        const line = args
          .map((a) => {
            if (a === null || a === undefined) return String(a)
            if (typeof a === 'object') {
              try {
                return JSON.stringify(a)
              } catch {
                return String(a)
              }
            }
            return String(a)
          })
          .join(' ')
        setLogs((prev) => [...prev, line])
      },
      mover(x = 0, y = 0) {
        const nx = Math.max(0, Math.min(100, Number(x)))
        const ny = Math.max(0, Math.min(100, Number(y)))
        setPos({ x: Number.isFinite(nx) ? nx : 0, y: Number.isFinite(ny) ? ny : 0 })
      },
      corCaixa(valor) {
        setBoxBg(String(valor))
      },
      corPalco(valor) {
        setStageBg(String(valor))
      },
      textoNaCaixa(texto) {
        setBoxText(String(texto))
      },
      repetir(fn, ms) {
        if (typeof fn !== 'function') return null
        const delay = Math.max(20, Number(ms) || 100)
        const id = setInterval(fn, delay)
        intervalIdsRef.current.push(id)
        return id
      },
      pararTimer(id) {
        if (id == null) return
        clearInterval(id)
        intervalIdsRef.current = intervalIdsRef.current.filter((i) => i !== id)
      },
    }

    try {
      if (codigoUsaImportExport(jsCode)) {
        setRunError(MSG_SEM_MODULOS)
        return
      }
      const runner = new Function('sala', `"use strict";\n${jsCode}\n`)
      runner(sala)
    } catch (e) {
      const bruto = e instanceof Error ? e.message : String(e)
      setRunError(humanizarErroCodar(bruto))
    }
  }, [jsCode, pararAnimacoes])

  function limparTudo() {
    pararAnimacoes()
    setLogs([])
    setRunError('')
    setJsCode(CODAR_SNIPPETS.vazio)
    setCssCode('')
    setPos({ x: 10, y: 40 })
    setBoxBg('#2b50aa')
    setStageBg('#dfeaf8')
    setBoxText('')
  }

  function carregarSnippet(key) {
    if (CODAR_SNIPPETS[key] !== undefined) {
      setJsCode(CODAR_SNIPPETS[key])
    }
  }

  function irParaEditor() {
    document.getElementById('codar-editor-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const activeChallenge = getCodarChallengeById(activeChallengeId)

  function verificarDesafio() {
    if (!activeChallenge) return
    const expected = getChallengeSolutionJs(activeChallenge)
    if (normalizeCodarSolution(jsCode) !== normalizeCodarSolution(expected)) {
      setVerifyFeedback('fail')
      return
    }
    setCodarChallengeUnlocked(activeChallenge.unlockKey)
    setVerifyFeedback('ok')
  }

  return (
    <div className="codar-page pb-5">
      <CodarTutorialPanel
        mode={mode}
        onModeChange={setMode}
        onLoadSnippet={carregarSnippet}
        onIrParaEditor={irParaEditor}
      />

      <StudentScreenNote title="Sala Codar — como usar">
        <p className="mb-2">
          Escreva <strong>JavaScript</strong> no editor — <strong>sem</strong>{' '}
          <code>import</code> nem <code>export</code> (não é um módulo Vite/React). Seu código recebe o
          objeto <code>sala</code>: <code>sala.log()</code> para saída, <code>sala.mover(x, y)</code> com
          posição em % (0–100), <code>sala.corCaixa</code> / <code>sala.corPalco</code>,{' '}
          <code>sala.textoNaCaixa</code>, e <code>sala.repetir(fn, ms)</code> para animar (use{' '}
          <strong>Parar animações</strong> antes de rodar outro exemplo).
        </p>
        <p className="mb-2 small">
          O <strong>CSS</strong> atualiza a caixa do <strong>Palco em tempo real</strong> enquanto você
          digita. O <strong>JavaScript</strong> só roda quando você clica em{' '}
          <strong>Executar código</strong> — aí as mensagens aparecem em <strong>Saída</strong>.
        </p>
        <p className="mb-2 small">
          <strong>Componentes React</strong> (.jsx) são para as telas do projeto; aqui você pratica
          objetos e lógica JS no interpretador, com preview visual de estilo na caixa.
        </p>
        <p className="mb-2 small">
          <strong>Desafios:</strong> abaixo você pode escolher um desafio; quando o JavaScript for{' '}
          <strong>idêntico ao gabarito</strong> (normalização de quebra de linha), a página correspondente
          no menu (Jokenpô ou Cardápio web) é <strong>desbloqueada</strong> neste navegador.
        </p>
        <p className="mb-0 small text-danger">
          <i className="bi bi-shield-exclamation me-1" aria-hidden />
          Uso apenas <strong>local / aula</strong>. Não cole código de fontes desconhecidas.
        </p>
      </StudentScreenNote>

      <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
        <div className="card-header bg-success bg-opacity-10 border-0 py-3">
          <h2 className="h6 mb-0 text-success d-flex align-items-center gap-2">
            <i className="bi bi-trophy" aria-hidden />
            Desafios (desbloqueiam páginas React no menu)
          </h2>
        </div>
        <div className="card-body">
          <p className="small text-body-secondary mb-3">
            Selecione um desafio para ver o enunciado e usar <strong>Verificar desafio</strong>. Se o
            menu estiver bloqueado, tocar no item envia você de volta à Codar com o desafio já
            selecionado.
          </p>
          <div
            className="d-flex flex-wrap gap-2 mb-3"
            role="group"
            aria-label="Escolha do desafio"
          >
            <button
              type="button"
              className={`btn btn-sm rounded-pill ${activeChallengeId === null ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => setActiveChallengeId(null)}
            >
              Prática livre
            </button>
            {CODAR_CHALLENGE_DEFS.map((def) => {
              const done = Boolean(unlocks[def.unlockKey])
              return (
                <button
                  key={def.id}
                  type="button"
                  className={`btn btn-sm rounded-pill position-relative ${activeChallengeId === def.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveChallengeId(def.id)}
                >
                  {def.title}
                  {done ? (
                    <i className="bi bi-check-circle-fill text-success ms-1" aria-label="Desbloqueado" />
                  ) : null}
                </button>
              )
            })}
          </div>

          {activeChallenge ? (
            <div className="border rounded-3 p-3 bg-body-secondary bg-opacity-25">
              <p className="small mb-3">{activeChallenge.description}</p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm rounded-pill"
                  onClick={() => {
                    carregarSnippet(activeChallenge.solutionSnippetKey)
                    irParaEditor()
                  }}
                >
                  <i className="bi bi-download me-1" aria-hidden />
                  Carregar modelo do desafio no editor
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm rounded-pill"
                  onClick={verificarDesafio}
                >
                  <i className="bi bi-patch-check me-1" aria-hidden />
                  Verificar desafio
                </button>
              </div>
              {verifyFeedback === 'ok' ? (
                <div className="alert alert-success small mb-0 py-2" role="status">
                  <strong>Desafio concluído.</strong> {activeChallenge.rewardHint} Atualize o menu
                  (ícone ☰).
                </div>
              ) : null}
              {verifyFeedback === 'fail' ? (
                <div className="alert alert-warning small mb-0 py-2" role="status">
                  Ainda não está idêntico ao gabarito. Confira espaços, aspas e comentários da primeira
                  linha — ou use «Carregar modelo do desafio» e clique em Verificar de novo.
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button type="button" className="btn btn-primary" onClick={executar}>
          <i className="bi bi-play-fill me-1" aria-hidden />
          Executar código
        </button>
        <button type="button" className="btn btn-outline-danger" onClick={pararAnimacoes}>
          <i className="bi bi-stop-circle me-1" aria-hidden />
          Parar animações
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={limparTudo}>
          <i className="bi bi-eraser me-1" aria-hidden />
          Limpar
        </button>
      </div>

      <div className="card border border-primary border-opacity-25 rounded-4 shadow-sm mb-4 p-3 p-md-4">
        <CodarModePicker value={mode} onChange={setMode} idPrefix="practice" />
        <p className="small text-body-secondary mt-3 mb-2">
          {mode === 'ppt' ? (
            <>
              Exemplos alinhados ao <strong>jogo</strong>: objeto, regras, animação no palco e cores.
            </>
          ) : null}
          {mode === 'react' ? (
            <>
              Foco em <strong>componentes e estado</strong> (conceito). Carregue a dica no editor e
              compare com o objeto <code>aluno</code>.
            </>
          ) : null}
          {mode === 'vite' ? (
            <>
              Foco em <strong>terminal e npm</strong>. O snippet lembra os comandos; use os blocos
              copiáveis no guia acima.
            </>
          ) : null}
          {mode === 'bootstrap' ? (
            <>
              Foco em <strong>CSS</strong> na caixa do palco (como classes no seu layout). Restaure o
              CSS de exemplo ou experimente gradientes.
            </>
          ) : null}
        </p>
        <p className="small fw-semibold text-primary mb-2">Carregar no editor:</p>
        <div className="d-flex flex-wrap gap-2">
          {mode === 'ppt' ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('objeto')}
              >
                <i className="bi bi-braces me-1" aria-hidden />
                Objeto
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('ppt')}
              >
                <i className="bi bi-scissors me-1" aria-hidden />
                Pedra / papel / tesoura
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('mover')}
              >
                <i className="bi bi-arrows-move me-1" aria-hidden />
                Mover caixa
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('cores')}
              >
                <i className="bi bi-palette me-1" aria-hidden />
                Cores &amp; objeto
              </button>
            </>
          ) : null}
          {mode === 'react' ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('objeto')}
              >
                <i className="bi bi-braces me-1" aria-hidden />
                Objeto (base)
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary rounded-pill"
                onClick={() => {
                  carregarSnippet('reactDica')
                  irParaEditor()
                }}
              >
                <i className="bi bi-layers-fill me-1" aria-hidden />
                Dica React + “estado” simulado
              </button>
            </>
          ) : null}
          {mode === 'vite' ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-primary rounded-pill"
                onClick={() => {
                  carregarSnippet('viteDica')
                  irParaEditor()
                }}
              >
                <i className="bi bi-lightning-charge-fill me-1" aria-hidden />
                Lembrete Vite + npm
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('objeto')}
              >
                <i className="bi bi-braces me-1" aria-hidden />
                Objeto (extra)
              </button>
            </>
          ) : null}
          {mode === 'bootstrap' ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('cores')}
              >
                <i className="bi bi-palette me-1" aria-hidden />
                Cores &amp; gradiente na caixa
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-pill"
                onClick={() => setCssCode(CODAR_CSS_EXEMPLO)}
              >
                <i className="bi bi-arrow-counterclockwise me-1" aria-hidden />
                Restaurar CSS de exemplo
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => carregarSnippet('mover')}
              >
                <i className="bi bi-arrows-move me-1" aria-hidden />
                Animar caixa (ver efeito visual)
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div id="codar-editor-section" className="row g-4 scroll-margin-top">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-dark text-white py-2 px-3 d-flex align-items-center gap-2">
              <i className="bi bi-filetype-js" aria-hidden />
              <span className="small fw-bold">JavaScript</span>
            </div>
            <div className="card-body p-0">
              <textarea
                className="form-control font-monospace border-0 rounded-0 codar-editor"
                style={{ minHeight: '280px', fontSize: '0.85rem' }}
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                spellCheck={false}
                aria-label="Editor JavaScript"
              />
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-3">
            <div className="card-header py-2 px-3 d-flex align-items-center gap-2 bg-primary text-white">
              <i className="bi bi-css" aria-hidden />
              <span className="small fw-bold">CSS (na caixa do palco)</span>
            </div>
            <div className="card-body p-0">
              <textarea
                className="form-control font-monospace border-0 rounded-0 codar-editor"
                style={{ minHeight: '120px', fontSize: '0.85rem' }}
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                spellCheck={false}
                placeholder="border-radius: 16px; box-shadow: ..."
                aria-label="Editor CSS"
              />
            </div>
            <div className="card-footer small text-body-secondary py-2">
              <i className="bi bi-eye me-1 text-primary" aria-hidden />
              Atualiza o <strong>Palco</strong> ao vivo (seletor:{' '}
              <code>.codar-stage .codar-movable</code>). Evite fechar chaves <code>{'{}'}</code> a
              mais no meio do código.
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex flex-column gap-3">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden flex-grow-1">
            <div className="card-header py-2 px-3 bg-body-secondary d-flex align-items-center justify-content-between">
              <span className="small fw-bold text-primary d-flex align-items-center gap-2 flex-wrap">
                <span>
                  <i className="bi bi-display me-1" aria-hidden />
                  Palco
                </span>
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 fw-normal">
                  CSS ao vivo
                </span>
              </span>
              <span className="badge bg-white text-dark border">
                x:{Math.round(pos.x)}% y:{Math.round(pos.y)}%
              </span>
            </div>
            <div
              className="codar-stage position-relative overflow-hidden rounded-bottom"
              style={{
                background: stageBg,
                minHeight: '220px',
              }}
            >
              <div
                className="codar-movable position-absolute d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: '4.5rem',
                  height: '4.5rem',
                  transform: 'translate(-50%, -50%)',
                  background: boxBg,
                  transition: 'left 0.05s linear, top 0.05s linear, background 0.2s',
                }}
              >
                <span className="small px-1 text-center text-truncate" style={{ maxWidth: '100%' }}>
                  {boxText}
                </span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header py-2 px-3 bg-dark text-white d-flex align-items-center gap-2">
              <i className="bi bi-terminal" aria-hidden />
              <span className="small fw-bold">Saída (sala.log)</span>
            </div>
            <div className="card-body p-0">
              {runError ? (
                <div className="alert alert-danger rounded-0 border-0 mb-0 small" role="alert">
                  <strong>Erro:</strong> {runError}
                </div>
              ) : null}
              <pre
                className="mb-0 p-3 small font-monospace bg-body-secondary bg-opacity-25 codar-console"
                style={{ minHeight: '160px', maxHeight: '240px', overflow: 'auto' }}
              >
                {logs.length === 0 && !runError
                  ? '// Nada ainda. Clique em «Executar código» acima para rodar o JavaScript e ver sala.log() aqui.'
                  : logs.join('\n')}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
