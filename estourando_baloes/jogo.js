var timerId = null; // variável que armazena a chada timeout
var bal_inte = null;
var bal_estou = "nenhum";

function iniciaJogo() {

	var url = window.location.search;

	var nivel_jogo = url.replace("?","");

	var tempo_segundos = 0;

	if (nivel_jogo ==1) {//1 fácil -> 120 segundos
		tempo_segundos = 120;
	}

	if (nivel_jogo ==2) {//2 normal -> 60 segundos
		tempo_segundos = 60;
	}

	if (nivel_jogo ==3) {//3 difícila -> 30 segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//quantidade de balões
	var qtde_baloes = 10;
	bal_inte = qtde_baloes;

	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);

}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); // para a execução da funçãpo settimeout
		game_ouver();
		return false;

	}

	document.getElementById('cronometro').innerHTML = segundos;
	
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_ouver(){
	alert("fim de jogo, você conseguiu estourar "+bal_estou+" balões de "+bal_inte+".");
	mudar_tela();
}

function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src ='imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){estourar(this); }

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	potuacao(-1);
}

function potuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	bal_estou = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}
		
function situacao_jogo(baloes_inteiros){
	if (baloes_inteiros ==0) {
		alert('Parabéns, você estourou todos os baloes');
		parar_jogo();
		mudar_tela();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function mudar_tela(){
	window.location.href = 'index.html';
}