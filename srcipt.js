
document.addEventListener('DOMContentLoaded', function() {
  const characterList = document.getElementById('character-list');
  let charactersData = []; 

  function createCharacterCard(character) {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');
    const characterImage = character.image ? character.image : 'default.jpg';
    
    characterCard.innerHTML = `
      <img class="character-image" src="${characterImage}" alt="${character.actor}">
      <div class="character-details">
        <div class="character-name">${character.name}</div>
        <div class="character-house">House: ${character.house}</div>
        <div class="character-actor">Actor: ${character.actor}</div>
      </div>
    `;
    characterList.appendChild(characterCard);
  }

  function filterCharacters(filter) {
    characterList.innerHTML = ''; 
    charactersData.filter(character => {
      switch (filter) {
        case 'student':
          return character.hogwartsStudent;
        case 'staff':
          return character.hogwartsStaff;
        default:
          return true;
      }
    }).forEach(character => {
      createCharacterCard(character);
    });
  }

  // Fetch characters from the API
  fetch('https://hp-api.onrender.com/api/characters')
    .then(response => response.json())
    .then(data => {
      charactersData = data; // Store characters data
      filterCharacters(); // Display all characters initially
    })
    .catch(error => console.error('Error fetching data:', error));

  // Add event listeners to filter buttons
  document.getElementById('filter-student').addEventListener('click', function() {
    filterCharacters('student');
  });

  document.getElementById('filter-staff').addEventListener('click', function() {
    filterCharacters('staff');
  });

});

