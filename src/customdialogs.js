let outputElement; // changed among handlers, make global

function loadHandler() {
    outputElement = document.getElementById('output');

    let alertButton = document.getElementById('alert');
    let confirmButton = document.getElementById('confirm');
    let promptButton = document.getElementById('prompt');

    let alertContainer = document.getElementById('alertContainer');
    // const confirmContainer = document.querySelector('confirmContainer');
    // const promptContainer = document.querySelector('promptContainer');

    let alertTemplate = document.getElementById('alertDialog');
    let confirmTemplate = document.getElementById('confirmDialog');
    confirmTemplate.returnValue = false;

    let promptTemplate = document.getElementById('promptDialog');

    const confirmOKButton = document.getElementById('confirmOK'); // true
    const confirmCancelButton = document.getElementById('confirmCancel'); // false

    const promptOKButton = document.getElementById('promptOK');
    const promptUserName = document.getElementById('promptUserName');

    // const alertClone = alertTemplate.content.cloneNode(true);
    // const confirmClone = confirmTemplate.content.cloneNode(true);
    // const promptClone = promptTemplate.content.cloneNode(true);
    // 
    // confirmContainer.appendChild(confirmClone);
    // promptContainer.appendChild(promptClone);
    
    alertButton.addEventListener('click', () => {
        alertTemplate.showModal();
        // alertContainer.appendChild(alertClone);
    });
    confirmButton.addEventListener('click', () => {
        confirmTemplate.showModal();
    });
    confirmOKButton.addEventListener('click', () => {
        confirmTemplate.returnValue = true;
    })
    confirmCancelButton.addEventListener('click', () => {
        confirmTemplate.returnValue = false;
    })
    confirmTemplate.addEventListener('close', () => {
        outputElement.innerHTML = `Confirm result: ${confirmTemplate.returnValue}`;
    })

    // "Prompt" button: opens dialog; showModal()
    promptButton.addEventListener('click', () => {
        promptTemplate.showModal();
    });
    // Text input field: assign prompt's "OK" button's value to user input
    promptUserName.addEventListener('change', () => {
        promptOKButton.value = DOMPurify.sanitize(promptUserName.value);
    });
    // Prompt dialog: set output to the dialog's return value, which is 
    promptTemplate.addEventListener('close', () => {
        outputElement.innerHTML = `Prompt result: ${promptTemplate.returnValue}`;
    })

    alertTemplate.addEventListener('close', () => {
        outputElement.innerHTML = "Test";
    })

    // outputElement = document.getElementById('output');
}


window.addEventListener('DOMContentLoaded', loadHandler);