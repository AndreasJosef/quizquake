export function SoundControl({ onClick }) {

    const root = document.createElement('div');
    root.classList.add('sound-control'); 
    root.style.cursor = 'pointer';      

    const icon = document.createElement('img');
    
    root.appendChild(icon);

    let isPlaying = false;

    function selectIcon() {

        const iconName = isPlaying ? 'sound-play' : 'sound-stop';
        icon.src = `/assets/${iconName}.svg`; 
        icon.alt = isPlaying ? 'Ljud på' : 'Ljud av';
    }

    function init({ soundPlaying }) {
        isPlaying = !!soundPlaying; 
        selectIcon()
    }

    function update({ soundPlaying }) {
        if (soundPlaying !== undefined && soundPlaying !== isPlaying) {
            isPlaying = soundPlaying;
        }

        selectIcon()

    }

    function toggle() {
        isPlaying = !isPlaying;
        onClick(isPlaying); 
    }

    function mount() {
        root.addEventListener('click', toggle);
    }

    return {
        el: root,
        init,
        update,
        mount
    };
}