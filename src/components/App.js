export function App(){

    const el = document.createElement('div');

    el.innerHTML = `
        <div class="slot-score"></div>
        <div class="slot-rules"></div>
        <div class="slot-button-start"></div>
    `
    return { el }
}