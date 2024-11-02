const questions = [
    {
        question: "Which is the most powerful animal in the river?",
        answer: [
            { text: "Snake", correct: false},
            { text: "Crocodile", correct: true},
            { text: "King Fisher", correct: false},
            { text: "Frog", correct: false},
        ]
    },
    {
        question: "Which is the most powerful bird in the forest?",
        answer: [
            { text: "Harpy Eagle", correct: true},
            { text: "Segal", correct: false},
            { text: "Sparrow", correct: false},
            { text: "Hawk", correct: false},
        ]
    },
    {
        question: "Which animal has the most powerful bite force?",
        answer: [
            { text: "Lion", correct: false},
            { text: "Tiger", correct: false},
            { text: "Heyna", correct: true},
            { text: "Dog", correct: false},
        ]
    },
    {
        question: "which animal is a good swimmer in a cat family?",
        answer: [
            { text: "Lion", correct: false},
            { text: "Tiger", correct: true},
            { text: "Cheeta", correct: false},
            { text: "Lepord", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();