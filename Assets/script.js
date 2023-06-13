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
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheet", "Controlled Style Sheet", "Carbon Steel Side", "Cascading Score Sheet"],
    correctAnswer: "Cascading Style Sheet"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hardtime Money Language", "Hypertext Markup Language", "Hypertext Markdown Language", "Hyperlink Marking Language"],
    correctAnswer: "Hypertext Markup Language"
  },
  {
    question: "What is the correct syntax to declare a JavaScript variable?",
    options: ["var carName;", "variable carName;", "v carName;"],
    correctAnswer: "var carName;"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<script>"],
    correctAnswer: "<script>"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    options: ["The <head> section", "The <body> section", "Both the <head> and <body> section"],
    correctAnswer: "Both the <head> and <body> section"
  }
];



// DOM Navigation
var quiz = document.getElementById('quiz-window');
var startWindow = document.getElementById("start-window");
var startButton = document.getElementById("start-button");
var questionWindow = document.getElementById('questions');
var answersWindow = document.getElementById('answers');
var feedbackWindow = document.getElementById('feedback');
var timerEl = document.getElementById("time-remaining");
var resultWindow = document.getElementById("result-window");
var scoreWindow = document.getElementById('final-score');
var scoreForm = document.getElementById("score-form");
var initialsContainer = document.getElementById('initials');
var viewHighscoresButton = document.getElementById('view-highscores');
var highscoresList = document.getElementById('highscores-list');
var highscoresWindow = document.getElementById('highscores-container');


var currentQuestionIndex = 0;
var score = 0;
var timeRemaining = 75;
var timer;
var scores = [];



// 1.------------------------------------------------------------------------
function startGame() {
    // Test to make sure the click is being recieved.
    console.log("Click Confirmed");
    startWindow.style.display = "none";
    quiz.style.display = "block";
    startTimer()
    showQuestion()
  }

startButton.addEventListener("click", startGame);

// 2.--------------------------------------------------------------
function startTimer() {
  timerInterval = setInterval(function() {
    timeRemaining--;
    timerEl.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
}

// 3.---------------------------------------------------------------
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionWindow.textContent = currentQuestion.question;

  // Clear previous options
  answersWindow.innerHTML = '';

  // Create option buttons for the current question
  for (let i = 0; i < currentQuestion.options.length; i++) {
    var choice = currentQuestion.options[i];
    var li = document.createElement("li");
    var button = document.createElement("button");

    button.textContent = choice;
    button.setAttribute("data-index", i);
    button.addEventListener("click", checkAnswer);

    li.appendChild(button);
    answersWindow.appendChild(li);
  }
}

// 4.--------------------------------------------------------------
function checkAnswer(event) {
  var selectedChoiceIndex = parseInt(this.getAttribute("data-index"));
  var currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.options[selectedChoiceIndex] === currentQuestion.correctAnswer) {
    score++;
    feedbackWindow.textContent = "Correct!";
  }

// 5.---------------------------------------------------------------
  else {
    timeRemaining -= 10;
    feedbackWindow.textContent = "Wrong!";
  }

// 6.---------------------------------------------------------------
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// 7.----------------------------------------------------------------
function endQuiz() {
  quiz.style.display = 'none';
  resultWindow.style.display = "block";
  timerEl.style.display = 'none';
  scoreWindow.textContent = score;

  scoreForm.addEventListener("submit", saveScore);
}

// 8.---------------------------------------------------------------
function saveScore(event) {
  event.preventDefault();

  initialsContainer.value.toUpperCase();
  // Save initials and score to storage
  var initials = initialsContainer.value;
  localStorage.setItem("Initials", initials);
  localStorage.setItem("Score", score);
  
  var highScoresElement = document.createElement("p");
  highScoresElement.textContent = initials + ": " + score;
  highscoresWindow.appendChild(highScoresElement);

  var scoreForm = document.getElementById("score-form");
  scoreForm.style.display = "none";
}



viewHighscoresButton.addEventListener('click', printHighScores);

// Function to print high scores
function printHighScores() {
  startButton.style.display = 'none';
  highscoresWindow.style.display = 'block';
  highscoresList.innerHTML = '';

  // Retrieve scores from localStorage
  var scoreData = localStorage.getItem("Score")

  // Sort scores in descending order
  scores.sort((a, b) => b.score - a.score);

  // Display the high scores
  if (scoreData) {
    var scores = JSON.parse(scoreData);
    for (var i = 0; i < scores.length; i++) {
      var scoreItem = document.createElement('li');
      scoreItem.textContent = scores[i].initials + ' - ' + scores[i].score;
      highscoresList.appendChild(scoreItem);
  }
  }
 

}
