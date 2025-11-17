export function createRenderer({ bus, children }) {

    function render(state) {

        children.forEach(child => {
            let propsUpdate = child.slice(state);

            if (child.component.update) {
                child.component.update(propsUpdate);
            }
        });
    }

    function mount() {

        children.forEach(child => {
            const childContainer = document.querySelector(child.childRoot);

            childContainer.appendChild(child.component.el);
        })

    }

    bus.on('state', (updatedState) => {

        render(updatedState);
    })

    return { mount }
}