// Get all questions from quiz.html
const questions = document.querySelectorAll(".question-box");

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

// Marks for options A, B and C in each question
const scores = [
    { A: 2, B: 1, C: 3 }, // Question 1
    { A: 3, B: 2, C: 1 }, // Question 2
    { A: 3, B: 1, C: 2 }, // Question 3
    { A: 3, B: 2, C: 1 }, // Question 4
    { A: 3, B: 1, C: 2 }, // Question 5
    { A: 3, B: 1, C: 2 }, // Question 6
    { A: 2, B: 3, C: 1 }, // Question 7
    { A: 1, B: 3, C: 2 }, // Question 8
    { A: 2, B: 1, C: 3 }, // Question 9
    { A: 3, B: 1, C: 2 }  // Question 10
];

// Display only the current question
function showQuestion(index) {
    questions.forEach((question, i) => {
        question.style.display = i === index ? "block" : "none";
    });

    // Update question progress
    const progress = document.getElementById("questionProgress");

    if (progress) {
        progress.textContent =
            `Question ${index + 1} of ${questions.length}`;
    }

    // Update question number, if available
    const number = questions[index].querySelector(".question-number");

    if (number) {
        number.textContent =
            `QUESTION ${String(index + 1).padStart(2, "0")}`;
    }
}

// Select an answer and highlight it
function selectOption(button) {
    const currentBox = questions[currentQuestion];

    const options = currentBox.querySelectorAll(".option");

    // Remove the selected style from all options
    options.forEach(option => {
        option.classList.remove("selected");
    });

    // Highlight the clicked option
    button.classList.add("selected");

    // Save A, B or C
    const answer = button.textContent.trim().charAt(0);

    answers[currentQuestion] = answer;
}

// Go to the next question
function nextQuestion() {
    if (answers[currentQuestion] === null) {
        alert("Please select an option before continuing!");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// Calculate the final score and open the result page
function checkResult() {
    if (answers[currentQuestion] === null) {
        alert("Please select an option before submitting!");
        return;
    }

    // Make sure every question has been answered
    if (answers.some(answer => answer === null)) {
        alert("Please answer all 10 questions!");
        return;
    }

    let totalScore = 0;

    answers.forEach((answer, index) => {
        totalScore += scores[index][answer];
    });

    // Save answers and score for result.js
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    localStorage.setItem("totalScore", totalScore);

    // Open the result page
    window.location.href = "result.html";
}

// Connect the Submit Quiz button
const resultButton = document.getElementById("checkResult");

if (resultButton) {
    resultButton.addEventListener("click", checkResult);
}

// Show the first question when the page loads
showQuestion(currentQuestion);