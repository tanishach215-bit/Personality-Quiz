// Get elements from result.html
const scoreValue = document.getElementById("scoreValue");
const scoreCircle = document.getElementById("scoreCircle");
const scoreCaption = document.getElementById("scoreCaption");

const personalityEmoji = document.getElementById("personalityEmoji");
const personalityTitle = document.getElementById("personalityTitle");
const personalityDescription =
    document.getElementById("personalityDescription");
const personalityTag = document.getElementById("personalityTag");

const retakeButton = document.getElementById("retakeButton");
const homeButton = document.getElementById("homeButton");

// Marks for A, B and C in each of the 10 questions
const scores = [
    { A: 2, B: 1, C: 3 },
    { A: 3, B: 2, C: 1 },
    { A: 3, B: 1, C: 2 },
    { A: 3, B: 2, C: 1 },
    { A: 3, B: 1, C: 2 },
    { A: 3, B: 1, C: 2 },
    { A: 2, B: 3, C: 1 },
    { A: 1, B: 3, C: 2 },
    { A: 2, B: 1, C: 3 },
    { A: 3, B: 1, C: 2 }
];

// Personality types based on total score
function getPersonality(score) {
    if (score >= 10 && score <= 14) {
        return {
            title: "Extrovert",
            emoji: "🌞",
            tag: "✨ Outgoing energy",
            description:
                "You may enjoy social interaction and expressing yourself. " +
                "You might feel energised by meeting people and sharing ideas. " +
                "Remember, everyone needs quiet time sometimes too!"
        };
    }

    if (score >= 15 && score <= 19) {
        return {
            title: "Restrained Introvert",
            emoji: "🌷",
            tag: "🌸 Calm and thoughtful",
            description:
                "You may prefer taking your time before opening up. " +
                "You can enjoy meaningful conversations while also " +
                "appreciating your own space. There is no rush to be " +
                "more outgoing than you feel comfortable being."
        };
    }

    if (score >= 20 && score <= 25) {
        return {
            title: "Introspective Introvert",
            emoji: "🌙",
            tag: "💜 Deep thinker",
            description:
                "You may enjoy reflecting on your thoughts and feelings. " +
                "Quiet moments and meaningful connections might matter to you. " +
                "Your perspective is valuable, and you can share it whenever " +
                "you feel ready."
        };
    }

    if (score >= 26 && score <= 30) {
        return {
            title: "Social and Anxious Introvert",
            emoji: "🦋",
            tag: "🩷 Growing at your pace",
            description:
                "You may sometimes feel hesitant in social situations while " +
                "still wanting to connect with others. Small steps can help " +
                "you feel more comfortable. This quiz cannot diagnose anxiety, " +
                "and your answers do not define your whole personality."
        };
    }

    return null;
}

// Calculate the score from saved answers if needed
function calculateScoreFromAnswers(answers) {
    if (!Array.isArray(answers) || answers.length !== scores.length) {
        return null;
    }

    let total = 0;

    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];

        if (!["A", "B", "C"].includes(answer)) {
            return null;
        }

        total += scores[i][answer];
    }

    return total;
}

// Animate the score number
function animateScore(finalScore) {
    const duration = 1000;
    const startTime = performance.now();

    function updateScore(currentTime) {
        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        // Smooth counting animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentScore = Math.round(finalScore * easedProgress);

        scoreValue.textContent = currentScore;

        if (progress < 1) {
            requestAnimationFrame(updateScore);
        } else {
            scoreValue.textContent = finalScore;
        }
    }

    requestAnimationFrame(updateScore);
}

// Show score and personality result
function displayResult() {
    const savedAnswers = localStorage.getItem("quizAnswers");
    const answers = savedAnswers ? JSON.parse(savedAnswers) : null;

    const savedScore = localStorage.getItem("totalScore");
    let totalScore = savedScore === null
        ? null
        : Number(savedScore);

    // Recalculate if the saved score is missing or invalid
    if (
        !Number.isInteger(totalScore) ||
        totalScore < 10 ||
        totalScore > 30
    ) {
        totalScore = calculateScoreFromAnswers(answers);
    }

    // Handle missing quiz results
    if (
        !Number.isInteger(totalScore) ||
        totalScore < 10 ||
        totalScore > 30
    ) {
        scoreValue.textContent = "--";
        scoreCaption.textContent = "Please complete the quiz first.";
        personalityEmoji.textContent = "🌷";
        personalityTitle.textContent = "Your result is waiting!";
        personalityDescription.textContent =
            "Answer all 10 questions to discover your personality result.";
        personalityTag.textContent = "✨ Start your quiz";

        scoreCircle.style.setProperty("--score-percent", "0%");
        retakeButton.textContent = "♡ Start Quiz";
        return;
    }

    // Display score
    scoreCaption.textContent = "Your score is out of 30 ✨";

    const percentage = (totalScore / 30) * 100;

    scoreCircle.style.setProperty(
        "--score-percent",
        percentage + "%"
    );

    animateScore(totalScore);

    // Display personality type
    const personality = getPersonality(totalScore);

    if (personality) {
        personalityEmoji.textContent = personality.emoji;
        personalityTitle.textContent = personality.title;
        personalityDescription.textContent = personality.description;
        personalityTag.textContent = personality.tag;
    }
}

// Retake quiz: clear previous results and start again
retakeButton.addEventListener("click", function () {
    localStorage.removeItem("totalScore");
    localStorage.removeItem("quizAnswers");

    // Remove older keys if they exist
    localStorage.removeItem("countA");
    localStorage.removeItem("countB");
    localStorage.removeItem("countC");

    window.location.href = "quiz.html";
});

// Go to home page
homeButton.addEventListener("click", function () {
    window.location.href = "index.html";
});

// Run when the result page opens
try {
    displayResult();
} catch (error) {
    scoreValue.textContent = "--";
    scoreCaption.textContent = "We couldn't load your result.";
    personalityTitle.textContent = "Please try the quiz again.";
    personalityDescription.textContent =
        "Return to the quiz, answer all questions, and submit your answers.";
    scoreCircle.style.setProperty("--score-percent", "0%");
}