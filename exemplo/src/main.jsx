/**
 * PONTO DE ENTRADA DO REACT (Vite).
 *
 * Roteiro sugerido para os alunos — abra os arquivos nesta ordem:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 1. main.jsx          → você está aqui: o que carrega antes do App.      │
 * │ 2. App.jsx           → troca cadastro/login sem react-router.           │
 * │ 3. pages/            → telas completas (JSX + estado do formulário).     │
 * │ 4. components/       → botões, campos, layout reutilizando Bootstrap.   │
 * │ 5. auth/mockSession  → simula “banco” em memória.                       │
 * │ 6. constants/        → textos e nomes de telas separados do visual.     │
 * │ 7. utils/            → CPF, senha, função de navegação mock.             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * CSS: primeiro o Bootstrap, depois os ícones, depois ajustes globais e o
 * tema BATMOTOR (cores da marca). Assim suas regras sobrescrevem com previsibilidade.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import './styles/batmotor-theme.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

