// Está selecionando a classe responsável pelo Tela inicial do game.
let telaInicial = document.querySelector('.tela-inicial');

// Está selecionando o audio de fundo da tela inicial.
let audioInicio = document.querySelector('.inicio');

// Está selecionando o audio de fundo quando inicia o game.
let audioFundo = document.querySelector('.fundo');

// Está selecionando o audio de game over quando perde.
let audioGameOver = document.querySelector('.game-over');

// Está selecionando a div pai de todos os elementos.
let game = document.querySelector('.game');

// Está selecionando a classe imagens que contem todas as imagens do game.
let imagens = document.querySelector('.imagens');

// Está selecionando a classe responsável pelo Mario.
let mario = document.querySelector('.super-mario');

// Está selecionando a classe responsável pelo Cano verde.
let pipe = document.querySelector('.pipe-game');

// Está selecionando a imagem das nuvens.
let clouds = document.querySelector('.clouds-gamer');

// Responsável por aplicar um evento de clique ao clicar na tela inicial.
telaInicial.addEventListener('click', () => {
  // Irá fazer o game aparecer.
  game.style.position = 'relative';
  // Irá fazer a tela inicial sumir.
  telaInicial.style.display = 'none';
  // Irá fazer todas as imagens do jogo aparecer.
  imagens.style.display = 'flex';

  // Irá pausar a música de fundo da tela inicial.
  audioInicio.pause();
  // Irá iniciar a música de fundo do game.
  audioFundo.play();
})
  
// Está criando uma variável chamada marioJump em seguida atribuindo a ela uma função com arrow function sem um parâmetro.
let marioJump = () => {
  // Está selecionando o Mario e usando o Classlist para adicionar uma propriedade na classe do Mario no caso adicionando a classe jump-mario.
  // Tem o mesmo resultado do que usar o querySelector.
  mario.classList.add('jump-mario');

  // Está definindo um tempo com arrow function para zerar o pulo, para assim ser possível pular várias vezes e não apenas uma.
  // O setTimeout é disparado apos o tempo passado no segundo parâmetro. Nesse caso irá se executar a após passar 5 segundos.
  setTimeout(() => {
    // Está removendo a classe jump-mario da classe mario.
    mario.classList.remove('jump-mario');
    // Irá remover após 500ms que é o tempo que a animação do pulo dura.
  }, 500);
};

// O setInterval é disparado a cada intervalo de tempo passado no segundo parâmetro. No caso ele vai ficar executando esse intervalo a cada 10 milissegundos.
let loopGame = setInterval(() => {
  // Está armazenando no pipePosition o valor da posição Left do Pipe.
  let pipePosition = pipe.offsetLeft;
  let marioPosition = +window
    // Irá pegar o todo o componente do Mario.
    .getComputedStyle(mario)
    // Irá pegar a propriedade Bottom do Mario e limpar.
    .bottom.replace('px', '');

  // Se a posição do Pipe for maior ou menor que 120 e maior que 0 e a posição do Mario for menor que 60 ele vai executar o bloco de comandos.
  if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 60) {
    // Está removendo a Animation do estilo do Pipe. Obrigando ele a parar.
    pipe.style.animation = 'none';

    // Está modificado o Left do estilo do Pipe para a posição dele em PX.
    // Usado para fazer o Pipe parar no exato lugar da colisão com o Mario.
    pipe.style.left = `${pipePosition}px`;

    // Está removendo a Animation do estilo do Mario. Obrigando ele a parar.
    mario.style.animation = 'none';

    // Está modificado o Bottom do estilo do Mario para a posição dele em PX.
    // Usado para fazer o Mario parar no exato lugar da colisão com o Pipe.
    mario.style.bottom = `${marioPosition}px`;

    // Está trocando a imagem do Mario quando houver colisão.
    mario.src = "./assets/image/mario-game-over.png";

    // Está alterando no estilo do Mario o Width dele.
    mario.style.width = '60px';

    // Está alterando no estilo do Mario o marginLeft dele.
    mario.style.marginLeft = '55px';

    // Irá pausar o audio de fundo.
    audioFundo.pause();
    // Irá iniciar o audio de game over.
    audioGameOver.play();

    // Usado para limpar o intervalo, assim fazendo ele não executar mais.
    clearInterval(loopGame);

    // Função fimGame declarada sendo responsável por fazer a página recarregar.
    function fimGame() {
      // Irá executar uma ação depois de 5 segundos.
      setTimeout(() => {
        // Responsável por recarregar a página.
        location.reload()
      }, 5000);
    }

    // Está invocando a função fimGame.
    fimGame();
  }
}, 10);

// Está adicionando um evento, que recebe como parâmetro o primeiro é a tecla que vai ser apertada para realizar o evento e no segundo o que ele irá executar.
// Evento de clique.
document.addEventListener('click', marioJump);
// Evento de tecla.
document.addEventListener('keydown', marioJump);

