/**
 * Home — primeira tela após login: carrossel, alertas e cards para a aula.
 */
const BANNER_CAROUSEL_ID = 'homeBannerCarousel'
const ALERTS_CAROUSEL_ID = 'homeAlertsCarousel'

export function HomePage() {
  return (
    <div className="home-page pb-4">
      {/* Banner principal — carrossel */}
      <div
        id={BANNER_CAROUSEL_ID}
        className="carousel slide carousel-fade shadow rounded-4 overflow-hidden mb-4"
        data-bs-ride="carousel"
        data-bs-interval="6000"
        data-bs-pause="hover"
      >
        <div className="carousel-indicators mb-0">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              data-bs-target={`#${BANNER_CAROUSEL_ID}`}
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="bm-home-banner-slide d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 text-white bg-primary p-4 p-md-5">
              <i className="bi bi-mortarboard-fill bm-home-banner-icon" aria-hidden />
              <div className="text-center text-md-start">
                <h1 className="h3 fw-bold mb-2">Bem-vindo à disciplina</h1>
                <p className="mb-0 opacity-90 lead fs-6">
                  Atividade de <strong>lógica de programação em JavaScript</strong> com o{' '}
                  <strong>Professor Roque</strong> e o aluno <strong>Devyd Silva de Santana</strong>,{' '}
                  <strong>Faculdade Estácio</strong>. Início em <strong>04/03/2019</strong>.
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="bm-home-banner-slide d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 text-white bm-home-slide-accent p-4 p-md-5">
              <i className="bi bi-lightning-charge-fill bm-home-banner-icon" aria-hidden />
              <div className="text-center text-md-start">
                <h2 className="h4 fw-bold mb-2">Stack do projeto</h2>
                <p className="mb-0 opacity-90">
                  Você está vendo um app em <strong>React</strong> montado com <strong>Vite</strong>,{' '}
                  interface com <strong>Bootstrap 5</strong> e ícones <strong>Bootstrap Icons</strong>.
                  Explore o código em <code className="text-warning">src/</code> com calma.
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="bm-home-banner-slide d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 bg-dark text-white p-4 p-md-5">
              <i className="bi bi-database-slash bm-home-banner-icon" aria-hidden />
              <div className="text-center text-md-start">
                <h2 className="h4 fw-bold mb-2">Cadastro e login (demo)</h2>
                <p className="mb-0 opacity-90">
                  Os dados do cadastro ficam na variável <code className="text-info">mockUser</code> em{' '}
                  <code className="text-info">mockSession.js</code> — só na memória até você dar{' '}
                  <strong>F5</strong>. No menu, abra <strong>Usuário cadastrado</strong> para ver o
                  objeto ao vivo.
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="bm-home-banner-slide d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 text-dark bg-warning bg-opacity-25 border border-warning border-opacity-50 p-4 p-md-5">
              <i className="bi bi-moon-stars-fill bm-home-banner-icon text-warning" aria-hidden />
              <div className="text-center text-md-start">
                <h2 className="h4 fw-bold mb-2 text-primary">Antes de encerrar o estudo</h2>
                <p className="mb-0 text-body">
                  Salve o <strong>currículo</strong> na tela correspondente, revise o{' '}
                  <strong>guia para alunos</strong> e anote dúvidas para a próxima aula. Bons
                  estudos — descanse bem depois de praticar!
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${BANNER_CAROUSEL_ID}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${BANNER_CAROUSEL_ID}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden />
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>

      {/* Carrossel de alertas / avisos rápidos */}
      <h2 className="h5 fw-bold text-primary mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-bell-fill" aria-hidden />
        Avisos e lembretes
      </h2>
      <div
        id={ALERTS_CAROUSEL_ID}
        className="carousel slide mb-4"
        data-bs-ride="carousel"
        data-bs-interval="8000"
        data-bs-pause="hover"
      >
        <div className="carousel-inner rounded-4 overflow-hidden shadow-sm">
          <div className="carousel-item active">
            <div className="alert alert-primary d-flex align-items-start gap-3 mb-0 rounded-0 border-0 py-4 px-4" role="alert">
              <i className="bi bi-info-circle-fill fs-3 flex-shrink-0" aria-hidden />
              <div>
                <strong className="d-block mb-1">Dica de navegação</strong>
                Use o menu <strong>Paralela</strong> (ícone ☰) para ir ao currículo, aos dados do
                cadastro em memória ou voltar a esta Home.
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="alert alert-warning d-flex align-items-start gap-3 mb-0 rounded-0 border-0 py-4 px-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill fs-3 flex-shrink-0" aria-hidden />
              <div>
                <strong className="d-block mb-1">Atenção</strong>
                A senha do exemplo aparece só na tela <strong>Usuário cadastrado</strong> para aula.
                Em sistemas reais use <strong>hash</strong> no servidor e nunca exiba senha em texto
                puro.
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="alert alert-success d-flex align-items-start gap-3 mb-0 rounded-0 border-0 py-4 px-4" role="alert">
              <i className="bi bi-check-circle-fill fs-3 flex-shrink-0" aria-hidden />
              <div>
                <strong className="d-block mb-1">Currículo salvo localmente</strong>
                O formulário de currículo usa <code>localStorage</code> ao clicar em{' '}
                <strong>Salvar</strong>. Os dados do <strong>login</strong> não ficam lá — só na
                memória do <code>mockSession</code>.
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-pill px-3"
            data-bs-target={`#${ALERTS_CAROUSEL_ID}`}
            data-bs-slide="prev"
            aria-label="Aviso anterior"
          >
            <i className="bi bi-chevron-left" aria-hidden />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-pill px-3"
            data-bs-target={`#${ALERTS_CAROUSEL_ID}`}
            data-bs-slide="next"
            aria-label="Próximo aviso"
          >
            <i className="bi bi-chevron-right" aria-hidden />
          </button>
        </div>
      </div>

      {/* Cards informativos */}
      <h2 className="h5 fw-bold text-primary mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-grid-1x2-fill" aria-hidden />
        Atalhos do que estudar
      </h2>
      <div className="row g-3">
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm rounded-4 bm-home-feature-card">
            <div className="card-body p-4">
              <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-inline-flex p-3 mb-3">
                <i className="bi bi-person-plus-fill fs-2" aria-hidden />
              </div>
              <h3 className="h6 fw-bold text-primary">Cadastro &amp; login</h3>
              <p className="small text-body-secondary mb-0">
                Fluxo em <code>RegisterPage</code> e <code>LoginPage</code>, com{' '}
                <code>apiRegister</code> e <code>apiLogin</code> simulando API.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm rounded-4 bm-home-feature-card">
            <div className="card-body p-4">
              <div className="rounded-3 bg-success bg-opacity-10 text-success d-inline-flex p-3 mb-3">
                <i className="bi bi-file-earmark-person-fill fs-2" aria-hidden />
              </div>
              <h3 className="h6 fw-bold text-primary">Currículo</h3>
              <p className="small text-body-secondary mb-0">
                Formulário completo, fonte, alinhamento do nome, impressão e{' '}
                <code>localStorage</code>.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm rounded-4 bm-home-feature-card">
            <div className="card-body p-4">
              <div className="rounded-3 bg-info bg-opacity-10 text-info d-inline-flex p-3 mb-3">
                <i className="bi bi-eye-fill fs-2" aria-hidden />
              </div>
              <h3 className="h6 fw-bold text-primary">Ver usuário</h3>
              <p className="small text-body-secondary mb-0">
                Tela <strong>Usuário cadastrado</strong> mostra o objeto <code>mockUser</code> após o
                cadastro.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm rounded-4 bm-home-feature-card">
            <div className="card-body p-4">
              <div className="rounded-3 bg-danger bg-opacity-10 text-danger d-inline-flex p-3 mb-3">
                <i className="bi bi-patch-question-fill fs-2" aria-hidden />
              </div>
              <h3 className="h6 fw-bold text-primary">Atividade do aluno</h3>
              <p className="small text-body-secondary mb-0">
                <strong>Quiz gamificado</strong> com pontuação, múltipla escolha e perguntas para{' '}
                <strong>digitar código</strong> sobre JS, React, Vite e Bootstrap. Abra no menu{' '}
                <strong>Paralela</strong> → <strong>Atividade de aula</strong>.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm rounded-4 bm-home-feature-card">
            <div className="card-body p-4">
              <div className="rounded-3 bg-dark bg-opacity-10 text-dark d-inline-flex p-3 mb-3">
                <i className="bi bi-code-slash fs-2" aria-hidden />
              </div>
              <h3 className="h6 fw-bold text-primary">Sala Codar</h3>
              <p className="small text-body-secondary mb-0">
                Laboratório para <strong>escrever JavaScript</strong>, ver <code>sala.log</code>,{' '}
                mexer na caixa com <strong>objetos</strong>, <strong>pedra-papel-tesoura</strong> de
                exemplo e estilizar com <strong>CSS</strong>. Menu <strong>Paralela</strong> →{' '}
                <strong>Codar</strong>.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm rounded-4 bm-home-feature-card">
            <div className="card-body p-4">
              <div className="rounded-3 bg-warning bg-opacity-10 text-warning d-inline-flex p-3 mb-3">
                <i className="bi bi-journal-text fs-2" aria-hidden />
              </div>
              <h3 className="h6 fw-bold text-primary">Documentação</h3>
              <p className="small text-body-secondary mb-0">
                Leia <code>GUIA-PARA-ALUNOS.md</code> na raiz do projeto para a ordem sugerida de
                estudo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
