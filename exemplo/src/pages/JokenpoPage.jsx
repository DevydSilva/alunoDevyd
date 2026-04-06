import { useCallback, useEffect, useRef, useState } from 'react'
import { StudentScreenNote } from '../components'
import './JokenpoPage.css'

const CHOICES = [
  { id: 1, emoji: '🪨', label: 'Pedra' },
  { id: 2, emoji: '📄', label: 'Papel' },
  { id: 3, emoji: '✂️', label: 'Tesoura' },
]

function sortear(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 0 empate, 1 jogador, 2 computador */
function calcularEscolha(jogador, computador) {
  if (jogador === 1 && computador === 1) return 0
  if (jogador === 1 && computador === 2) return 2
  if (jogador === 1 && computador === 3) return 1
  if (jogador === 2 && computador === 1) return 1
  if (jogador === 2 && computador === 2) return 0
  if (jogador === 2 && computador === 3) return 2
  if (jogador === 3 && computador === 1) return 2
  if (jogador === 3 && computador === 2) return 1
  if (jogador === 3 && computador === 3) return 0
  return 0
}

/**
 * Jokenpô — mesma lógica do script.js original, em React (estado + JSX).
 * Imagens foram trocadas por emoji para não depender de arquivos em /public/img.
 */
export function JokenpoPage() {
  const [jogadorNome, setJogadorNome] = useState('')
  const [jogadorPontos, setJogadorPontos] = useState(0)
  const [computadorPontos, setComputadorPontos] = useState(0)
  const [mensagem, setMensagem] = useState('Carregando…')
  const [selJogador, setSelJogador] = useState(null)
  const [selComputador, setSelComputador] = useState(null)

  const timeoutRef = useRef(null)

  useEffect(() => {
    const id = window.setTimeout(() => {
      const nome = window.prompt('Qual é o seu nome?')?.trim()
      const finalNome = nome && nome.length > 0 ? nome : 'Devyd'
      setJogadorNome(finalNome)
      setMensagem(
        `Bem vindo ${finalNome} está preparado? Escolha uma opção acima...`,
      )
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    },
    [],
  )

  const jogar = useCallback(
    (escolha) => {
      if (!jogadorNome) return
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)

      const jogadorEscolha = escolha
      const computadorEscolha = sortear(1, 3)

      setSelJogador(jogadorEscolha)
      setSelComputador(computadorEscolha)

      const ganhador = calcularEscolha(jogadorEscolha, computadorEscolha)

      if (ganhador === 0) {
        setMensagem('Empate')
      } else if (ganhador === 1) {
        setMensagem(`Ponto para ${jogadorNome}`)
        setJogadorPontos((p) => p + 1)
      } else {
        setMensagem('Ponto para o Computador')
        setComputadorPontos((p) => p + 1)
      }

      timeoutRef.current = window.setTimeout(() => {
        setSelJogador(null)
        setSelComputador(null)
        setMensagem(`${jogadorNome} escolha uma opção acima...`)
        timeoutRef.current = null
      }, 3500)
    },
    [jogadorNome],
  )

  return (
    <div>
      <StudentScreenNote title="Jokenpô em React">
        <p className="mb-0 small">
          Esta tela é a versão <strong>React + Vite</strong> do seu HTML/CSS/JS. A lógica de
          pontuação é a mesma do <code>script.js</code>. Na <strong>Sala Codar</strong>, o aluno
          pratica a mesma ideia com <code>sala.log()</code> e objetos — aqui você vê o jogo completo
          na interface.
        </p>
      </StudentScreenNote>

      <div className="jokenpo-page mt-4">
        <h1 id="titulo">Pedra, papel e tesoura</h1>

        <div id="placar">
          <div id="jogador">
            <h2 id="jogador-nome">{jogadorNome || '…'}</h2>
            <span id="jogador-pontos">{jogadorPontos}</span>
            <ul id="jogador-escolha">
              {CHOICES.map(({ id, emoji, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`jokenpo-choice${selJogador === id ? ' selecionado' : ''}`}
                    id={`jogador-escolha-${id}`}
                    aria-label={`Jogador: ${label}`}
                    disabled={!jogadorNome}
                    onClick={() => jogar(id)}
                  >
                    <span className="jokenpo-emoji" aria-hidden>
                      {emoji}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div id="versus" aria-hidden>
            VS
          </div>

          <div id="computador">
            <h2 id="computador-nome">Computador</h2>
            <span id="computador-pontos">{computadorPontos}</span>
            <ul id="computador-escolha">
              {CHOICES.map(({ id, emoji, label }) => (
                <li key={id}>
                  <span
                    className={`jokenpo-choice${selComputador === id ? ' selecionado' : ''}`}
                    id={`computador-escolha-${id}`}
                    aria-label={`Computador: ${label} (só indica a jogada)`}
                    role="img"
                  >
                    <span className="jokenpo-emoji" aria-hidden>
                      {emoji}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="mensagem" role="status" aria-live="polite">
          {mensagem}
        </div>
      </div>
    </div>
  )
}
