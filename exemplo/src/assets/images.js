/**
 * Ponto ÚNICO para importar SVG do projeto.
 *
 * Por que existe?
 * - As páginas ficam em `src/pages/`. Os ficheiros gráficos ficam em `src/assets/`.
 * - Se cada página importar com um caminho ou nome diferente, aparecem erros do Vite
 *   (“Failed to resolve import …”).
 * - Aqui defines o nome real do ficheiro UMA vez; nas páginas importas só:
 *   `import { batmotorLogo, heroArt } from '../assets/images'`
 *
 * Se renomeares um SVG na pasta `assets/`, altera apenas este ficheiro.
 */
export { default as batmotorLogo } from './BATMOTORLogo.svg'
export { default as heroArt } from './imgPages.svg'
