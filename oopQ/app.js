class Quiz {
        constructor(questions, questionElement, answerButtons, nextButton, startButton, _usernameInput, welcomePage, quizPage) {
        this.questions = questions;
        this.questionElement = questionElement;
        this.answerButtons = answerButtons;
        this.nextButton = nextButton;
        this.startButton = startButton;
        this._usernameInput = _usernameInput;
        this.welcomePage = welcomePage;
        this.quizPage = quizPage;
        this.currentQuestionIndex = 0;
        this.score = 0;

        this.startButton.addEventListener("click", () => this.startQuiz());
        this.nextButton.addEventListener("click", () => this.handleNextButton());
        this.showWelcomePage();
    }

    showWelcomePage() {
        this.welcomePage.style.display = "block";
        this.quizPage.style.display = "none";
    }

    startQuiz() {
        const username = this._usernameInput.value.trim();
        if (username === "") {
            alert("Please enter your username.");
            return;
        }

        this.username = username;

        const usernameDisplay = document.getElementById("username-display");
        usernameDisplay.innerText = `${this.username}`;

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.nextButton.innerHTML = "Next";
        this.showQuizPage();
        this.showQuestion();
    }

    showQuizPage() {
        this.welcomePage.style.display = "none";
        this.quizPage.style.display = "block";
    }

    showQuestion() {
        this.resetState();
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const questionNo = this.currentQuestionIndex + 1;
        this.questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            this.answerButtons.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", () => this.selectAnswer(index));
        });
    }

    resetState() {
        this.nextButton.style.display = "none";
        while (this.answerButtons.firstChild) {
            this.answerButtons.removeChild(this.answerButtons.firstChild);
        }
    }

    selectAnswer(index) {
        const selectedButton = this.answerButtons.children[index];
        const isCorrect = selectedButton.dataset.correct === "true";
        if (isCorrect) {
            selectedButton.classList.add("correct");
            this.score++;
        } else {
            selectedButton.classList.add("incorrect");
        }

        Array.from(this.answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        this.nextButton.style.display = "block";
    }

    showScore() {
        this.resetState();
        this.questionElement.innerHTML = `${this._usernameInput.value}, your score: ${this.score} out of ${this.questions.length}!`;
        this.nextButton.innerHTML = "Play Again";
        this.nextButton.style.display = "block";
    }

    handleNextButton() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showScore();
        }
    }
}
class CustomQuiz extends Quiz {
    constructor(questions, questionElement, answerButtons, nextButton, startButton, usernameInput, welcomePage, quizPage) {
        super(questions, questionElement, answerButtons, nextButton, startButton, usernameInput, welcomePage, quizPage);
        // Tambahan properti atau metode khusus untuk kelas turunan dapat ditambahkan di sini
    }

    // Contoh overriding pada metode showScore()
    showScore() {
        this.resetState();
        this.questionElement.innerHTML = `${this._usernameInput.value}, your custom score: ${this.score} out of ${this.questions.length}!`;
        this.nextButton.innerHTML = "Custom Play Again";
        this.nextButton.style.display = "block";
    }
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const usernameInput = document.getElementById("username");
const welcomePage = document.querySelector(".welcome-page");
const quizPage = document.querySelector(".quiz");
const questions = [
    {
        question: "Berapakah 7 * 3 + 5 * 4 / 2",
        answers: [
            { text: "52", correct: false },
            { text: "31", correct: true },
        ],
    },
    {
        question: "Berang-berang hidup di?",
        answers: [
            { text: "terserah dia mau dimana", correct: false },
            { text: "perairan daerah hutan", correct: true },
        ],
    },
    {
        question: "Mana pernyataan ini yang benar?",
        answers: [
            { text: "Pria jawa tidak boleh menikahi pria sunda", correct: true },
            { text: "billie elish orang nganjuk", correct: false },
        ],
    },
];

const customQuiz = new CustomQuiz(questions, questionElement, answerButtons, nextButton, startButton, usernameInput, welcomePage, quizPage);
const quiz = new Quiz(questions, questionElement, answerButtons, nextButton, startButton, usernameInput, welcomePage, quizPage);
let clickCount = 0

console.log(quiz.nextButton)
quiz.nextButton.addEventListener("click", ()=> {
    clickCount++
    if(clickCount == 4){
        quiz.showWelcomePage();
        console.log("success")
    }
  
})