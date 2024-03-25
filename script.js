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
    return this.questions[this.currentQuestionIndex]
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
        var choices = quiz.CurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choice[i]);
        }
    },
    displayScore: function () {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2>Your score is: " + quiz.score + " / 5 </h2>"
        this.populateIdWithHTML("quiz", gameOverHTML);
    },

    populateIdWithHTML: function (id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function (id, guess) {
        var element = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    displayProgress: function () {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question" + currentQuestionNumber + "of" + quiz.questions.length);

    }
};

//Questions here//
var Question = [
    new Question("Who were the first writers of Gothic literature?", [ "Bram Stoker", "Edgar Allan Poe", "Horace Walpole", "Ann Radcliffe"],
        "Horace Walpole"),
    new Question("Who was the first female Gothic writer?", ["Ann Radcliffe", "Mary Shelley", "Emily Jane Brontë", "Charlotte Brontë"],
        "Ann Radcliffe"),
    new Question("Who was the master of Gothic form?", ["Oscar Wilde", "Edgar Allan Poe", "William Thomas Beckford", "Henry James OM"],
        "Edgar Allan Poe"),
    new Question("What was the most successful Gothic novel?", ["The Phantom of the Opera by Gaston Leroux", "The Castle of Otranto by Horace Walpole", "Dracula by Bram Stoker", "Strange Case of Dr Jekyll and Mr Hyde by Robert Louis Stevenson"],
        "Dracula by Bram Stoker"),
    new Question("Who is the father of Gothic architecture?", ["Abbot Suger","Peter Parler","Arnolfo di Cambio","Eugène Viollet-le-Duc "], "Abbot Suger"),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();