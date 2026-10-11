// Get HTML Elements
const agreeCheckbox = document.getElementById("agreeCheckbox");
const nextButton = document.getElementById("nextButton");
const message = document.getElementById("message");

// Initially, keep the button disabled
nextButton.disabled = true;

// Enable or disable the button when checkbox changes
agreeCheckbox.addEventListener("change", function () {

    if (agreeCheckbox.checked) {
        nextButton.disabled = false;
        message.textContent = "";
    } else {
        nextButton.disabled = true;
        message.textContent = "";
    }

});

// Open Quiz Page when the button is clicked
nextButton.addEventListener("click", function () {

    if (agreeCheckbox.checked) {
        window.location.href = "quiz.html";
    } else {
        message.textContent = "Please agree to the quiz rules first.";
    }

});