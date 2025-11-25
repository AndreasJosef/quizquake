export function Question() {

    const root = document.createElement('div')
    const questionElement = document.createElement('h2');

    root.append(questionElement)

    // update
    function update({ question, phase }) {
        if (question === questionElement.textContent) return;

        questionElement.textContent = question
    }

    function mount() {
    }

    return {
        el: root,
        update,
        mount
    }
}

// Effects
function updateVisuals() {
    const percentage = secondsRemaining / TOTAL_TIME;

    const curveFactor = 1.5; //exponenten. 1 är linjär kurva som vi hade tidigare.

    const adjustedPercentage = Math.pow(percentage, curveFactor); // pow() är potens

    const hue = adjustedPercentage * 120;

    document.body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
}