import {quizQuestions} from "./ques.js";

const timerValue = document.querySelector(".timer-value");
const progressBar = document.querySelector(".quiz-progress");
const question = document.querySelector(".question");
const options = document.querySelector(".quiz-options");
const currentQues = document.querySelectorAll(".currentQ");
const totalQues = document.querySelector(".totalQ");
const summary = document.querySelector(".question-answer-container");
const quizApp = document.querySelector(".quiz-app");
const finalScore = document.querySelector(".score");

summary.style.display = "none";

let score = 0;
const timer = 5;
let currentTime = timer;
let currentQuesIndex = 0;
let currentQuesCount = 0;
let totalMCQ = 2;

// picking random ques
function randomQues(numberOfQuestion){
    let questions = [];
    for (let i = 0; i < numberOfQuestion; i++) {
        const randomIndex = Math.floor(Math.random() * quizQuestions.length);
        questions.push(quizQuestions[randomIndex]);
    }
    console.log(questions);  
    return questions;  
}
let questions = randomQues(totalMCQ);

function updateQues(){
    currentTime = timer;
    // changing currQ and totalQ
    if(currentQuesIndex >= totalMCQ){ 
        summary.style.display = "block";
        quizApp.style.display = "none";
        finalScore.innerText = "Score : " + score;
        questions.forEach((question)=>{
            summaryPage(question);
        })
        const btn = document.createElement("button");
        btn.innerText = "Start Again";
        btn.classList.add("reloadBtn");
        btn.addEventListener("click", ()=>{
            console.log("reload")
            location.reload();
        });

        clearInterval(quesTimer);
        summary.append(btn);
        
    }else{
        currentQues.forEach((ques) =>{
            ques.innerText = currentQuesIndex + 1;
        })
        totalQues.innerText = questions.length;
    
        const newQues = questions[currentQuesIndex];
        question.innerText = newQues.Question;
        options.innerHTML = "";
        newQues.options.forEach((choice)=>{
            const optionBtn = document.createElement("button");
            optionBtn.classList.add("quiz-option");
    
            const optionText = document.createElement("div");
            optionText.classList.add("quiz-option-text")
            optionText.innerText = choice;
    
            const optionImg = document.createElement("img");
    
            optionBtn.append(optionText, optionImg);
            optionBtn.addEventListener('click', (e)=> {
                if(verifyOption(e, newQues.correctAns)){
                    score++;
                }
                options.querySelectorAll(".quiz-option").forEach((option) => option.disabled = true);
                currentQuesIndex++;
                setTimeout(()=>{
                    updateQues();
                }, 500);
            });
    
            options.appendChild(optionBtn);
        }); 
    }
}

function verifyOption(event, answer){
    // console.log(event.target.childNodes[0].innerText)
    const selectedOption = event.currentTarget.innerText;
    if(selectedOption === answer){
        event.currentTarget.classList.add("correct");
        event.currentTarget.childNodes[1].src = "correct-right-arrow-direction-left-down-up-svgrepo-com.svg";
        event.currentTarget.childNodes[1].classList.add("btn-img");
        return true;
    }else{
        event.currentTarget.classList.add("wrong");
        event.currentTarget.childNodes[1].src = "cross-round-svgrepo-com.svg";
        event.currentTarget.childNodes[1].classList.add("btn-img");
        return false;
    }
}

function summaryPage(questions){
    const quesAnsContainer = document.createElement("div");
    quesAnsContainer.classList.add("question-answer-inner-container");

    const ques = document.createElement("h2");
    ques.classList.add("quiz-question", "question")
    ques.innerText = questions.Question;

    const ans = document.createElement("div");
    ans.classList.add("quiz-answer", "quiz-option", "correct");
    ans.innerText = questions.correctAns;

    quesAnsContainer.append(ques, ans);
    summary.appendChild(quesAnsContainer);
}

var quesTimer = setInterval(()=>{
    timerValue.innerText = currentTime;
    if(currentTime === 1){
        currentQuesIndex++;
        updateQues();
    }
    currentTime--;
}, 1000)

updateQues();
