let outputElement; // changed among handlers, make global

function loadHandler() {
    let alertButton = document.getElementById('alert');
    let confirmButton = document.getElementById('confirm');
    let promptButton = document.getElementById('prompt');
    let saferPromptButton = document.getElementById('sPrompt');

    alertButton.addEventListener('click', alertHandler);
    confirmButton.addEventListener('click', confirmHandler);
    promptButton.addEventListener('click', promptHandler);
    saferPromptButton.addEventListener('click', saferPromptHandler);

    outputElement = document.getElementById('output');
}

function alertHandler() {
    outputElement.innerHTML = "";
    alert('This is an alert.');
}

function confirmHandler() {
    outputElement.innerHTML = "";
    let outputText = "Confirm result: ";
    let selection = confirm('Select an option.');
    outputText += selection.toString();
    outputElement.innerHTML = outputText;
}

function promptHandler() {
    outputElement.innerHTML = "";
    const promptText = "What is your name?";

    let answer = prompt(promptText);
    if(answer == null) {
        answer = "User didn\'t write anything";
    }
    
    const outputText = "Prompt result: " + answer;
    outputElement.innerHTML = outputText;
}

function saferPromptHandler() {
    outputElement.innerHTML = "";
    const promptText = "What is your name?";

    function getOutputText(strings, answer) {
        const promptResultText = strings[0];
        const answerText = answer == null ? "User didn\'t write anything" : answer;

        return `${promptResultText}${answerText}`;
    }

    let answer = DOMPurify.sanitize(prompt(promptText));
    
    const outputText = getOutputText`Prompt result: ${answer}`;
    outputElement.innerHTML = outputText;
}

window.addEventListener('DOMContentLoaded', loadHandler);