const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";

let totalDePerguntas = 0;
let totalDeNiveis = 0;
let quizzes = [];
let geral = [];
let meusQuizzes = [];
let quizzAtual = [];
let myQuizz = {};
let ID_DO_QUIZZ;
let acertos = 0;
let questoesRespondidas = 0;
let meusQuizzesID = [];
const idSerializado = localStorage.getItem("id");
let load = document.querySelector(".load").classList.add("hidden")
obterQuizzes();

console.log(idSerializado)

function obterQuizzes() {
	axios.get(`${API}/quizzes`).then(armazenarQuizzes);
}

function armazenarQuizzes(response) {
	geral = response.data
	for (let i = 0; i <= meusQuizzesID.length; i++) {
		for (let k = 0; k < geral.length; k++) {
			if (meusQuizzesID[i] === geral[k].id) {
				meusQuizzes.push(geral[k]);
			} else {
				meusQuizzesID.pop(geral[k].id);
				quizzes.push(geral[k]);
			}
		}
	}
	const myQuizzesIDSerializado = JSON.stringify(meusQuizzesID);
	localStorage.setItem("id", myQuizzesIDSerializado);
	checkMyQuizzes();
	renderizarQuizzes();

}

function checkMyQuizzes() {
	if (localStorage.length !== 0) {
		meusQuizzesID = JSON.parse(idSerializado);
	}
	if (meusQuizzesID.length !== 0) {
		document.querySelector('.mylistquizz_none').classList.toggle("hidden");
		document.querySelector('.meus').classList.toggle("hidden");
	}
}


function renderizarQuizzes() {

	const ulQuizz = document.querySelector(".listquizz.todos");
	ulQuizz.innerHTML = "<h2>Todos Quizzes</h2><br>";

	for (let i = 0; i < quizzes.length; i++) {
		ulQuizz.innerHTML += `
        <figure onclick="accessQuizz(this)" class="tumb_quizz animate__flipInX">
			<icon class="getID hidden">${quizzes[i].id}</icon>
        	<img class="" src="${quizzes[i].image}" alt="">
        	<figcaption>${quizzes[i].title}</figcaption>
    	</figure>
        `
	}

	const ulMeusQuizzes = document.querySelector(".meus");

	for (let j = 0; j < meusQuizzes.length; j++) {
		ulMeusQuizzes.innerHTML += `
        <figure onclick="accessQuizz(this)" class="tumb_meusquizz">
			<icon class="getID hidden">${meusQuizzes[j].id}</icon>
        	<img class="img_meus" src="${meusQuizzes[j].image}" alt="">
        	<figcaption>${meusQuizzes[j].title}</figcaption>
			<div class="bonus_meus">
			<ion-icon class="bonus_ion" name="create-outline"></ion-icon>
			<ion-icon class="bonus_ion" name="trash-outline"></ion-icon>
			</div>
    	</figure>
        `
	}
}

function toLimit(string = "") {
	string.value = string.value.substring(0, 65);
}

function criarQuizz() {
	document.querySelector(".screen1_listquizz").classList.toggle("hidden");
	document.querySelector(".screen3_pagequizz").classList.toggle("hidden");
	document.querySelector(".pagequizz_1").classList.toggle("hidden");
}

function isImage(url) {
	return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function isColor(color) {
	const regexColor = /^#([0-9]|[A-F]|[a-f]){6}$/;
	return regexColor.test(color);
}

function enviarInfBasicas() {

	const title = document.querySelector(".title").value
	const qtdNiveis = document.querySelector(".qtdNivel").value
	const image = document.querySelector(".quizzImgURL").value
	const qtdPerguntas = document.querySelector(".qtdPerguntas").value;

	if (title.length < 20 || qtdPerguntas < 3 || qtdNiveis < 2 || !isImage(image)) {
		validarInfBasicas(title,qtdNiveis,image,qtdPerguntas);
	} else {
		totalDePerguntas = qtdPerguntas;
		totalDeNiveis = qtdNiveis
		document.querySelector(".pagequizz_1").classList.toggle("hidden");
		document.querySelector(".pagequizz_2").classList.toggle("hidden");
		quizzRefreshing()
		myQuizz.title = title;
		myQuizz.image = image;

		const listaPerguntas = document.querySelector(".inputs_2");
		const listaNiveis = document.querySelector(".inputs_3");

		for (let i = 0; i < qtdPerguntas; i++) {
			listaPerguntas.innerHTML += `
			<section class="newinputs">
                <article class="content">
                <div class="testando">
                    <h4>Pergunta ${i + 1}</h4>
                    <ion-icon onclick="select(this)" name="brush-outline"></ion-icon>
                </div>
                <div class="testando2">
                    <h4>Pergunta ${i + 1}</h4>
                    <input class="textoPergunta" type="text" placeholder="Texto da pergunta">
					<h7 class="hidden">A sua pergunta deve ter pelo menos 20 letras</h7>
                    <input class="corPergunta" type="text" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" placeholder="Cor de fundo da pergunta">
					<h7 class="hidden">A cor fornecida deve ser hexadecimal</h7>
                    <h4>Resposta Correta</h4>
                    <input class="respostaCorreta" type="text" placeholder="Resposta Correta">
					<h7 class="hidden">Você deve informar a resposta correta do quizz</h7>
                    <input class="imagemCorreta" type="text" placeholder="URL da imagem">
					<h7 class="hidden">O valor informado não é uma URL válida</h7>
                    <h4>Respostas incorretas</h4>
                    <input class="respostaIncorreta1" type="text" placeholder="Resposta incorreta 1">
					<h7 class="hidden">Você deve informar pelo menos uma resposta incorreta</h7>
                    <input class="imagemErrada1" type="text" placeholder="URL da imagem 1">
					<h7 class="hidden">O valor informado não é uma URL válida</h7>
                    <input class="respostaIncorreta2" type="text" placeholder="Resposta incorreta 2">
					<h7 class="hidden">Você deve informar a resposta incorreta</h7>
                    <input class="imagemErrada2" type="text" placeholder="URL da imagem 2">
					<h7 class="hidden">O valor informado não é uma URL válida</h7>
                    <input class="respostaIncorreta3" type="text" placeholder="Resposta incorreta 3">
					<h7 class="hidden">Você deve informar a resposta incorreta</h7>
                    <input class="imagemErrada3" type="text" placeholder="URL da imagem 3">
					<h7 class="hidden">O valor informado não é uma URL válida</h7>
                </div>
            	</article>  
            </section>
			`
		}

		for (let i = 0; i < qtdNiveis; i++) {
			listaNiveis.innerHTML += `
			<section class="newinputs">
                <article class="content">
                    <div class="testando">
                        <h4 class="nivel_name">Nivel ${i + 1}</h4>
                        <ion-icon onclick="select(this)" name="brush-outline"></ion-icon>
                    </div>
                    <div class="testando3">
                        <h4>Nível ${i + 1}</h4>
                        <input class="tituloNivel" type="text" name="" id="" placeholder="Título do nível">
						<h8 class="hidden">O título do nível deve ter pelo menos 10 letras</h8>
                        <input class="acertoPercentual" type="number" name="" id="" placeholder="% de acerto mínima">
						<h8 class="hidden">Informe um número entre 0 e 100, um tem de ser igual a 0</h8>
                    <input class="imageNivel" type="url" name="" id="" placeholder="URL da imagem do nível">
					<h8 class="hidden">O valor informado não é uma URL válida</h8>
                    <input class="textoNivel" class="desc_nivel" type="text" name="" id="" placeholder="Descrição do nível">
					<h8 class="hidden">A descrição do nível deve ter pelo menos 30 letras</h8>
                    </div>
                </article>
            </section>
			`
		}
	}
}

function criarPerguntas() {
	let arr = [];
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

	for (let k = 0; k < totalDePerguntas; k++) {
		if (textoPergunta[k].value.length < 20 || !isImage(imageC[k].value) ||
			respostaCorreta[k].value === '' || (respostaIncorreta1[k].value === '' &&
				respostaIncorreta2[k].value === '' && respostaIncorreta3[k].value === '') ||
			!isColor(corPergunta[k].value)) {
				validarPerguntas(textoPergunta,respostaCorreta,corPergunta,imageC
					,respostaIncorreta1,imageE1,respostaIncorreta2,imageE2
					,respostaIncorreta3,imageE3)
					conditionsNotMet = true;
		}
	}

	if (conditionsNotMet) {
		return;
	} else {
		for (let i = 0; i < totalDePerguntas; i++) {
			arr.push({
				title: textoPergunta[i].value,
				color: corPergunta[i].value,
				answers: [
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
				]
			}
			);	
		}

		for (let i = 0; i < totalDePerguntas; i++){
			arr[i].answers = arr[i].answers.filter((elemento,index) => elemento.text !== '')
		}
		
		console.log(arr)
		myQuizz['questions'] = arr;

		document.querySelector(".pagequizz_2").classList.toggle("hidden");
		document.querySelector(".pagequizz_3").classList.toggle("hidden");
		quizzRefreshing()
	}
}

function criarNiveis() {
	let arr = [];
	let conditionsNotMet = false;
	let hasZero = false;
	const tituloNivel = document.querySelectorAll(".tituloNivel");
	const acertoPercentual = document.querySelectorAll(".acertoPercentual");
	const imageNivel = document.querySelectorAll(".imageNivel");
	const textoNivel = document.querySelectorAll(".textoNivel");

	for (let i = 0; i < totalDeNiveis; i++) {
		if (tituloNivel[i].value.length < 10 || acertoPercentual[i].value < 0 ||
			acertoPercentual[i].value > 100 || !isImage(imageNivel[i].value) ||
			textoNivel[i].value.length < 30) {
				validarNiveis(tituloNivel,acertoPercentual,imageNivel,textoNivel);
			conditionsNotMet = true;
		}
		if (acertoPercentual[i].value == 0) {
			hasZero = true;
		}
	}
	if (conditionsNotMet || !hasZero) {
		return;
	} else {
		for (let k = 0; k < totalDeNiveis; k++) {
			arr.push({
				title: tituloNivel[k].value,
				image: imageNivel[k].value,
				text: textoNivel[k].value,
				minValue: acertoPercentual[k].value
			});
		}
		myQuizz['levels'] = arr;

		document.querySelector(".imagem_final").innerHTML = `
			<figure class="tumb_quizzfinal animate__flipInX">
				<img src="${myQuizz.image}" alt="">
				<figcaption>${myQuizz.title}</figcaption>
			</figure>
		`
		setTimeout(load,2000)
		enviarQuizz();
		quizzRefreshing()
		document.querySelector(".pagequizz_3").classList.toggle("hidden");
		document.querySelector(".pagequizz_4").classList.toggle("hidden");
	}
}

function enviarQuizz() {
	const promise = axios.post(`${API}/quizzes`, myQuizz);
	promise.then(armazenarMeuQuizz)
	promise.catch(deuErro);
}

function deuErro() {
	alert("eita");
}

function armazenarMeuQuizz(response) {
	meusQuizzesID.push(Number(response.data.id));
	const myQuizzesIDSerializado = JSON.stringify(meusQuizzesID);
	localStorage.setItem("id", myQuizzesIDSerializado);
}

function accessQuizz(elemento) {
	ID_DO_QUIZZ = elemento.querySelector(".getID").innerHTML;
	obterQuizzEspecifico(ID_DO_QUIZZ)
	quizzRefreshing()
}


function obterQuizzEspecifico(ID_DO_QUIZZ) {
	axios.get(`${API}/quizzes/${ID_DO_QUIZZ}`).then(armazenarQuizzAtual);
}

function armazenarQuizzAtual(response) {
	quizzAtual = [];
	quizzAtual = response.data;
	renderizarQuizzAtual();
}

function renderizarQuizzAtual() {
	for (let f = 0; f < quizzAtual.questions.length; f++) {
		embaralharArray(quizzAtual.questions[f].answers)
	}

	const x = document.querySelector(".screen1_listquizz.hidden");

	if (x === null) {
		document.querySelector(".screen1_listquizz").classList.add("hidden");
	}

	document.querySelector(".screen2_pagequizz").classList.toggle("hidden");

	let Quizz = document.querySelector(".screen2_pagequizz");
	Quizz.innerHTML = '';

	Quizz.innerHTML = `
		<article class="top_quizz">
			<figure class="head">
				<img class="imagetop_quizz" src="${quizzAtual.image}" alt="">
				<figcaption class="titleImgTop">${quizzAtual.title}</figcaption>
			</figure>
		</article>
		<section class="boby_quest">
        </section>
        <section class="boby_questresult">
        </section>
		<section class ="butoes">
			<button onclick="reiniciarQuizz()" class="reloadquizz_button">Reiniciar Quizz</button>
			<button onclick="returnHomeTodos()" class="homeback_button">Voltar pra Home</button>
		</section>
	`
	const Quizz2 = document.querySelector(".boby_quest");
	const Quizz3 = document.querySelector(".boby_questresult");

	Quizz2.innerHTML = "";
	Quizz3.innerHTML = "";

	for (let i = 0; i < quizzAtual.questions.length; i++) {
		Quizz2.innerHTML += `
			<section class="questoesAqui${i + 1} questao">
				<article class="title_quest">
					<h3>${quizzAtual.questions[i].title}</h3>
				</article>
				<section class="options">
				</section>
			</section>
		`
		const Quizz4 = document.querySelector(`.questoesAqui${i + 1}.questao section`);
		for (let k = 0; k < quizzAtual.questions[i].answers.length; k++) {
			Quizz4.innerHTML += ` 
			<article onclick="answerQuizz(this)" class="option_quest">
				<figure class="option">
					<img class="image_quest" src="${quizzAtual.questions[i].answers[k].image}" alt="">
					<figcaption class="titleOptionQuest">${quizzAtual.questions[i].answers[k].text}</figcaption>
				</figure>
			</article>
			`
		}
	}
	
	for (let j = 0; j < quizzAtual.levels.length; j++) {
		Quizz3.innerHTML += `
		<section class="resultados hidden">
			<article class="title_result">
				<h3>${quizzAtual.levels[j].title}</h3>
			</article>
			<article class="result">
				<figure class="result_nivel">
					<img class="image_result" src="${quizzAtual.levels[j].image}" alt="">
					<figcaption class="result_text">${quizzAtual.levels[j].text}</figcaption>
				</figure>
			</article>
		</section>	`
	}

	const perguntas = document.querySelectorAll(".title_quest");

	for (let k = 0; k < quizzAtual.questions.length; k++) {
		perguntas[k].setAttribute("style", `background-color: ${quizzAtual.questions[k].color};`);
	}

}

function accessMyQuizz() {
	obterQuizzes();
	document.querySelector(".pagequizz_4").classList.toggle("hidden");
	document.querySelector(".screen3_pagequizz").classList.toggle("hidden");

	obterQuizzEspecifico(meusQuizzesID[meusQuizzesID.length - 1]);

	quizzRefreshing()
}
let scroll = window.scroll(0,900);
function scrollQuizz(){
	window.scroll(0,900)
}
function intervalScroll(){
	setInterval(scrollQuizz(),2000)
}
function answerQuizz(elemento) {
	const questaoAtual = elemento.parentNode.parentNode;
	const todasPerguntas = document.querySelectorAll(".questao");
	const myAnswer = elemento.querySelector("figcaption").innerHTML;
	const correctAnswers = [];
	let correctAnswer;
	
	for (let i = 0; i < quizzAtual.questions.length; i++) {
		for (let k = 0; k < quizzAtual.questions[i].answers.length; k++) {
			if (quizzAtual.questions[i].answers[k].isCorrectAnswer === true) {
				correctAnswers.push(quizzAtual.questions[i].answers[k].text)
			}
		}
	}

	for (let i = 0; i < todasPerguntas.length; i++) {
		if (questaoAtual === todasPerguntas[i]) {
			correctAnswer = correctAnswers[i];
		}
	}

	if(myAnswer === correctAnswer) {
		elemento.onclick = " ";
		elemento.classList.add("certa");
		acertos++;
		for(let i = 0; i < elemento.parentNode.children.length;i++){
			elemento.parentNode.children[i].onclick = " ";
			if(elemento.parentNode.children[i] !== elemento){
				elemento.parentNode.children[i].classList.add("opacidade")
				if(elemento.parentNode.children[i].querySelector("figcaption").innerHTML !== correctAnswer){
					elemento.parentNode.children[i].classList.add("errada");
				}else{
					elemento.parentNode.children[i].classList.add("certa");
				}
			}
		}
	}else{
		elemento.onclick = " ";
		elemento.classList.add("errada");
		for(let i = 0; i < elemento.parentNode.children.length;i++){
			elemento.parentNode.children[i].onclick = " ";
			if(elemento.parentNode.children[i] !== elemento){
				elemento.parentNode.children[i].classList.add("opacidade");
				if(elemento.parentNode.children[i].querySelector("figcaption").innerHTML !== correctAnswer){
					elemento.parentNode.children[i].classList.add("errada");
				}else{
					elemento.parentNode.children[i].classList.add("certa");
				}
			}
		}
	}
	
	questoesRespondidas++;

	if(questoesRespondidas === quizzAtual.questions.length){
		questoesRespondidas = 0;
		calcularAcertos();
	}
	setTimeout(function(){
		for(let i = 0;i < todasPerguntas.length;i++){
			if(questaoAtual === todasPerguntas[i]){
				todasPerguntas[i+1].scrollIntoView();
			}else{
				document.querySelector(".resultados:not(.hidden)").scrollIntoView();
			}
		}
	},2000)
}

function calcularAcertos(){
	let k = 0;
	const Resultado = document.querySelectorAll(".resultados.hidden");
	const totalAcertos = Math.trunc((acertos/quizzAtual.questions.length)*100);

	for(let j = 0;j < quizzAtual.levels.length;j++){
		if(totalAcertos === 0 && Number(quizzAtual.levels[j].minValue) === 0){
			Resultado[j].classList.remove("hidden");
			break;
		}else if(totalAcertos!== 0 && Number(quizzAtual.levels[j].minValue) === totalAcertos){
			Resultado[j].classList.remove("hidden");
			break;
		}
	}

	for(let j = 0;j < quizzAtual.levels.length;j++){
		const Resultado2 = document.querySelectorAll(".resultados.hidden");
		if(Resultado2.length === quizzAtual.levels.length){
			if(totalAcertos > Number(quizzAtual.levels[j].minValue)){
				k = j;
			}
		}
	}

	if(k !== 0){
		Resultado[k].classList.remove("hidden");
	}

	document.querySelector(".reloadquizz_button").classList.remove("hidden");
	document.querySelector(".homeback_button").classList.remove("hidden");
}


function select(elemento) {
	const perguntaSelecionada = document.querySelector(".content.selecionado");

	if (perguntaSelecionada !== null) {
		perguntaSelecionada.classList.toggle("selecionado");
	}
	elemento.parentNode.parentNode.classList.toggle("selecionado");
}

function returnHomeTodos() {
	obterQuizzes();
	document.querySelector(".screen2_pagequizz").classList.toggle("hidden");
	document.querySelector(".screen1_listquizz").classList.toggle("hidden");
}

function returnHome() {
	obterQuizzes();
	document.querySelector(".pagequizz_4").classList.toggle("hidden");
	document.querySelector(".screen3_pagequizz").classList.toggle("hidden");
	document.querySelector(".screen1_listquizz").classList.toggle("hidden");
}

function reiniciarQuizz(){
	const certa  = document.querySelectorAll(".certa");
	const errada = document.querySelectorAll(".errada");
	
	for(let i = 0; i < certa.length;i++){
		certa[i].onclick = function () {answerQuizz(this);};
		certa[i].classList.remove("opacidade");
		certa[i].classList.remove("certa");
	}
	for(let j = 0; j < errada.length;j++){
		errada[j].onclick = function () {answerQuizz(this);};
		errada[j].classList.remove("opacidade")
		errada[j].classList.remove("errada")
	}
	
	document.querySelector(".resultados").classList.toggle("hidden");
	document.querySelector(".reloadquizz_button").classList.add("hidden");
	document.querySelector(".homeback_button").classList.add("hidden");
	quizzRefreshing();
}

function quizzRefreshing() {
	window.scrollTo(0, document.body.scrollTop);
}

function reloadWindown() {
	window.location.reload();
	quizzRefreshing()
}

function embaralharArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function validarInfBasicas(title,qtdNiveis,image,qtdPerguntas){
	const mensagensDeValidacao = document.querySelectorAll("h6");
	const inputsDeValidacao = document.querySelector(".inputs_1").children;
	if (title.length < 20){
		inputsDeValidacao[0].classList.add("wrong");
		mensagensDeValidacao[0].classList.remove("hidden");
	}else{
		inputsDeValidacao[0].classList.remove("wrong");
		mensagensDeValidacao[0].classList.add("hidden");
	}
	if(qtdPerguntas < 3){
		inputsDeValidacao[4].classList.add("wrong");
		mensagensDeValidacao[2].classList.remove("hidden");
	}else{
		inputsDeValidacao[4].classList.remove("wrong");
		mensagensDeValidacao[2].classList.add("hidden");
	}
	if(qtdNiveis < 2){
		inputsDeValidacao[6].classList.add("wrong"); 
		mensagensDeValidacao[3].classList.remove("hidden");
	}else{
		inputsDeValidacao[6].classList.remove("wrong");
		mensagensDeValidacao[3].classList.add("hidden");
	}if(!isImage(image)) {
		inputsDeValidacao[2].classList.add("wrong");
		mensagensDeValidacao[1].classList.remove("hidden");
	}else{
		inputsDeValidacao[2].classList.remove("wrong");
		mensagensDeValidacao[1].classList.add("hidden");
	}
}

function validarPerguntas(textoPergunta,respostaCorreta,corPergunta,imageC
	,respostaIncorreta1,imageE1,respostaIncorreta2,imageE2
	,respostaIncorreta3,imageE3){

const mensagensDeValidacao = document.querySelectorAll("h7");
const inputsDeValidacao = document.querySelectorAll(".testando2");

for(let k = 0; k < totalDePerguntas;k++){
	if (textoPergunta[k].value.length < 20){
		inputsDeValidacao[k].children[1].classList.add("wrong");
		mensagensDeValidacao[10*k].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[1].classList.remove("wrong");
		mensagensDeValidacao[10*k].classList.add("hidden");
		}
	if(!isColor(corPergunta[k].value)){
		inputsDeValidacao[k].children[3].classList.add("wrong");
		mensagensDeValidacao[10*k + 1].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[3].classList.remove("wrong");
		mensagensDeValidacao[10*k + 1].classList.add("hidden");
		}
	if(respostaCorreta[k].value === ''){
		inputsDeValidacao[k].children[6].classList.add("wrong");
		mensagensDeValidacao[10*k + 2].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[6].classList.remove("wrong");
		mensagensDeValidacao[10*k + 2].classList.add("hidden");
		}
	if(!isImage(imageC[k].value)){
		inputsDeValidacao[k].children[8].classList.add("wrong");
		mensagensDeValidacao[10*k + 3].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[8].classList.remove("wrong");
		mensagensDeValidacao[10*k + 3].classList.add("hidden");
		}
	if(respostaIncorreta1[k].value === '' 
		&& respostaIncorreta2[k].value === '' 
		&& respostaIncorreta3[k].value === ''){
			inputsDeValidacao[k].children[11].classList.add("wrong");
			mensagensDeValidacao[10*k + 4].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[11].classList.remove("wrong");
		mensagensDeValidacao[10*k + 4].classList.add("hidden");
		}
	if(!isImage(imageE1[k].value)){
		inputsDeValidacao[k].children[13].classList.add("wrong");
		mensagensDeValidacao[10*k + 5].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[13].classList.remove("wrong");
		mensagensDeValidacao[10*k + 5].classList.add("hidden");
		}
	if(respostaIncorreta2[k].value === '' && imageE2[k].value !== ''){
		inputsDeValidacao[k].children[15].classList.add("wrong");
		mensagensDeValidacao[10*k + 6].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[15].classList.remove("wrong");
		mensagensDeValidacao[10*k + 6].classList.add("hidden");
		}
	if(!isImage(imageE2[k].value) && respostaIncorreta2[k].value !== ''){
		inputsDeValidacao[k].children[17].classList.add("wrong");
		mensagensDeValidacao[10*k + 7].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[17].classList.remove("wrong");
		mensagensDeValidacao[10*k + 7].classList.add("hidden");
		}
	if(respostaIncorreta3[k].value === '' && imageE3[k].value !== ''){
		inputsDeValidacao[k].children[19].classList.add("wrong");
		mensagensDeValidacao[10*k + 8].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[19].classList.remove("wrong");
		mensagensDeValidacao[10*k + 8].classList.add("hidden");
		}
	if(!isImage(imageE3[k].value) && respostaIncorreta3[k].value !== ''){
		inputsDeValidacao[k].children[21].classList.add("wrong");
		mensagensDeValidacao[10*k + 9].classList.remove("hidden");
	}else{
		inputsDeValidacao[k].children[21].classList.remove("wrong");
		mensagensDeValidacao[10*k + 9].classList.add("hidden");
		}			  
	}
}

function validarNiveis(tituloNivel, acertoPercentual, imageNivel, textoNivel){
	const mensagensDeValidacao = document.querySelectorAll("h8");
	const inputsDeValidacao = document.querySelectorAll(".testando3");

	for(let k = 0; k < totalDeNiveis;k++){
		if (tituloNivel[k].value.length < 10){
			inputsDeValidacao[k].children[1].classList.add("wrong");
			mensagensDeValidacao[4*k].classList.remove("hidden");
		}else{
			inputsDeValidacao[k].children[1].classList.remove("wrong");
			mensagensDeValidacao[4*k].classList.add("hidden");
		}
		if(acertoPercentual[k].value < 0 || acertoPercentual[k].value > 100){
			inputsDeValidacao[k].children[3].classList.add("wrong");
			mensagensDeValidacao[4*k+1].classList.remove("hidden");
		}else{
			inputsDeValidacao[k].children[3].classList.remove("wrong");
			mensagensDeValidacao[4*k+1].classList.add("hidden");
		}
		if(!isImage(imageNivel[k].value)){
			inputsDeValidacao[k].children[5].classList.add("wrong");
			mensagensDeValidacao[4*k+2].classList.remove("hidden");
		}else{
			inputsDeValidacao[k].children[5].classList.remove("wrong");
			mensagensDeValidacao[4*k+2].classList.add("hidden");
		}
		if(textoNivel[k].value.length < 30){
			inputsDeValidacao[k].children[7].classList.add("wrong");
			mensagensDeValidacao[4*k+3].classList.remove("hidden");
		}else{
			inputsDeValidacao[k].children[7].classList.remove("wrong");
			mensagensDeValidacao[4*k+3].classList.add("hidden");
		}
	}
}
			