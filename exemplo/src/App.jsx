import { useMemo, useState } from 'react'
import { SCREENS } from './constants'
import { AuthenticatedShell } from './components'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { HomePage } from './pages/HomePage'
import { CriandoSeuCurriculoPage } from './pages/CriandoSeuCurriculoPage'
import { UsuarioCadastradoPage } from './pages/UsuarioCadastradoPage'
import { AtividadeDeAulaPage } from './pages/AtividadeDeAulaPage'
import { CodarPage } from './pages/CodarPage'
import { JokenpoPage } from './pages/JokenpoPage'
import { CardapioRestaurantePage } from './pages/CardapioRestaurantePage'
import { createAuthNavigator } from './utils/mockNavigation'

/**
 * Raiz da aplicação — “roteador manual” para o exemplo de aula.
 *
 * Por onde começar (para alunos):
 * 1) `main.jsx` — ordem dos imports de CSS/JS (Bootstrap, ícones, tema).
 * 2) Este arquivo — qual tela está visível (`screen`) e o banner após cadastro.
 * 3) `pages/RegisterPage.jsx` e `pages/LoginPage.jsx` — fluxo visual completo.
 * 4) `auth/mockSession.js` — onde o “usuário fictício” vive na memória e `apiLogin`/`apiRegister`.
 * 5) `components/` — peças reutilizáveis (campo, toggle, cartão, layout).
 *
 * Não usamos react-router de propósito: `useState(SCREENS.REGISTER)` deixa o
 * conceito de “tela ativa” explícito para quem está aprendendo.
 */
function App() {
  const [screen, setScreen] = useState(SCREENS.REGISTER)
  const [infoBanner, setInfoBanner] = useState('')

  const navigator = useMemo(
    () => createAuthNavigator(setScreen, { SCREENS }),
    [],
  )

  const isAppScreen =
    screen === SCREENS.HOME ||
    screen === SCREENS.CRIANDO_CURRICULO ||
    screen === SCREENS.USUARIO_CADASTRADO ||
    screen === SCREENS.ATIVIDADE_AULA ||
    screen === SCREENS.CODAR ||
    screen === SCREENS.JOKENPO ||
    screen === SCREENS.CARDAPIO

  return (
    <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
      {infoBanner && screen === SCREENS.LOGIN ? (
        <div
          className="alert alert-success rounded-0 border-0 mb-0 text-center small py-2"
          role="status"
        >
          <i className="bi bi-check-circle-fill me-2" aria-hidden />
          {infoBanner}
        </div>
      ) : null}

      <div className="flex-grow-1">
        {isAppScreen ? (
          <AuthenticatedShell activeScreen={screen} navigator={navigator}>
            {screen === SCREENS.HOME ? <HomePage /> : null}
            {screen === SCREENS.CRIANDO_CURRICULO ? (
              <CriandoSeuCurriculoPage />
            ) : null}
            {screen === SCREENS.USUARIO_CADASTRADO ? <UsuarioCadastradoPage /> : null}
            {screen === SCREENS.ATIVIDADE_AULA ? <AtividadeDeAulaPage /> : null}
            {screen === SCREENS.CODAR ? <CodarPage /> : null}
            {screen === SCREENS.JOKENPO ? <JokenpoPage /> : null}
            {screen === SCREENS.CARDAPIO ? <CardapioRestaurantePage /> : null}
          </AuthenticatedShell>
        ) : screen === SCREENS.REGISTER ? (
          <RegisterPage
            navigator={navigator}
            onRegistered={() =>
              setInfoBanner(
                'Cadastro de exemplo salvo na memória. Faça login com o mesmo CPF e senha.',
              )
            }
          />
        ) : screen === SCREENS.FORGOT_PASSWORD ? (
          <ForgotPasswordPage navigator={navigator} />
        ) : (
          <LoginPage navigator={navigator} />
        )}
      </div>
    </div>
  )
}

export default App

