	/*

		iniciaJogo()
		   - cria_baloes()		-> cria os balões
		   - contagem_tempo()		-> inicia cronômetro

		cria_baloes()
			Não esquecer evento "onclick" nos balões

		estourar() - função que é acionada em eventos "onclick"
			- pontuacao()		-> sempre que estourar um balão tem que dar a pontuação do mesmo

		pontuacao()
			- situacao_jogo()		-> sempre que pontuar tem que checar se tem balões restantes, em caso negativo tem que parar o cronômetro e o jogo

		situação_jogo()
			- [if] parar_jogo()

		contagem_tempo()
			setTimeout 			-> função JavaScript que da um timeout na hora de chemar uma função

		game_over()
			- remove_eventos_baloes() 		-> se o tempo acabar não pode mais pontuar clicando nos balões

		parar_jogo()
			clearTimeout		-> para o cronômetro

		remove_eventos_baloes()


	*/





var timerId = null; //variável que armazena a chamada da função 'setTimeOut()'


//Função que inica o jogo e que é chamada assim que o body é carregado
function iniciaJogo(){
	var url = window.location.search;
	var nivel_jogo = url.replace("?" , "");

	var tempo_segundos = 0; //Variável que irá armazenar o tempo em segundos que terá para completar a partida
	
	if(nivel_jogo == 1){ //Fácil - Nível 1 - 120 segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2){ //Normal / Médio - Nível 2 - 60 segundos
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3){ //Difícil - Nível 3 - 30 segundos
		tempo_segundos = 30;
	}

	//Inserindo os segundos no span do cronômetro:
	document.getElementById('tempo_cronometro').innerHTML = tempo_segundos;

	//Quantidade de balões:
	var qtd_baloes = 80; //Podemos alterar quantos balões serão exibidos/terão o jogo.

	//Imprimir total de balões inteiros no span de balões inteiros:
	document.getElementById("total_baloes_inteiros").innerHTML = qtd_baloes;
	//Imprimir total de balões estourados no span de balões estourados:
	document.getElementById("total_baloes_estourados").innerHTML = 0;


	cria_baloes(qtd_baloes); //Chama a função que cria os balões do jogo com a quantidade balões que queremos que seja criada

	contagem_tempo(tempo_segundos); //Chama a função que realiza a contagem do tempo/cronômetro do jogo e que é iniciada assim que criamos os balões do jogo


}

function cria_baloes(qtd_baloes){
	for(var i = 0; i < qtd_baloes; i++){
		var balao = document.createElement("img");
		balao.src = "imagens/balao_azul_pequeno.png"; 
		balao.style.margin = "10px";
		balao.id = "balao" + (i + 1);
		balao.onclick = function(){ estourar(this); } //para tag "img" criada é adicionado evento "onclick", pois o clique representa um balão estourado.

		document.getElementById("cenario").appendChild(balao); //Na div do "id=cenario" é adicionada a cada iteração como "filhos/apêndices" as tags "imgs" de balão criada
	}
}


function estourar(balao){ //Essa função será executada se houver um evento "onclick" em um balão
	var id_balao = balao.id;
	document.getElementById(id_balao).setAttribute("onclick" , ""); //Após clicar e estourar um balão, não é possível clicar nele novamente
	document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";
	pontuacao(-1); //-1 representa um balão a menos/estourado

}

function pontuacao(acao_clique){
	var baloes_inteiros = document.getElementById("total_baloes_inteiros").innerHTML;
	var baloes_estourados = document.getElementById("total_baloes_estourados").innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados); 

	baloes_inteiros = baloes_inteiros + acao_clique; // -1 balão inteiro
	baloes_estourados = baloes_estourados - acao_clique; // +1 balão estourado

	document.getElementById("total_baloes_inteiros").innerHTML = baloes_inteiros; //Atualizamos o valor do contador de balões inteiros
	document.getElementById("total_baloes_estourados").innerHTML = baloes_estourados; //Atualizamos o valor do contador de balões estourados

	situacao_jogo(baloes_inteiros); //Chamamos a função "situacao_jogo(...)" que irá checar se o jogo deve continuar (ganhou ou não) baseado na quantidade de balões inteiros
}


function situacao_jogo(baloes_inteiros){

	if (baloes_inteiros == 0) {
		alert("Parabéns, você conseguiu estourar todos os balões a tempo!");
		parar_jogo(); //Como ganhou o jogo, a função "parar_jogo()" para o cronômetro
	}
}

function contagem_tempo(segundos){ //Recebe o tempo máximo de cronômetro da partida do jogo de acordo com o level de dificuldade

	if (segundos == -1) { //Se o cronômetro zerou/tempo de jogo acabou
		clearTimeout(timerId);	//Para o cronomêtro
		game_over(); //Chama a função "game_over()" pois o cronômetro zerou/o tempo acabou, logo perdeu o jogo (game over)
		return false; //Para parar toda a execução
	}

	document.getElementById("tempo_cronometro").innerHTML = segundos;

	segundos = segundos - 1; //Reduzimos 1 do tempo restante

	timerId = setTimeout("contagem_tempo("+segundos+")" , 1000);
}

function game_over(){ //Função de quando perder o jogo (Game Over)
	remove_eventos_baloes(); //Quando perde o jogo não pode mais clicar nos balões e assim pontuar
	alert("Fim de Jogo. Você não conseguiu estourar todos os balões a tempo.")
}

function parar_jogo(){
	clearTimeout(timerId); //Para o cronômetro
}

function remove_eventos_baloes() { //Essa função irá remover todos os eventos "onclick" de todos os balões em caso de derrota por estourar o cronômetro
    var i = 1; //contador para recuperar balões por id
    
    //percorre os elementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('balao'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('balao'+i).onclick = '';
        i++;
    }
}