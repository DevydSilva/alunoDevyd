import { StudentScreenNote } from '../components'

const RESTAURANTE = 'Restaurante Sabor & Cia'

const SEÇÕES = [
  {
    titulo: 'Entradas',
    itens: [{ nome: 'Bruschetta al pomodoro', preco: 18, descricao: 'Tomate fresco, manjericão e azeite extra virgem.' }],
  },
  {
    titulo: 'Pratos principais',
    itens: [{ nome: 'Risoto de funghi', preco: 42, descricao: 'Arroz cremoso, cogumelos e parmesão.' }],
  },
  {
    titulo: 'Sobremesas',
    itens: [{ nome: 'Tiramisù', preco: 22, descricao: 'Clássico italiano com café e mascarpone.' }],
  },
]

/**
 * Página web do cardápio (React + Bootstrap) — recompensa do desafio 2 na Sala Codar.
 * Os dados espelham o gabarito `cardapioDesafio` em `snippets.js`.
 */
export function CardapioRestaurantePage() {
  return (
    <div className="cardapio-page pb-5">
      <StudentScreenNote title="Cardápio em React">
        <p className="mb-0 small">
          Esta página é a versão <strong>visual</strong> do que você estruturou em JavaScript na Codar
          (array de objetos + laço). O mesmo restaurante e pratos aparecem aqui em componentes React.
        </p>
      </StudentScreenNote>

      <header className="text-center py-5 px-3 rounded-4 bg-dark text-white mt-4 mb-4 shadow">
        <p className="text-white-50 text-uppercase small mb-1 letter-spacing-1">Cardápio digital</p>
        <h1 className="display-5 fw-bold mb-0">{RESTAURANTE}</h1>
      </header>

      <div className="row g-4">
        {SEÇÕES.map((sec) => (
          <div key={sec.titulo} className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-primary text-white py-3 border-0">
                <h2 className="h5 mb-0 fw-bold">{sec.titulo}</h2>
              </div>
              <ul className="list-group list-group-flush">
                {sec.itens.map((item) => (
                  <li key={item.nome} className="list-group-item px-4 py-3">
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                      <span className="fw-semibold">{item.nome}</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 fs-6">
                        R$ {item.preco.toFixed(0)}
                      </span>
                    </div>
                    <p className="small text-body-secondary mb-0">{item.descricao}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center small text-body-secondary mt-4 mb-0">
        Total de itens no cardápio: {SEÇÕES.reduce((n, s) => n + s.itens.length, 0)}
      </p>
    </div>
  )
}
