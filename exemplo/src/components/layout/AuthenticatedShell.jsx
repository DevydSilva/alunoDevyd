import { SCREENS } from '../../constants'
import { getMockUser } from '../../auth/mockSession'
import { useCodarUnlocks } from '../../hooks/useCodarUnlocks'
import { setPendingCodarChallenge } from '../../utils/codarUnlockStorage'

const DRAWER_ID = 'appNavDrawer'

/**
 * Layout da área após login: barra superior + menu gaveta (Bootstrap Offcanvas).
 */
export function AuthenticatedShell({ activeScreen, navigator, children }) {
  const user = getMockUser()
  const unlocks = useCodarUnlocks()

  function openJokenpoReward() {
    if (unlocks.jokenpo) navigator.goToJokenpo()
    else {
      setPendingCodarChallenge('jokenpo')
      navigator.goToCodar()
    }
  }

  function openCardapioReward() {
    if (unlocks.cardapio) navigator.goToCardapio()
    else {
      setPendingCodarChallenge('cardapio')
      navigator.goToCodar()
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
      <header className="bg-body border-bottom shadow-sm sticky-top">
        <div className="container-fluid px-3 py-2 d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center justify-content-center rounded-3"
            style={{ width: '2.75rem', height: '2.75rem' }}
            data-bs-toggle="offcanvas"
            data-bs-target={`#${DRAWER_ID}`}
            aria-controls={DRAWER_ID}
            aria-label="Abrir menu de navegação"
          >
            <i className="bi bi-list fs-4" aria-hidden />
          </button>

          <div className="flex-grow-1 min-w-0">
            <div className="small text-body-secondary text-uppercase fw-semibold">
              Paralela
            </div>
            {user?.fullName ? (
              <div className="fw-semibold text-body text-truncate">
                Olá, {user.fullName}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div
        className="offcanvas offcanvas-start bm-nav-drawer"
        tabIndex={-1}
        id={DRAWER_ID}
        aria-labelledby={`${DRAWER_ID}Label`}
      >
        <div className="offcanvas-header border-bottom">
          <h2 className="offcanvas-title h5 mb-0 text-primary fw-bold" id={`${DRAWER_ID}Label`}>
            Menu
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Fechar menu"
          />
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2 p-3">
          <p className="small text-body-secondary mb-2">
            Navegue entre as telas: Home, currículo, Codar, recompensas (Jokenpô e Cardápio), quiz e
            sair. Jokenpô e Cardápio abrem só após o desafio na Codar.
          </p>

          <nav className="d-flex flex-column gap-2" aria-label="Navegação principal">
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.HOME
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              onClick={navigator.goToHome}
            >
              <i className="bi bi-house-door-fill me-2" aria-hidden />
              Home
            </button>
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.CRIANDO_CURRICULO
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              onClick={navigator.goToCriandoCurriculo}
            >
              <i className="bi bi-file-earmark-person-fill me-2" aria-hidden />
              Criando o seu currículo
            </button>
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.USUARIO_CADASTRADO
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              onClick={navigator.goToUsuarioCadastrado}
            >
              <i className="bi bi-person-vcard-fill me-2" aria-hidden />
              Usuário cadastrado
            </button>
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.ATIVIDADE_AULA ? 'btn-primary' : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              onClick={navigator.goToAtividadeAula}
            >
              <i className="bi bi-patch-question-fill me-2" aria-hidden />
              Atividade de aula
            </button>
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.CODAR ? 'btn-primary' : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              onClick={navigator.goToCodar}
            >
              <i className="bi bi-code-slash me-2" aria-hidden />
              Codar
            </button>
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.JOKENPO ? 'btn-primary' : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              title={
                unlocks.jokenpo
                  ? undefined
                  : 'Desbloqueie na Sala Codar — desafio Pedra, papel e tesoura'
              }
              onClick={openJokenpoReward}
            >
              <i
                className={`bi ${unlocks.jokenpo ? 'bi-scissors' : 'bi-lock-fill'} me-2`}
                aria-hidden
              />
              Jokenpô (React)
              {!unlocks.jokenpo ? (
                <span className="d-block small opacity-75">Codar: desafio 1</span>
              ) : null}
            </button>
            <button
              type="button"
              className={`btn text-start py-3 rounded-3 ${
                activeScreen === SCREENS.CARDAPIO ? 'btn-primary' : 'btn-outline-primary'
              }`}
              data-bs-dismiss="offcanvas"
              title={
                unlocks.cardapio
                  ? undefined
                  : 'Desbloqueie na Sala Codar — desafio Cardápio de restaurante'
              }
              onClick={openCardapioReward}
            >
              <i
                className={`bi ${unlocks.cardapio ? 'bi-cup-hot-fill' : 'bi-lock-fill'} me-2`}
                aria-hidden
              />
              Cardápio (React)
              {!unlocks.cardapio ? (
                <span className="d-block small opacity-75">Codar: desafio 2</span>
              ) : null}
            </button>
          </nav>

          <hr className="my-2" />

          <button
            type="button"
            className="btn btn-outline-secondary text-start py-3 rounded-3"
            data-bs-dismiss="offcanvas"
            onClick={navigator.logout}
          >
            <i className="bi bi-box-arrow-right me-2" aria-hidden />
            Sair
          </button>
        </div>
      </div>

      <main className="flex-grow-1 container py-4">{children}</main>
    </div>
  )
}
