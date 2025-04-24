//alert("Manipulando html através do java script");
let numerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

//Função com parâmetro (responsive voice consta na linha 7 do index.html - precisa se registrar no responsive voice para obter a API Key e colar no index.html)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 1000");
}

exibirMensagemInicial();

//Função sem parâmetro e sem retorno
function verificarChute() {
    let chute = document.querySelector("input").value;
    tentativas++;
    console.log(tentativas);

    if (chute < 1 || chute > 1000) {
        alert("Número inválido! Escolha um número entre 1 e 1000.");
        tentativas--;
    }
    else
        if (chute == numeroSecreto) {
            exibirTextoNaTela("h1", "Parabéns!");
            exibirTextoNaTela("p", tentativas == 1 ? `Você descobriu o número secreto com ${tentativas} tentativa!` : `Você descobriu o número secreto com ${tentativas} tentativas!`);
            document.getElementById("reiniciar").removeAttribute("disabled");
            document.getElementById("chutar").setAttribute("disabled", "");
        } else 
            if (chute > numeroSecreto) {
                exibirTextoNaTela("h1","Errou!");
                exibirTextoNaTela("p", `O número é menor que ${chute}`);
                limparCampo();
        }   else {
                exibirTextoNaTela("h1","Errou!");
                exibirTextoNaTela("p", `O número é maior que ${chute}`);
                limparCampo();
        }
    //true ou false no console (Conta no console quantas vezes o chute foi acertado ou errado)
    //console.log(chute == numeroSecreto);
}

//Função com retorno ("includes" verifica se o numeroSorteado já está na lista, "push" adiciona item ao final da lista, "pop" remove o último item da lista).
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
    let quantidadeElementosLista = numerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite) {
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }  else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    document.getElementById("chutar").removeAttribute("disabled");
    alert(`Números Sorteados: ${numerosSorteados}`);
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    console.log(tentativas);
    document.getElementById("reiniciar").setAttribute("disabled", true);
}   
