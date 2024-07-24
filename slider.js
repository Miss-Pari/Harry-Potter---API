
let slideIndex = 0;
let characters = [];

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const names = document.getElementsByClassName("character-name");
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    names[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
  names[slideIndex].style.display = "block";
}

function prevSlide() {
  showSlide(--slideIndex);
}

function nextSlide() {
  showSlide(++slideIndex);
}

fetch('top10.json')
  .then(response => response.json())
  .then(data => {
    characters = data;
    characters.forEach(character => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      const img = document.createElement("img");
      img.src = character.image;
      img.alt = character.name;
      const name = document.createElement("div");
      name.classList.add("character-name");
      name.textContent = character.name;
      slide.appendChild(img);
      slide.appendChild(name);
      document.querySelector(".slider").appendChild(slide);
    });
    showSlide(slideIndex);
  })
  .catch(error => console.error('Error fetching data:', error));
