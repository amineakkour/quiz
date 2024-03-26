const quizzDatta = [
    { 
        question: "What is the capital of the United States?",
        a: "Washington, D.C",
        b: "New York City",
        c: "Los Angeles",
        d: "Chicago",
        Correct : "a",
    },  
    {   
        question: "In which year did the United States declare its independence?",
        a: 1776,
        b: 1789,
        c: 1800,
        d: 1620,
        Correct : "a",
    }, 
    {
        question: "Who is known as the 'Father of the Constitution' in the United States?",
        a: "George Washington",
        b: "Thomas Jefferson",
        c: "James Madison",
        d: "Benjamin Franklin",
        Correct : "c",
    },
    {
        question: "Which mountain range runs along the western part of the United States?",
        a: "Rocky Mountains",
        b: "Appalachian Mountains",
        c: "Sierra Nevada",
        d: "Cascade Range",
        Correct : "a",
    },
    {
        question: "What is the national What is a commonly recognized symbol of the United States?",
        a: "Bald Eagle",
        b: "Peregrine Falcon",
        c: "American Robin",
        d: "Osprey",
        Correct : "",
    },
    {
        question: "Which document outlines the fundamental laws and principles of the United States?",
        a: "Declaration of Independence",
        b: "Emancipation Proclamation",
        c: "Bill of Rights",
        d: "Constitution",
        Correct : "d",
    },
    {
        question: "Which U.S. state is known as the 'Sunshine State'?",
        a: "California",
        b: "Florida",
        c: "Texas",
        d: "Arizona",
        Correct : "b",
    },
    {
        question: "Who were the 16th and 26th Presidents of the United States?",
        a: "Abraham Lincoln",
        b: "Thomas Jefferson",
        c: "Andrew Jackson",
        d: "Theodore Roosevelt",
        Correct : "a,c",
    },
    {
        question: "What is the largest river in the United States?",
        a: "Mississippi River",
        b: "Colorado River",
        c: "Ohio River",
        d: "Columbia River",
        Correct : "a",    
    },
    {
        question: "In which city did the historic event known as the Boston Tea Party take place?",
        a: "Philadelphia",
        b: "Boston",
        c: "New York City",
        d: "Charleston",
        Correct : "b",
        }
];

const quizz = document.getElementById('conta')
const answerEls = document.querySelectorAll('.answer')
const questionEls = document.getElementById('qcm')
const a_answer = document.querySelector('#a_answer span.answer')
const b_answer = document.querySelector('#b_answer span.answer')
const c_answer = document.querySelector('#c_answer span.answer')
const d_answer = document.querySelector('#d_answer span.answer')
const btn_Next = document.querySelector('#btn_next')
const btn_Exit = document.querySelector('#btn_exit')

let currentQuiz = 0
let score = 0

loadQuizz()

function loadQuizz(){
    deselectanswer()
    const currentQuizData = quizzDatta[currentQuiz]

    questionEls.innerText = currentQuizData.question
    a_answer.innerText = currentQuizData.a
    b_answer.innerText = currentQuizData.b
    c_answer.innerText = currentQuizData.c
    d_answer.innerText = currentQuizData.d
}

function deselectanswer(){
    answerEls.forEach(answerEl =>answerEl.checked = false)
}

function getselected(){
    var answer = [];

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer.push(answerEl.id)
        }
    })

    return answer
}

function handleNextButton(){

}

btn_Next.addEventListener('click', () => {
    var getSelected = getselected().length ? getselected() : null;
    var currentAnswer = quizzDatta[currentQuiz].Correct.split(",");

    if(getSelected){
        if(currentAnswer.length === 1){
            currentAnswer = currentAnswer[0];

            if((getSelected.length > 1 || getSelected[0] !== currentAnswer)){
                score -= 1;
            }else{
                score += 2;
                
            }
        } // if the answer contains multiple values
        else{
            var counter = 0;

            for(let i = 0; i < getSelected.length; i++){
                if (currentAnswer.includes(getSelected[i])) counter++
                else {
                    score -= 2
                    return ""
                }
            }

            if (counter === currentAnswer.length){
                score += 2
            }

        }
    }else if (currentAnswer[0] === ""){
        score += 2;
    }
    
    if(currentQuiz >= (quizzDatta.length -1)){
        sessionStorage.setItem("score", score);
        loadQuizz()
        currentQuiz = score = 0

        // Result Page
        window.location.href = "./result/index.html"
    }
    else{
        currentQuiz++
        loadQuizz()
    }
});



btn_Exit.addEventListener("click", () => {
    const confirmation = confirm("Are you sure?");

    if(confirmation){
        window.location.href = "../home/index.html"
    }
})