export function Question() {

    const root = document.createElement('div')

    const questionElement = document.createElement('h2');

    root.append(questionElement)

    // update
    function update({ question, phase }) {
        questionElement.textContent = question
    }

    return {
        el: root,
        update
    }
}