import { bus } from "./eventBus.js";

// createRendererSingleApp.js
export function createRenderer({ rootComponent, children }) {

  // prepare an object for keeping a local state copy
  let lastState = {};

  // when renderer is created no child is mounted/initialized
  children.forEach(child => {

    child._initialized = false;
    child._mounted = false;

  });

  function getChildContainer(child) {

    const root = child.childRoot;

    if (typeof root === 'function') return root();
    if (typeof root === 'string') return document.querySelector(root);
    if (root instanceof Element) return root;

    return null;

  }

  async function renderChild(child, state) {

    // check if the child has a route otherwise always visible
    const isVisible = child.visibleWhen ? child.visibleWhen(state) : true;

    // get container for the child
    const container = child._container || (child._container = getChildContainer(child));

    if (!container || !child.component.el) return

    // if visible but not yet mounted we mount
    if (isVisible && !child._mounted) {

      // if child has init and it has not been called yet -> call it
      if (!child._initialized) {
        child.component.init?.(child.slice ? child.slice(state) : {});
        child._initialized = true;
      }

      // then append to dom
      container.appendChild(child.component.el)

      // then call mount and await promisses
      try {

        // call and wait for async mounts on the component finish
        await Promise.resolve(child.component.mount?.(container));

      } catch (e) {

        // don't stop rendering when a components mount fails
        console.error('Error mounting component', e)

      }

      // update child mounted status
      child._mounted = true;

      // if all that worked out we update with latest state
      child.component.update?.(child.slice ? child.slice(state) : {});

    } else if (!isVisible && child._mounted) { // should not be visible but is mounted

      // remove from DOM
      container.removeChild(child.component.el);

      // if child exposes destroy lifecycle hook call it now
      try {
        child.component.destroy?.()
      } catch (e) {
        console.error('Error during destruction:', e);
      }

      child._mounted = false;
      child._initialized = false;
    }

    // finally update mounted components
    if (child._mounted && child.component.update) {
      const propsUpdate = child.slice ? child.slice(state) : {};
      child.component.update(propsUpdate);
    }
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

  // mount root and children whoose slot already exists
  async function mount(rootSelector) {

    mountRoot(rootSelector);

    await Promise.all(children.map(child => renderChild(child, lastState)));
  }

  // make the render reactive to state changes
  bus.on('state', async (updatedState) => {

    // keep copy of the new state inside renderer
    lastState = updatedState;

    // update root component if it wants to be updated
    if (rootComponent.update) rootComponent.update(updatedState);

    await Promise.all(children.map(child => renderChild(child, updatedState)))
  });

  // Public API: attaches the app to the DOM and hooks up rendering
  return { mount };
}
