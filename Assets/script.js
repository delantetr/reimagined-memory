// ---PSUEDOCODE---
// 1. Create an event listner and confirm the start button click is being logged.
// 2. Create a timer that starts when the start button is clicked.
// 3. When timer starts a question appears.
// 4. Present another question when answered correctly.
// 5. Subtract time 10 seconds when answered incorrectly.
// 6. When all questions are answered end game.
// 7. When timer reaches 0, end game
// 8. When game is over save intials and score
// ------------------------------------------------------------------------------------------------

var questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Venus"],
    correctAnswer: "Jupiter"
  }
];



// DOM Navigation
var quiz = document.getElementById('main');
var startButton = document.getElementById("start-button");
var questionWindow = document.getElementById('questions');
var answersWindow = document.getElementById('answers');
var feedbackWindow = document.getElementById('feedback');
var timerEl = document.getElementById("timer-count");
var scoreWindow = document.getElementById('score');


var currentQuestionIndex = 0;
var score = 0;
var timeRemaining = 75;
var timer;



// 1.------------------------------------------------------------------------
function startGame() {
    // Test to make sure the click is being recieved.
    console.log("Click Confirmed");
    startTimer()
    showQuestion()
  }

startButton.addEventListener("click", startGame);

// 2.--------------------------------------------------------------
function startTimer() {
  var timer = setInterval(updateTimer, 1000)
}

function updateTimer() {
timeRemaining--;
timerEl.textContent = timeRemaining;
}

// 3.---------------------------------------------------------------
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionWindow.textContent = currentQuestion.question;

  // Clear previous options
  answersWindow.innerHTML = '';

  // Create option buttons for the current question
  for (let i = 0; i < currentQuestion.options.length; i++) {
    var optionButton = document.createElement('button');
    optionButton.textContent = currentQuestion.options[i];
    optionButton.addEventListener('click', checkAnswer);
    answersWindow.appendChild(optionButton);
  }
}

// 4.--------------------------------------------------------------
function checkAnswer(event) {
  var selectedAnswer = event.target;
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer.textContent === currentQuestion.correctAnswer) {
    score++
    feedbackWindow.textContent = "Correct!";
  } 

// 5.---------------------------------------------------------------
  else {
    timeRemaining -= 10;
    feedbackWindow.textContent = "Wrong!";
  }

// 6.---------------------------------------------------------------
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  }
  else {
    showQuestion();
  }
}

// 7.----------------------------------------------------------------
function endQuiz() {
  clearInterval(timer);
  quiz.style.display = 'none';

  answersWindow.textContent = 'Your Score' + score;

  var initials = prompt('Please enter your initials:');
  saveScore(initials, score);
}

// 8.---------------------------------------------------------------
function saveScore(initials, score) {
  var scoreData = {initials, score};
  localStorage.setItem('quizScore', scoreData);
}