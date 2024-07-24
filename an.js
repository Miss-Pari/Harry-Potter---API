document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list');
    let charactersData = []; // Store characters data
  
    // Function to create character cards
    function createCharacterCard(character) {
      const characterCard = document.createElement('div');
      characterCard.classList.add('character-card');
      const characterImage = character.image ? character.image : 'default.jpg';
      
      characterCard.innerHTML = `
        <img class="character-image" src="${characterImage}" alt="${character.actor}">
        <div class="character-details">
          <div class="character-name">${character.name}</div>
        </div>
      `;
      characterList.appendChild(characterCard);
    }
  
    function filterCharacters(house) {
      characterList.innerHTML = ''; // Clear existing cards
      charactersData.filter(character => {
        // Filter characters based on the selected house
        return character.ancestry === house;
      }).forEach(character => {
        createCharacterCard(character);
      });
    }
  
    // Fetch characters from the API
    fetch('https://hp-api.onrender.com/api/characters')
      .then(response => response.json())
      .then(data => {
        charactersData = data; 
        charactersData.forEach(character => {
          createCharacterCard(character);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  
    document.getElementById('filter-Pure-blood').addEventListener('click', function() {
      filterCharacters('pure-blood');
    });
  
    document.getElementById('filter-Half-blood').addEventListener('click', function() {
      filterCharacters('half-blood');
    });
  
    document.getElementById('filter-squib').addEventListener('click', function() {
      filterCharacters('squib');
    });
    document.getElementById('filter-muggle').addEventListener('click', function() {
      filterCharacters('muggle');
    });
    document.getElementById('filter-muggleb').addEventListener('click', function() {
      filterCharacters('muggleborn');
    });
  
  });
  