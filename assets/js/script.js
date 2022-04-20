const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let quizzes = []

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
    document.querySelector(".maincontent").classList.add("hidden");
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

function enviarInfBasicas(){
    const title = document.querySelector(".title").value
    const qtdPerguntas = document.querySelector(".qtdPerguntas").value
    const qtdNiveis = document.querySelector(".qtdNivel").value
    const image = document.querySelector(".quizzImgURL").value

    if(isImage(image)){
        if(title.length < 20 || qtdPerguntas < 3 || qtdNiveis < 2){
            alert("Preencha os dados corretamente");
        }
    }

    criarPerguntas();
}

function criarPerguntas(){
    document.querySelector(".inputs").classList.add("hidden");

    const textoPergunta = document.querySelector(".textoPergunta.nao-preenchida").value;
    const respostaCorreta = document.querySelector(".respostaCorreta.nao-preenchida").value;
    const imageC = document.querySelector(".imagemCorreta.nao-preenchida").value
    const imageE = document.querySelector(".imagemErrada.nao-preenchida").value
    const respostaIncorreta = document.querySelector(".respostaIncorreta.nao-preenchida").value;

    if(textoPergunta.length < 20 || respostaCorreta === '' || !isImage(imageC)
    || respostaIncorreta === '' || !isImage(imageE)){
        alert("Preencha os dados corretamente");
    } 
    
    testar();

}

function testar(){
    console.log(respostaIncorreta)
}