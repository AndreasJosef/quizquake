export function QuestionComponent() {

    const root = document.createElement('div')

    const questionElement = document.createElement('h2');

    root.append(questionElement)
    // DOM HTML



    // update
    function update({ question, ready }) {
        if (ready) questionElement.textContent = question
    }

    return {
        el: root,
        update
    }
}