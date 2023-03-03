let outputElement; // changed among handlers, make global

function loadHandler() {
    outputElement = document.getElementById('output');

    let alertButton = document.getElementById('alert');
    let confirmButton = document.getElementById('confirm');
    let promptButton = document.getElementById('prompt');

    let alertContainer = document.getElementById('alertContainer');
    // const confirmContainer = document.querySelector('confirmContainer');
    // const promptContainer = document.querySelector('promptContainer');

    let alertDialog = document.getElementById('alertDialog');
    let confirmDialog = document.getElementById('confirmDialog');
    confirmDialog.returnValue = false;

    let promptDialog = document.getElementById('promptDialog');

    const confirmOKButton = document.getElementById('confirmOK'); // true
    const confirmCancelButton = document.getElementById('confirmCancel'); // false

    const promptOKButton = document.getElementById('promptOK');
    const promptUserName = document.getElementById('promptUserName');

    alertButton.addEventListener('click', () => {
        alertDialog.showModal();
        // alertContainer.appendChild(alertClone);
    });
    confirmButton.addEventListener('click', () => {
        confirmDialog.showModal();
    });
    confirmOKButton.addEventListener('click', () => {
        confirmDialog.returnValue = true;
    })
    confirmCancelButton.addEventListener('click', () => {
        confirmDialog.returnValue = false;
    })
    confirmDialog.addEventListener('close', () => {
        outputElement.innerHTML = `Confirm result: ${confirmDialog.returnValue}`;
    })

    // "Prompt" button: opens dialog; showModal()
    promptButton.addEventListener('click', () => {
        promptDialog.showModal();
    });
    // Text input field: assign prompt's "OK" button's value to user input
    promptUserName.addEventListener('change', () => {
        promptOKButton.value = DOMPurify.sanitize(promptUserName.value);
    });
    // Prompt dialog: set output to the dialog's return value, which is 
    promptDialog.addEventListener('close', () => {
        outputElement.innerHTML = `Prompt result: ${promptDialog.returnValue}`;
    })

    alertDialog.addEventListener('close', () => {
        outputElement.innerHTML = "Test";
    })

    // outputElement = document.getElementById('output');
}


window.addEventListener('DOMContentLoaded', loadHandler);