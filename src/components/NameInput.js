export function NameInput(){

    const root = document.createElement('div');
    let nameInput =  document.createElement('input');
    let submitButton = document.createElement('button');

    nameInput.type = 'text';
    nameInput.placeholder = 'Enter your Name';

    submitButton.textContent = 'Confirm'

    root.append(nameInput, submitButton);

    return {
        el: root
    }
}