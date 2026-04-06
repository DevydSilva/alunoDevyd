import { useCallback, useState } from 'react'
import { StudentScreenNote } from '../components'
import { CATEGORY_LABELS, QUIZ_MAX_SCORE, QUIZ_QUESTIONS } from './atividadeDeAula/quizData'
import {
  loadHighScore,
  matchesCodeAnswer,
  saveHighScore,
  saveLastScore,
} from './atividadeDeAula/quizLogic'

function categoryBadge(category) {
  const meta = CATEGORY_LABELS[category] || CATEGORY_LABELS.projeto
  return (
    <span
      className={`badge rounded-pill bg-${meta.color} d-inline-flex align-items-center gap-1 px-2 py-1`}
    >
      <i className={`bi ${meta.icon}`} aria-hidden />
      {meta.label}
    </span>
  )
}

function starsFromPercent(pct) {
  if (pct >= 90) return 3
  if (pct >= 60) return 2
  if (pct >= 40) return 1
  return 0
}

/**
 * Sala de perguntas e respostas — gamificação com pontuação e perguntas de código.
 */
export function AtividadeDeAulaPage() {
  const [phase, setPhase] = useState('playing')
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState(null)
  const [codeInput, setCodeInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [highScore, setHighScore] = useState(loadHighScore)
  const [beatRecord, setBeatRecord] = useState(false)

  const total = QUIZ_QUESTIONS.length
  const current = QUIZ_QUESTIONS[index]

  const resetQuiz = useCallback(() => {
    setPhase('playing')
    setIndex(0)
    setScore(0)
    setCorrectCount(0)
    setSelected(null)
    setCodeInput('')
    setFeedback(null)
    setStreak(0)
    setBestStreak(0)
    setHighScore(loadHighScore())
    setBeatRecord(false)
  }, [])

  const goNext = useCallback(() => {
    setFeedback(null)
    setSelected(null)
    setCodeInput('')
    if (index + 1 >= total) {
      const improved = saveHighScore(score)
      saveLastScore(score, QUIZ_MAX_SCORE, correctCount)
      setBeatRecord(improved)
      setHighScore(loadHighScore())
      setPhase('done')
      return
    }
    setIndex((i) => i + 1)
  }, [index, total, score, correctCount])

  const submitChoice = useCallback(() => {
    if (!current || current.type !== 'choice' || selected === null || feedback) return
    const ok = selected === current.correctIndex
    if (ok) {
      setScore((s) => s + current.points)
      setCorrectCount((c) => c + 1)
      setStreak((st) => {
        const n = st + 1
        setBestStreak((b) => Math.max(b, n))
        return n
      })
    } else {
      setStreak(0)
    }
    setFeedback({ ok, type: 'choice' })
  }, [current, selected, feedback])

  const submitCode = useCallback(() => {
    if (!current || current.type !== 'code' || feedback) return
    const ok = matchesCodeAnswer(codeInput, current.acceptableAnswers)
    if (ok) {
      setScore((s) => s + current.points)
      setCorrectCount((c) => c + 1)
      setStreak((st) => {
        const n = st + 1
        setBestStreak((b) => Math.max(b, n))
        return n
      })
    } else {
      setStreak(0)
    }
    setFeedback({ ok, type: 'code' })
  }, [current, codeInput, feedback])

  if (phase === 'done') {
    const pct = Math.round((score / QUIZ_MAX_SCORE) * 100)
    const stars = starsFromPercent(pct)
    return (
      <div className="bm-quiz-end mx-auto" style={{ maxWidth: '36rem' }}>
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden text-center">
          <div className="card-header bm-cv-form-card-header text-white py-4">
            <i className="bi bi-trophy-fill display-4 d-block mb-2" aria-hidden />
            <h1 className="h4 mb-0">Fim da atividade!</h1>
          </div>
          <div className="card-body p-4 p-md-5">
            <p className="lead text-primary fw-bold mb-1">{score}</p>
            <p className="text-body-secondary small mb-3">
              pontos de {QUIZ_MAX_SCORE} possíveis ({pct}%)
            </p>
            <p className="mb-2">
              Acertos: <strong>{correctCount}</strong> de {total} perguntas
            </p>
            <div className="text-warning fs-2 mb-3" aria-hidden>
              {[0, 1, 2].map((i) => (
                <i
                  key={i}
                  className={`bi ${i < stars ? 'bi-star-fill' : 'bi-star'} me-1`}
                />
              ))}
            </div>
            {beatRecord ? (
              <p className="alert alert-success py-2 small">
                <i className="bi bi-record-circle me-1" aria-hidden />
                Novo recorde neste navegador!
              </p>
            ) : (
              <p className="small text-body-secondary">
                Recorde salvo: <strong>{highScore}</strong> pts
              </p>
            )}
            {bestStreak > 1 ? (
              <p className="small text-body-secondary mb-4">
                Maior sequência: <strong>{bestStreak}</strong> acertos seguidos
              </p>
            ) : (
              <div className="mb-4" />
            )}
            <button type="button" className="btn btn-primary btn-lg rounded-pill px-4" onClick={resetQuiz}>
              <i className="bi bi-arrow-counterclockwise me-2" aria-hidden />
              Jogar de novo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bm-quiz-page pb-5">
      <StudentScreenNote title="Atividade de aula — modo jogo">
        <p className="mb-2">
          Responda às perguntas sobre <strong>este projeto</strong>, <strong>JavaScript</strong>,{' '}
          <strong>React</strong>, <strong>Vite</strong> e <strong>Bootstrap</strong>. Cada acerto
          soma <strong>pontos</strong>. Nas de <strong>código</strong>, digite a resposta (sem
          aspas; maiúsculas/minúsculas ignoradas).
        </p>
        <p className="mb-0 small">
          O recorde fica no <code>localStorage</code> deste navegador — só para motivação, não é
          prova oficial.
        </p>
      </StudentScreenNote>

      <div className="row g-4 mt-1 align-items-start">
        <div className="col-lg-8 order-2 order-lg-1">
          <div className="card border-0 shadow rounded-4 overflow-hidden bm-quiz-question-card">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                {categoryBadge(current.category)}
                <span className="badge bg-dark bg-opacity-10 text-dark">
                  Pergunta {index + 1} / {total}
                </span>
              </div>

              <h2 className="h5 fw-bold text-body mb-4">{current.question}</h2>

              {current.type === 'choice' ? (
                <div className="d-grid gap-2" role="radiogroup" aria-label="Alternativas">
                  {current.options.map((opt, i) => {
                    const isSel = selected === i
                    let variant = 'outline-primary'
                    if (feedback) {
                      if (i === current.correctIndex) variant = 'success'
                      else if (isSel && !feedback.ok) variant = 'danger'
                      else variant = 'outline-secondary'
                    } else if (isSel) {
                      variant = 'primary'
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={Boolean(feedback)}
                        className={`btn btn-lg text-start py-3 rounded-3 btn-${variant}`}
                        onClick={() => !feedback && setSelected(i)}
                        aria-pressed={isSel}
                      >
                        <span className="badge bg-body-secondary text-dark me-2">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div>
                  {current.codePrompt ? (
                    <pre className="bg-dark text-light p-3 rounded-3 small mb-3 overflow-x-auto">
                      <code>{current.codePrompt}</code>
                    </pre>
                  ) : null}
                  <label className="form-label fw-semibold" htmlFor="quiz-code-input">
                    Sua resposta
                  </label>
                  <input
                    id="quiz-code-input"
                    type="text"
                    className="form-control form-control-lg font-monospace mb-2"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    disabled={Boolean(feedback)}
                    placeholder="Digite aqui…"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {current.hint && !feedback ? (
                    <p className="small text-body-secondary mb-0">
                      <i className="bi bi-lightbulb me-1" aria-hidden />
                      {current.hint}
                    </p>
                  ) : null}
                </div>
              )}

              {feedback ? (
                <div
                  className={`alert mt-4 mb-0 d-flex gap-2 ${feedback.ok ? 'alert-success' : 'alert-danger'}`}
                  role="status"
                >
                  <i
                    className={`bi fs-4 ${feedback.ok ? 'bi-hand-thumbs-up-fill' : 'bi-x-octagon-fill'}`}
                    aria-hidden
                  />
                  <div>
                    <strong>{feedback.ok ? 'Acertou!' : 'Ops, não foi dessa vez.'}</strong>
                    <p className="small mb-2 mt-1">{current.explanation}</p>
                    {!feedback.ok && current.type === 'code' ? (
                      <p className="small mb-0 font-monospace">
                        Aceito: {current.acceptableAnswers.join(' · ')}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="d-flex flex-wrap gap-2 mt-4">
                {current.type === 'choice' ? (
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill px-4"
                    disabled={selected === null || feedback}
                    onClick={submitChoice}
                  >
                    <i className="bi bi-check2-circle me-2" aria-hidden />
                    Confirmar resposta
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill px-4"
                    disabled={!codeInput.trim() || feedback}
                    onClick={submitCode}
                  >
                    <i className="bi bi-keyboard me-2" aria-hidden />
                    Verificar código
                  </button>
                )}
                {feedback ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-pill px-4"
                    onClick={goNext}
                  >
                    {index + 1 >= total ? 'Ver resultado' : 'Próxima pergunta'}
                    <i className="bi bi-arrow-right ms-2" aria-hidden />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 order-1 order-lg-2">
          <div className="card border-0 shadow-sm rounded-4 sticky-lg-top bm-quiz-hud" style={{ top: '5.5rem' }}>
            <div className="card-body p-4">
              <h3 className="h6 text-uppercase text-body-secondary fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-controller" aria-hidden />
                Painel do jogo
              </h3>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small text-body-secondary">Pontuação</span>
                <span className="fs-4 fw-bold text-primary">{score}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small text-body-secondary">Recorde</span>
                <span className="fw-semibold">{highScore} pts</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small text-body-secondary">Sequência</span>
                <span className="badge bg-warning text-dark">
                  <i className="bi bi-fire me-1" aria-hidden />
                  {streak}
                </span>
              </div>
              <div className="progress rounded-pill mb-2" style={{ height: '10px' }}>
                <div
                  className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${Math.min(100, ((index + (feedback ? 1 : 0)) / total) * 100)}%` }}
                  aria-valuenow={index + 1}
                  aria-valuemin={0}
                  aria-valuemax={total}
                />
              </div>
              <p className="small text-body-secondary mb-0 text-center">
                {index + 1} de {total} • máx. {QUIZ_MAX_SCORE} pts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
