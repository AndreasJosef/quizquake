export function HighscoresList() {

    const root = document.createElement('div');
    root.className = 'highscores__container';

    const header = document.createElement('div');
    
    header.className = 'highscores__header';
    header.innerHTML = `
        <span class="header__rank">Rank</span>
        <span class="header__name">Name</span>
        <span class="header__score">Score</span>
    `;

    const list = document.createElement('ul');
    list.className = 'highscores__list'

    root.append(header, list);

    function update({ highscores }) {

        if (!highscores || !highscores.length) {
            list.innerHTML = '';
            header.style.display = 'none';
            return;
        }

        // Show header if scores exist
        header.style.display = '';

        const listItems = highscores.map((item, index) => {
            const rank = index + 1;  
            return `
                <li class="highscores__item">
                    <span class="item__rank">${rank}</span>
                    <span class="item__name">${item.player}</span>
                    <span class="item__score">${item.score}</span>
                </li>
            `;
        });

        list.innerHTML = listItems.join('');
    }

    return {
        el: root,
        update
    }

}