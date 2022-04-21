const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";

let totalDePerguntas = 0;
let quizzes = []
let myQuizz = {
	id: 1,
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}

function obterQuizzes(){
    axios.get(`${API}/quizzes`).then(armazenarQuizzes);
}

function armazenarQuizzes(response){
    quizzes = response.data;
    renderizarQuizzes();
}

function renderizarQuizzes(){
    
    const ulQuizz = document.querySelector(".quizzContainer");

    ulQuizz.innerHTML = "";

    for(let i = 0;i < quizzes.length;i++){
        ulQuizz.innerHTML += `
        <li class="quizz">
            <img src="${quizzes[i].image}" alt="" srcset="">
            <div class="quizzTitle"><h2>${quizzes[i].title}</h2></div>
        </li>
        `
    }
}

function toLimit(string = ""){
    string.value = string.value.substring(0,65);
}

function criarQuizz(){
	console.log("1")
    document.querySelector(".screen1_listquizz").classList.add("hidden");
    document.querySelector(".screen3_pagequizz").classList.remove("hidden");
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

function enviarInfBasicas(){
	
    const title = document.querySelector(".title").value
    const qtdNiveis = document.querySelector(".qtdNivel").value
    const image = document.querySelector(".quizzImgURL").value
	const qtdPerguntas = document.querySelector(".qtdPerguntas").value;

    if(title.length < 20 || qtdPerguntas < 3 || qtdNiveis < 2 || !isImage(image)){
        alert("Preencha os dados corretamente");
    }else{
		totalDePerguntas = qtdPerguntas;
		document.querySelector(".pagequizz_1").classList.toggle("hidden");
		document.querySelector(".pagequizz_2").classList.toggle("hidden");

		myQuizz.title = title;
    	myQuizz.image = image;

		const listaPerguntas = document.querySelector(".inputs_2");
		const listaNiveis = document.querySelector(".inputs_3");

		for(let i = 0;i < qtdPerguntas;i++){
			listaPerguntas.innerHTML += `
			<article class="newinputs">
                <div class="content">
                <div class="testando">
                    <h4>Pergunta ${i+1}</h4>
                    <ion-icon onclick="select(this)" name="brush-outline"></ion-icon>
                </div>
                <div class="testando2">
                    <h4>Pergunta ${i+1}</h4>
                    <input class="textoPergunta" type="text" placeholder="Texto da pergunta">
                    <input class="corPergunta" type="text" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" placeholder="Cor de fundo da pergunta">
                    <h4>Resposta Correta</h4>
                    <input class="respostaCorreta" type="text" placeholder="Resposta Correta">
                    <input class="imagemCorreta" type="text" placeholder="URL da imagem">
                    <h4>Respostas incorretas</h4>
                    <input class="respostaIncorreta1" type="text" placeholder="Resposta incorreta 1">
                    <input class="imagemErrada1" type="text" placeholder="URL da imagem 1">
            
                    <input class="respostaIncorreta2" type="text" placeholder="Resposta incorreta 2">
                    <input class="imagemErrada2" type="text" placeholder="URL da imagem 2">
                            
                    <input class="respostaIncorreta3" type="text" placeholder="Resposta incorreta 3">
                    <input class="imagemErrada3" type="text" placeholder="URL da imagem 3">
                </div>
            	</div>  
            </article>
			`
		}

		for(let i = 1;i < qtdNiveis;i++){
			listaNiveis.innerHTML += `
			<article class="newinputs">
                	<h4>Nível ${i+1}</h4>
               	 	<ion-icon name="brush-outline"></ion-icon>
           	</article>
			`
		}
	}
    
    
}

function criarPerguntas(){
	let conditionsNotMet = false;
    const textoPergunta = document.querySelectorAll(".textoPergunta");
    const respostaCorreta = document.querySelectorAll(".respostaCorreta");
	const corPergunta = document.querySelectorAll(".corPergunta");
    const imageC = document.querySelectorAll(".imagemCorreta");
    const respostaIncorreta1 = document.querySelectorAll(".respostaIncorreta1");
	const imageE1 = document.querySelectorAll(".imagemErrada1");
	const respostaIncorreta2 = document.querySelectorAll(".respostaIncorreta2");
	const imageE2 = document.querySelectorAll(".imagemErrada2");
	const respostaIncorreta3 = document.querySelectorAll(".respostaIncorreta3");
	const imageE3 = document.querySelectorAll(".imagemErrada3");

	
	for(let k = 0; k < totalDePerguntas; k++){
		if(textoPergunta[k].value.length < 20 || !isImage(imageC[k].value) || 
			respostaCorreta[k].value === '' || (respostaIncorreta1[k].value === '' &&
			respostaIncorreta2[k].value === '' && respostaIncorreta3[k].value === '')){
        		conditionsNotMet = true;
    	}
	}

	if(conditionsNotMet){
		alert("Preencha os dados corretamente");
	}else{
		for(let i = 0; i < totalDePerguntas;i++){
			myQuizz.questions[i].title = textoPergunta[i].value;
			myQuizz.questions[i].color = corPergunta[i].value;
			myQuizz.questions[i].answers = [
				{
					text: respostaCorreta[i].value,
					image: imageC[i].value,
					isCorrectAnswer: true
				},
				{
					text: respostaIncorreta1[i].value,
					image: imageE1[i].value,
					isCorrectAnswer: false
				},
				{
					text: respostaIncorreta2[i].value,
					image: imageE2[i].value,
					isCorrectAnswer: false
				},
				{
					text: respostaIncorreta3[i].value,
					image: imageE3[i].value,
					isCorrectAnswer: false
				},
			];
		}
		document.querySelector(".pagequizz_2").classList.toggle("hidden");
		document.querySelector(".pagequizz_3").classList.toggle("hidden");
	}		
}

function select(elemento){
const perguntaSelecionada = document.querySelector(".content.selecionado");
	
  if(perguntaSelecionada !== null){
    perguntaSelecionada.classList.toggle("selecionado");
  }
  elemento.parentNode.parentNode.classList.toggle("selecionado");
}