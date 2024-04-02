//All questions here //
const questions = [
    new Question(
      "Who was the first writer of Gothic literature?",
      ["Bram Stoker", "Edgar Allan Poe", "Horace Walpole", "J. R. R. Tolkien"],
      "Horace Walpole"
    ),
    new Question(
      "Who was the first female writer of Gothic literature?",
      ["Ann Radcliffe", "Mary Shelley", "Morticia Addams", "Charlotte Brontë"],
      "Ann Radcliffe"
    ),
    new Question(
      "Who was the master of Gothic form?",
      ["Oscar Wilde", "Edgar Allan Poe", "Peter Steele", "Bruce Dickinson"],
      "Edgar Allan Poe"
    ),
    new Question(
      "What was the most successful Gothic novel at all times?",
      [
        "The Phantom of the Opera by Gaston Leroux",
        "The Castle of Otranto by Horace Walpole",
        "Dracula by Bram Stoker",
        "Star Wars: Return of the Jedi",
      ],
      "Dracula by Bram Stoker"
    ),
    new Question(
      "Who is the father of Gothic architecture?",
      [
        "Abbot Suger",
        "Sheldon Cooper",
        "Luke Skywalker",
        "Eugène Viollet-le-Duc ",
      ],
      "Abbot Suger"
    ),
    new Question(
      "What is the oldest Gothic art?",
      [
        "Abbey Church of St Denis",
        "Death Star",
        "Duomo di Milano",
        "Cathedral of Notre-Dame of Reims",
      ],
      "Abbey Church of St Denis"
    ),
    new Question(
      "Who was the original goth in history?",
      [
        "The Simpsons",
        "The Gutones in the 1st century",
        "Gandalf from Middle Earth",
        "The Cure fans from all over the globe",
      ],
      "The Gutones in the 1st century"
    ),
  ];
  
  function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
  
    this.currentQuestionIndex = 0;
  }
  
  //Create Quiz here
  let quiz = new Quiz(questions);
  
  Quiz.prototype.guess = function (answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  };
  
  Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
  };
  
  Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
  };
  
  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  
  Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
  };
  
  let QuizUI = {
    init: function (questions) {
      quiz.questions = questions; // Set questions for the quiz here
      this.displayNext(); // Start displaying the quiz here
    },
  
    displayNext: function () {
      if (quiz.hasEnded()) {
        this.displayScore();
      } else {
        this.displayQuestion();
        this.displayChoices();
        this.displayProgress();
      }
    },
  
    displayQuestion: function () {
      this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
  
    displayChoices: function () {
      let choices = quiz.getCurrentQuestion().choices;
  
      for (let i = 0; i < choices.length; i++) {
        this.populateIdWithHTML("choice" + i, choices[i]);
        this.guessHandler("guess" + i, choices[i]);
      }
    },
  
    displayScore: function () {
      let gameOverHTML = "<h1>Game Over</h1>";
      gameOverHTML +=
        "<h2>Your score is: " +
        quiz.score +
        " / " +
        quiz.questions.length +
        "</h2>";
      this.populateIdWithHTML("quiz", gameOverHTML);
    },
  
    populateIdWithHTML: function (id, text) {
      let element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      } else {
        console.error("Element with id " + id + " not found.");
      }
    },
  
    guessHandler: function (id, guess) {
      let element = document.getElementById(id);
      let self = this;
      if (element) {
        element.onclick = function () {
          quiz.guess(guess);
          self.displayNext();
        };
      } else {
        console.error("Element with id " + id + " not found.");
      }
    },
  
    displayProgress: function () {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      let progressText =
        "Question " + currentQuestionNumber + " of " + quiz.questions.length;
      this.populateIdWithHTML("progress", progressText);
    },
  };
  
  document.getElementById('restartQuizBtn').addEventListener('click', function() {
    // Redirect to the quiz page
    window.location.reload();
  });

// Get references to the welcome and quiz divs
const welcomeDiv = document.getElementById("welcome");
const quizDiv = document.getElementById("quiz");
const restartQuizBtn = document.getElementById("restartQuizBtn");

// Get reference to the start button
const startButton = document.getElementById("startQuizBtn");

// Add click event listener to the start button
startButton.addEventListener("click", function() {
  // Hide the welcome div
  welcomeDiv.classList.add("hidden");
  // Show the quiz div
  quizDiv.classList.remove("hidden");
  restartQuizBtn.classList.remove("hidden");
});
  
   
  //Display Quiz
  QuizUI.displayNext();
  