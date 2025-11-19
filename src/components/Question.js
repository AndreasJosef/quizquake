export function Question() {

    const root = document.createElement('div')
    root.style.display = 'none'

    const questionElement = document.createElement('h2');
    const clockSlot = document.createElement('div')
    const controlsSlot = document.createElement('div');

    clockSlot.className = 'slot-clock'
    controlsSlot.className = 'slot-controls'

    root.append(questionElement, clockSlot, controlsSlot)

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