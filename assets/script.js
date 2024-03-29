function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

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

var QuizUI = {
    quiz: new Quiz([]), // Create a new instance of Quiz

    init: function (questions) {
        this.quiz.questions = questions; // Set questions for the quiz
        this.displayNext(); // Start displaying the quiz
    },

    displayNext: function () {
        if (this.quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },

    displayQuestion: function () {
        this.populateIdWithHTML("question", this.quiz.getCurrentQuestion().text);
    },

    displayChoices: function () {
        var choices = this.quiz.getCurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },

    displayScore: function () {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2>Your score is: " + this.quiz.score + " / " + this.quiz.questions.length + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },

    populateIdWithHTML: function (id, text) {
        var element = document.getElementById(id);
        if (element) {
            element.innerHTML = text;
        } else {
            console.error("Element with id " + id + " not found.");
        }
    },

    guessHandler: function (id, guess) {
        var element = document.getElementById(id);
        var self = this;
        if (element) {
            element.onclick = function () {
                self.quiz.guess(guess);
                self.displayNext();
            };
        } else {
            console.error("Element with id " + id + " not found.");
        }
    },

    displayProgress: function () {
        var currentQuestionNumber = this.quiz.currentQuestionIndex + 1;
        var progressText = "Question " + currentQuestionNumber + " of " + this.quiz.questions.length;
        this.populateIdWithHTML("progress", progressText);
    }
};

//Questions here//
var questions = [
    new Question("Who was the first writer of Gothic literature?", ["Bram Stoker", "Edgar Allan Poe", "Horace Walpole", "J. R. R. Tolkien"],
        "Horace Walpole"),
    new Question("Who was the first female writer of Gothic literature?", ["Ann Radcliffe", "Mary Shelley", "Morticia Addams", "Charlotte Brontë"],
        "Ann Radcliffe"),
    new Question("Who was the master of Gothic form?", ["Oscar Wilde", "Edgar Allan Poe", "Peter Steele", "Bruce Dickinson"],
        "Edgar Allan Poe"),
    new Question("What was the most successful Gothic novel at all times?", ["The Phantom of the Opera by Gaston Leroux", "The Castle of Otranto by Horace Walpole", "Dracula by Bram Stoker", "Star Wars: Return of the Jedi"],
        "Dracula by Bram Stoker"),
    new Question("Who is the father of Gothic architecture?", ["Abbot Suger", "Sheldon Cooper", "Luke Skywalker", "Eugène Viollet-le-Duc "], "Abbot Suger"),
    new Question("What is the oldest Gothic art?", ["Abbey Church of St Denis", "Death Star", "Duomo di Milano", "Cathedral of Notre-Dame of Reims"], "Abbey Church of St Denis"),
    new Question("Who was the original goth in history?", ["The Simpsons", "The Gutones in the 1st century", "Gandalf from Middle Earth", "The Cure fans from all over the globe"], "The Gutones in the 1st century"),
  ];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();