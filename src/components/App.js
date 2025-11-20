export function App(){

    const el = document.createElement('div');

    el.innerHTML = `
        <div class="slot slot-header"></div>
        <div class="slot slot-main"></div>
        <div class="slot slot-controls"></div>
    `
    return { el }
}