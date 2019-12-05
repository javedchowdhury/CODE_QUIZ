function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
}


function populate() {
  if (quiz.isEnded()) {
    showScores();
  }
  else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
  new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
  new Question("The condition in an if / else statement is enclosed within ____.", ["quotes", "curly brackets", "parentheses", "square brackets"], "parentheses"),
  new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML", "CSS", "HTML"], "HTML"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),

];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();

function startTimer(duration, display) {
  var start = Date.now(),
    diff,
    minutes,
    seconds;
  function timer() {
    diff = duration - (((Date.now() - start) / 1000) | 0);


    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (diff <= 0) {
      start = Date.now() + 1000;
    }
  };
  timer();
  setInterval(timer, 1000);
}

window.onload = function () {
  var seconds = 10,
    display = document.querySelector('#time');
  startTimer(seconds, display);
};
