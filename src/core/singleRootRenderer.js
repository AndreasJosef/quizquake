import { bus } from "./eventBus.js";

// createRendererSingleApp.js
export function createRendererSingleRoot({ rootComponent, children }) {

  // prepare an object for keeping a local state copy
  let lastState = {};

  // when renderer is created no child is mounted/initialized
  children.forEach(child => {

    child._initialized = false;
    child._mounted = false;

  });

  function resolveContainer(child) {

    const root = child.childRoot;

    if (typeof root === 'function') return root();
    if (typeof root === 'string') return document.querySelector(root);
    if (root instanceof Element) return root;

    return null;

  }

  function updateVisibility(state) {
    children.forEach(child => {
      if (!child._mounted) return

      const isVisible = child.visibleWhen ? child.visibleWhen(state) : true;

      child.component.el.style.display = isVisible ? '' : 'none';
    })
  }

  // mount root app to DOM (call init, append, mount, update)
  function mountRoot(rootSelector) {

    // init root
    if (typeof rootComponent.init === 'function') {
      rootComponent.init(lastState);
    }

    // append root to provided selector
    const rootEl = document.querySelector(rootSelector)

    rootEl.appendChild(rootComponent.el);

    if (typeof rootComponent.mount === 'function') rootComponent.mount(rootEl);

    // initial update so root reflects any lastState
    if (typeof rootComponent.update === 'function') rootComponent.update(lastState);

  }

  // only mount if slot exist
  function tryMountingChildren(state) {

    children.forEach(child => {

      if (child._mounted) return;

      if (!child._initialized) {

        const initialProps = child.slice ? child.slice(state) : {};

        if (child.component.init) child.component.init(initialProps);

        child._initialized = true;

      }

      const container = resolveContainer(child);

      if (container && child.component.el && !child._mounted) {

        // mount child in DOM
        container.appendChild(child.component.el);
        
        if (child.component.mount) child.component.mount(container);
        child._mounted = true;

        const propsUpdate = child.slice ? child.slice(state) : {};

        // and immediatley update with latest state
        if (child.component.update) child.component.update(propsUpdate);

      }
    });
  }

  // mount root and children whoose slot already exists
  function mount(rootSelector) {

    mountRoot(rootSelector);

    // in case state already emitted before mount, attempt to mount children now
    tryMountingChildren(lastState);

  }

  // on every state change: try mounting children then update root and mounted children
  bus.on('state', (updatedState) => {

    // keep copy of the new state inside renderer
    lastState = updatedState;

    // update root component if it wants to be updated
    if (rootComponent.update) rootComponent.update(updatedState);

    // try mounting children in their slots if the slot exist
    tryMountingChildren(updatedState);

    // update visibility based on child setting
    updateVisibility(updatedState);

    // finally update children with new state
    children.forEach(child => {

      if (child._mounted && child.component.update) {

        // only update visible children
        const isVisible = child.component.el.style.display !== 'none';
        if (!isVisible) return

        // makes the it more flexible for components that do not need any state
        const propsUpdate = child.slice ? child.slice(updatedState) : {};

        child.component.update(propsUpdate);
      }
    });
  });

  // Public API starts mounts everything 
  return { mount };
}
