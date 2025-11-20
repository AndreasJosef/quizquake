export function Categories() {
// Create the parent container
  const root = document.createElement('div');
  root.className = 'category-container';

  // Category Science
  const scienceCard = document.createElement('div');
  const scienceText = document.createElement('span');
  scienceText.textContent = 'Science';
  scienceCard.className = 'card__category';
  scienceCard.style.backgroundImage = "url('assets/SCIENCE.jpg')";
  scienceCard.appendChild(scienceText);
  root.appendChild(scienceCard);
 
  // Category Sport
  const sportCard = document.createElement('div');
  const sportText = document.createElement('span');
  sportText.textContent = 'Sport';
  sportCard.className = 'card__category';
  sportCard.style.backgroundImage = "url('assets/SPORT.jpg')";
  sportCard.appendChild(sportText);
  root.appendChild(sportCard);

  // Category Internet
  const internetCard = document.createElement('div');
  const internetText = document.createElement('span');
  internetText.textContent = 'Internet';
  internetCard.className = 'card__category';
  internetCard.style.backgroundImage = "url('assets/INTERNET.png')";
  internetCard.appendChild(internetText);
  root.appendChild(internetCard);

  // Category Barn
  const barnCard = document.createElement('div');
  const barnText = document.createElement('span');
  barnText.textContent ='Barn';
  barnCard.classList = 'card__category';
  barnCard.style.backgroundImage = "url('assets/KIDS.jpg')";
  barnCard.appendChild(barnText);
  root.appendChild(barnCard);
  

  return { el: root};
}
