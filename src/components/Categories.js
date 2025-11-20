export function Categories() {
// Create the parent container
  const root = document.createElement('div');
  root.className = 'category-container';

  // Category Science
  const scienceCard = document.createElement('div');
  scienceCard.textContent = 'Science';
  scienceCard.className = 'card__category';
  scienceCard.style.backgroundImage = "url('assets/SCIENCE.jpg')";
  root.appendChild(scienceCard);

  // Category Sport
  const sportCard = document.createElement('div');
  sportCard.textContent = 'Sport';
  sportCard.className = 'card__category';
  sportCard.style.backgroundImage = "url('assets/SPORT.jpg')";
  root.appendChild(sportCard);

  // Category Internet
  const internetCard = document.createElement('div');
  internetCard.textContent = 'Internet';
  internetCard.className = 'card__category';
  internetCard.style.backgroundImage = "url('assets/INTERNET.png')";
  root.appendChild(internetCard);

  // Category Barn
  const barnCard = document.createElement('div');
  barnCard.textContent ='Barn';
  barnCard.classList = 'card__category';
  barnCard.style.backgroundImage = "url('assets/KIDS.jpg')";
  root.appendChild(barnCard);
  

  return { el: root};
}
