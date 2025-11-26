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

  return {
    el: root,
    init
  };
}
