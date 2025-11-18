export function QuestionComponent() {

    const root = document.createElement('div')
    root.style.display = 'none'

    const questionElement = document.createElement('h2');

    root.append(questionElement)

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