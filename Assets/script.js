// ---PSUEDOCODE---
// 1. Create an event listner and confirm the start button click is being logged.
// 2. Create a timer that starts when the start button is clicked.
// 3. When timer starts a question appears.
// 4. Present another question when answered correctly.
// 5. Subtract time 10 seconds when answered incorrectly.
// 6. When all questions are answered end game.
// 7. When timer reaches 0, end game
// 8. When game is over save intials and score
// 9. Show high scores
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
var playAgainButton = document.getElementById("play-again-button");
var homeButton = document.getElementById("home-button");
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
var scores = [];

highscoresWindow.style.display = 'none';

// 1.------------------------------------------------------------------------
function startGame() {
    console.log("Click Confirmed");
    startWindow.style.display = "none";
    quiz.style.display = "block";
    highscoresWindow.style.display = 'none';
    playAgainButton.style.display = 'none';
    startTimer()
    showQuestion()
  }



// 2.--------------------------------------------------------------
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    timeRemaining--;
    timerEl.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// // 3.---------------------------------------------------------------
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionWindow.textContent = currentQuestion.question;

  answersWindow.innerHTML = '';

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

// // 4.--------------------------------------------------------------
function checkAnswer(event) {
  var selectedChoiceIndex = parseInt(this.getAttribute("data-index"));
  var currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.options[selectedChoiceIndex] === currentQuestion.correctAnswer) {
    score++;
    feedbackWindow.textContent = "Correct!";
  }

// // 5.---------------------------------------------------------------
  else {
    timeRemaining -= 10;
    feedbackWindow.textContent = "Wrong!";
  }

// // 6.---------------------------------------------------------------
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    currentQuestionIndex = 0;
    endQuiz();
  }
}

// // 7.----------------------------------------------------------------
function endQuiz() {
  clearInterval(timerInterval);
  quiz.style.display = 'none';
  resultWindow.style.display = 'block';
  timerEl.style.display = 'none';
  scoreWindow.textContent = score;

  scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    saveScore();
    playAgainButton.style.display = 'block';
    playAgainButton.addEventListener('click', function(event) {
      event.preventDefault();
      startWindow.style.display = "block";
      quiz.style.display = "none";
      resultWindow.style.display = "none";
      highscoresWindow.style.display = "none";
      initialsContainer.value = "";
      scoreForm.style.display = 'block';
      timerEl.style.display = "block";
      feedbackWindow.style.display = "none";
      timeRemaining = 75;
      currentQuestionIndex = 0;
      score = 0;
      timerEl.textContent = timeRemaining;
      startGame();
    });
  });
}

// // 8.---------------------------------------------------------------
function saveScore(event) {
  // event.preventDefault();

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

//   // Retrieve scores from localStorage
//   getScoresFromLocalStorage();


//   // Display the high scores
//   for (var i = 0; i < scores.length; i++) {
//     var scoreItem = document.createElement('li');
//     scoreItem.textContent = scores[i].initials + ' - ' + scores[i].score;
//     highscoresList.appendChild(scoreItem);
//   }

  // Retrieve scores from localStorage
  var scoreData = localStorage.getItem("Score");

  // Display the high scores
  if (scoreData) {
    var scores = JSON.parse(scoreData);
    var uniqueScores = [];

    for (var i = 0; i < scores.length; i++) {
      var scoreItem = scores[i].initials + ' - ' + scores[i].score;

      uniqueScores[scoreItem] = true;
    }

    Object.keys(uniqueScores).forEach(function(score) {
      var listItem = document.createElement('li');
      listItem.textContent = scoreItem;
      highscoresList.appendChild(scoreItem);
    });
  }
  homeButton.addEventListener("click", function() {
    startWindow.style.display = "block";
    startButton.style.display = 'block';
    quiz.style.display = "none";
    resultWindow.style.display = "none";
    highscoresWindow.style.display = "none";
    timerEl.style.display = "none";
    feedbackWindow.style.display = "none";
    clearInterval(timerInterval);
    currentQuestionIndex = 0;
    score = 0;
  });
}

startButton.addEventListener("click", startGame);
viewHighscoresButton.addEventListener('click', printHighScores);
