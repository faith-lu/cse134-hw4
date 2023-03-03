function loadHandler() {
    let outputElement;
    let alertButton = document.getElementById('alert');
    let confirmButton = document.getElementById('confirm');
    let promptButton = document.getElementById('prompt');
    let saferPromptButton = document.getElementById('sPrompt');

    alertButton.addEventListener('click', () => {
        outputElement.innerHTML = "";
        alert('This is an alert.');
    });
    confirmButton.addEventListener('click', () => {
        outputElement.innerHTML = "";
        let outputText = "Confirm result: ";
        let selection = confirm('Select an option.');
        outputText += selection.toString();
        outputElement.innerHTML = outputText;
    });
    promptButton.addEventListener('click', () => {
        outputElement.innerHTML = "";
        const promptText = "What is your name?";

        let answer = prompt(promptText);
        if(answer == null) {
            answer = "User didn\'t write anything";
        }
        
        const outputText = "Prompt result: " + answer;
        outputElement.innerHTML = outputText;
    });
    saferPromptButton.addEventListener('click', () => {
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
    });

    outputElement = document.getElementById('output');
}

window.addEventListener('DOMContentLoaded', loadHandler);