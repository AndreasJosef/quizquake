export function Question() {

    const root = document.createElement('div')
    root.style.display = 'none'

    const questionElement = document.createElement('h2');
    const clockSlot = document.createElement('div')

    clockSlot.className = 'slot-clock'

    root.append(questionElement, clockSlot)

    // DOM HTML
    const trueButton = document.createElement('button');
    trueButton.textContent = 'True'

    const falseButton = document.createElement('button');
    falseButton.textContent = 'False'

    root.append(trueButton, falseButton)

    // update
    function update({ question, ready }) {
        if (ready) {
            root.style.display = 'block';
            questionElement.textContent = question
        }
    }

    return {
        el: root,
        update
    }
}