const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
const quizzes = []

obterQuizzes();

function obterQuizzes(){
    alert("OPA")
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

function selectQuizz(elemento){
    
}