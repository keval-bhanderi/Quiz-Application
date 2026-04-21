const questionPool = [
    {
        question:"Which planet know as a Red planet?",
        option:["Earth","Venus","Mars","Jupiter"],
        correctIndex: 2,
    },
    {
        question: "What is the capital city of Australia?",
        option: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctIndex: 2
    },
    {
        question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
        option: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctIndex: 2
    },
    {
        question: "Which is the largest ocean on Earth?",
        option: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctIndex: 3
    },
    {
        question: "Who is known as the Father of Computers?",
        option: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
        correctIndex: 1
    },
    {
        question: "Which country hosted the 2016 Summer Olympics?",
        option: ["China", "Brazil", "UK", "Russia"],
        correctIndex: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        option: ["Au", "Ag", "Gd", "Go"],
        correctIndex: 0
    },
    {
        question: "Which continent is the Sahara Desert located in?",
        option: ["Asia", "Africa", "Australia", "South America"],
        correctIndex: 1
    },
    {
        question: "Which organ in the human body pumps blood?",
        option: ["Brain", "Heart", "Liver", "Lungs"],
        correctIndex: 1
    },
    {
        question: "Who discovered gravity after seeing a falling apple?",
        option: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctIndex: 0
    },
    {
        question: "Which is the longest river in the world?",
        option: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctIndex: 1
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        option: ["China", "Japan", "Thailand", "South Korea"],
        correctIndex: 1
    },
    {
        question: "Which vitamin is mainly obtained from sunlight?",
        option: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        correctIndex: 3
    },
    {
        question: "Which is the largest mammal in the world?",
        option: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        correctIndex: 1
    },
    {
        question: "Which planet has the most moons?",
        option: ["Mars", "Jupiter", "Saturn", "Neptune"],
        correctIndex: 2
    },
    {
        question: "Which language has the most native speakers in the world?",
        option: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
        correctIndex: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        option: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctIndex: 0
    },
    {
        question: "Which country has the largest population in the world (2024)?",
        option: ["China", "India", "USA", "Indonesia"],
        correctIndex: 1
    },
    {
        question: "Which metal is liquid at room temperature?",
        option: ["Mercury", "Iron", "Copper", "Aluminum"],
        correctIndex: 0
    },
    {
        question: "Which is the smallest continent?",
        option: ["Europe", "Australia", "Antarctica", "South America"],
        correctIndex: 1
    },
    {
        question: "Who invented the telephone?",
        option: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "James Watt"],
        correctIndex: 1
    },
    {
        question: "Which country gifted the Statue of Liberty to the USA?",
        option: ["France", "Germany", "Italy", "Spain"],
        correctIndex: 0
    },
    {
        question: "What is the fastest land animal?",
        option: ["Lion", "Cheetah", "Tiger", "Horse"],
        correctIndex: 1
    },
    {
        question: "Which blood group is known as the universal donor?",
        option: ["A", "B", "O Negative", "AB Positive"],
        correctIndex: 2
    },
    {
        question: "Which planet is closest to the Sun?",
        option: ["Mercury", "Venus", "Earth", "Mars"],
        correctIndex: 0
    },
    {
        question: "Which country is famous for the Great Wall?",
        option: ["China", "Japan", "Mongolia", "South Korea"],
        correctIndex: 0
    },
    {
        question: "Who developed the theory of relativity?",
        option: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo"],
        correctIndex: 1
    },
    {
        question: "Which is the largest desert in the world?",
        option: ["Sahara", "Arabian", "Antarctic Desert", "Gobi"],
        correctIndex: 2
    },
    {
        question: "Which instrument measures earthquakes?",
        option: ["Barometer", "Seismograph", "Thermometer", "Hygrometer"],
        correctIndex: 1
    }
];

let questions = [];
let currentIndex = 0;
let score = 0;
const totalQuestions = 10;

const timerEle = document.getElementById("timer");
let timeLeft = 15;
let timer;

function startTimer(){
    timeLeft = 15;
    timerEle.textContent = `Time left:${timeLeft}`;

    timer = setInterval(() =>{
        timeLeft --;
        timerEle.textContent = `Time left:${timeLeft}`;

        if(timeLeft === 0){
            clearInterval(timer);

            currentIndex ++;

            if(currentIndex < totalQuestions){
                displayQuestions();
            }else{
                endQuiz();
            }
        }
    }, 1000);
}

const quiz = document.getElementById('quiz');
const questionNumberEle = document.getElementById('question-number');
const questionTextEle = document.getElementById('question-text');
const optionListEle = document.getElementById('option-list');
const nextBtn = document.getElementById('next-btn');
const scoreboardEle = document.getElementById('scoreboard');
const scoreMessageEle = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');

window.addEventListener('DOMContentLoaded', () => {
    intializeQuiz();
});

function intializeQuiz() {
    questions = ShuffleArray(questionPool).slice(0,totalQuestions);

    currentIndex = 0;
    score = 0;

    document.getElementById("quiz-content").classList.remove("hidden");
    scoreboardEle.classList.add("hidden");

    displayQuestions();
}

function displayQuestions() {
    clearOptions();

    clearInterval(timer);
    startTimer();

    const currentQuestion = questions[currentIndex];

    questionNumberEle.textContent = `Question ${currentIndex +1} of ${totalQuestions}`;
    questionTextEle.textContent = currentQuestion.question;

    currentQuestion.option.forEach((optionText, index) => {
        const li = document.createElement('li');
        li.textContent = optionText;
        li.addEventListener('click',() => handleOptionClick(index));
        optionListEle.appendChild(li);
    });

    if(currentIndex === totalQuestions - 1){
        nextBtn.textContent = "Finish Quiz";
    }else{
        nextBtn.textContent = "Next Question";
    }

    nextBtn.disabled = true;
}

function handleOptionClick(selectedindex) {
    const currentQuestion = questions[currentIndex];
    const correctIndex = currentQuestion.correctIndex;

    clearInterval(timer);

    const optionLi = optionListEle.querySelectorAll('li');
    optionLi.forEach((li, idx) => {
        if(idx === correctIndex){
            li.classList.add("correct-ans");
        }
        if(idx === selectedindex && selectedindex !== correctIndex){
            li.classList.add("incorrect-ans");
        }
        li.style.pointerEvents = "none";

    });
    if(selectedindex === correctIndex){
        score ++;
    }
    nextBtn.disabled = false;

}

function clearOptions(){
    optionListEle.innerHTML = "";

}
nextBtn.addEventListener('click', () => {
    currentIndex ++;
    if(currentIndex < totalQuestions){
        displayQuestions();
    }else{
        endQuiz();
    }
});

function endQuiz(){
    document.getElementById("quiz-content").classList.add("hidden");
    scoreboardEle.classList.remove("hidden");

    if(score >= 8){
    scoreMessageEle.textContent = `<strong>Excellent! You scored ${score}/${totalQuestions}</strong>`;
    }
    else if(score >= 5){
        scoreMessageEle.textContent = `<strong>Good job! You scored ${score}/${totalQuestions}</strong>`;
    }
    else{
        scoreMessageEle.textContent = `<strong>Keep practicing! You scored ${score}/${totalQuestions}</strong>`;
    }
}

restartBtn.addEventListener('click', () =>{
    intializeQuiz();
});

function ShuffleArray(array){
    const arr = [...array];

    for(let i=arr.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

