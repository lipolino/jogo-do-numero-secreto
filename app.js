//alert("Manipulando html através do java script");
let numerosSorteados = [];
let numeroLimite = 10000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
let menorChute = 1;
let maiorChute = 10000;

//Função com parâmetro (responsive voice consta na linha 7 do index.html - precisa se registrar no responsive voice para obter a API Key e colar no index.html)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10000");
}

exibirMensagemInicial();

//Função sem parâmetro e sem retorno
function verificarChute() {
    let chute = document.querySelector("input").value;
    tentativas++;
    console.log(tentativas);

    if (chute < 1 || chute > 10000) {
        alert("Número inválido! Escolha um número entre 1 e 10000.");
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
                maiorChute = chute;
                exibirTextoNaTela("h1","Errou!");
                exibirTextoNaTela("p", `O número está entre ${menorChute} a ${maiorChute}`);
                limparCampo();
        }   else {
                menorChute = chute;
                exibirTextoNaTela("h1","Errou!");
                exibirTextoNaTela("p", `O número está entre ${menorChute} a ${maiorChute}`);
                limparCampo();
        }
}

//Função com retorno ("includes" verifica se o numeroSorteado já está na lista, "push" adiciona item ao final da lista, "pop" remove o último item da lista).
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
    let quantidadeElementosLista = numerosSorteados.length;
    //console.log(numeroEscolhido);

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
    menorChute = 1;
    maiorChute = 10000;
    exibirMensagemInicial();
    console.log(tentativas);
    document.getElementById("reiniciar").setAttribute("disabled", true);
}   