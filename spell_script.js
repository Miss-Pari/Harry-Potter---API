document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list');
  
    // Function to create character cards
    function createCharacterCard(character) {
      const characterCard = document.createElement('div');
      characterCard.classList.add('character-card');
      const characterImage = character.image ? character.image : 'default.jpg';
      const spells = character.spells ? character.spells.join(', ') : 'No spells available';
  
      characterCard.innerHTML = `
        <img class="character-image" src="${characterImage}" alt="${character.name}">
        <div class="character-details">
          <div class="character-name">${character.name}</div>
          <div class="character-spells">Spells: ${spells}</div>
        </div>
      `;
      characterList.appendChild(characterCard);
    }
  
    // Fetch characters from the API
    fetch('https://hp-api.onrender.com/api/characters')
      .then(response => response.json())
      .then(data => {
        data.forEach(character => {
          createCharacterCard(character);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  