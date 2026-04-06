/** Exemplos prontos para colar no editor da sala Codar. */

export const CODAR_SNIPPETS = {
  objeto: `// Objeto literal — treino de propriedades e método
const aluno = {
  nome: "Devyd",
  curso: "JavaScript",
  nivel: 1,
  estudar(horas) {
    this.nivel += horas;
    sala.log(this.nome + " estudou " + horas + "h. Nível:", this.nivel);
  }
};

aluno.estudar(2);
sala.log("Objeto completo:", JSON.stringify(aluno, null, 2));`,

  ppt: `// Pedra, papel, tesoura — objeto de regras + sorteio
const opcoes = ["pedra", "papel", "tesoura"];

const regras = {
  pedra:  { ganhaDe: "tesoura", perdeDe: "papel" },
  papel:  { ganhaDe: "pedra",  perdeDe: "tesoura" },
  tesoura:{ ganhaDe: "papel",  perdeDe: "pedra" }
};

function sortear() {
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}

const jogador = sortear();
const cpu = sortear();

sala.log("Você:", jogador, " | CPU:", cpu);

if (jogador === cpu) {
  sala.log("Resultado: empate!");
} else if (regras[jogador].ganhaDe === cpu) {
  sala.log("Resultado: você venceu!");
} else {
  sala.log("Resultado: CPU venceu!");
}`,

  mover: `// Mover a caixa no palco (use Parar animações antes de outro exemplo)
let x = 0;

sala.repetir(() => {
  x = (x + 4) % 92;
  sala.mover(x, 45);
}, 60);

sala.corCaixa("#2b50aa");
sala.textoNaCaixa("JS");
sala.log("Animação rodando… clique em Parar animações para encerrar.");`,

  cores: `// Cores e texto — experimente mudar os valores
sala.corPalco("#e8f0fe");
sala.corCaixa("linear-gradient(135deg, #667eea, #764ba2)");
sala.textoNaCaixa("Objeto");

const tema = {
  primaria: "#2b50aa",
  aviso: "#f7e018"
};

sala.log("Cores do tema:", tema);
sala.mover(30, 50);`,

  vazio: '',

  reactDica: `// --- React (lembrete) ---
// JSX e componentes NÃO rodam aqui no interpretador.
// Neste projeto: src/main.jsx monta <App />, telas em src/pages/*.jsx
// useState atualiza a tela quando o estado muda.
//
// Pratique objetos e lógica abaixo (igual um componente pensa nos dados):

const estado = { cliques: 0, nome: "Aluno" };

function simularClique() {
  estado.cliques += 1;
  sala.log(estado.nome + " clicou " + estado.cliques + " vez(es).");
}

simularClique();
simularClique();
sala.log("Objeto estado:", JSON.stringify(estado));`,

  viteDica: `// --- Vite + npm (lembrete) ---
// Estes comandos rodam no TERMINAL, não aqui:
//   npm create vite@latest meu-app -- --template react
//   cd meu-app
//   npm install
//   npm run dev
//
// Enquanto isso, pode brincar com números ou datas em JS:

const deps = { react: "^19", vite: "^8", bootstrap: "^5" };
sala.log("Exemplo de objeto package (fictício):", JSON.stringify(deps, null, 2));
sala.log("Dica: leia o painel acima e copie os comandos.");`,

  /** Gabarito do desafio «Cardápio» — deve coincidir byte a byte (após normalizar quebras de linha). */
  cardapioDesafio: `// Cardápio do restaurante — array de pratos + sala.log
const cardapio = [
  { tipo: "Entrada", nome: "Bruschetta al pomodoro", preco: 18 },
  { tipo: "Principal", nome: "Risoto de funghi", preco: 42 },
  { tipo: "Sobremesa", nome: "Tiramisù", preco: 22 }
];

sala.log("Restaurante Sabor & Cia");
cardapio.forEach((item) => {
  sala.log(item.tipo + ": " + item.nome + " — R$ " + item.preco);
});
sala.log("Itens no cardápio: " + cardapio.length);`,
}


export const CODAR_CSS_EXEMPLO = `border-radius: 20px;
box-shadow: 0 8px 24px rgba(43, 80, 170, 0.35);
border: 3px solid #fff;
`
