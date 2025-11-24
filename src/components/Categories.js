import { CATEGORIES } from "../modules/gameService.js";

export function Categories({ onClick }) {
  // Create the parent container
  const root = document.createElement('div');
  root.className = 'gallery';

  const categories = [];

  CATEGORIES.forEach(category => {
    const card = document.createElement('div');
    card.dataset.category = category;
    card.className = 'gallery__card';
    card.style.backgroundImage = `url('assets/${category}.png')`;

    categories.push(card)

  })

  function init() {

    categories.forEach(cat => {

      cat.addEventListener('click', (e) => {
        let category = cat.dataset.category
        onClick(category);
      })

      root.append(cat);

    })

  }

  // Category Science
  // const scienceCard = document.createElement('div');
  // scienceCard.textContent = 'Science';
  // scienceCard.className = 'card__category';
  // scienceCard.style.backgroundImage = "url('assets/SCIENCE.jpg')";
  // root.appendChild(scienceCard);

  // Category Sport
  // const sportCard = document.createElement('div');
  // sportCard.textContent = 'Sport';
  // sportCard.className = 'card__category';
  // sportCard.style.backgroundImage = "url('assets/SPORT.jpg')";
  // root.appendChild(sportCard);

  // Category Internet
  // const internetCard = document.createElement('div');
  // internetCard.textContent = 'Internet';
  // internetCard.className = 'card__category';
  // internetCard.style.backgroundImage = "url('assets/INTERNET.png')";
  // root.appendChild(internetCard);

  // Category Barn
  // const barnCard = document.createElement('div');
  // barnCard.textContent = 'Barn';
  // barnCard.classList = 'card__category';
  // barnCard.style.backgroundImage = "url('assets/KIDS.jpg')";
  // root.appendChild(barnCard);


  return {
    el: root,
    init
  };
}
