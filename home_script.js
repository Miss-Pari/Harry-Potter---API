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
          <div class="character-house">House: ${character.house}</div>
          <div class="character-actor">Actor: ${character.actor}</div>
        </div>
      `;
      characterList.appendChild(characterCard);
    }
  
    // Function to filter characters and display filtered characters
    function filterCharactersByHouse(house) {
      characterList.innerHTML = ''; // Clear existing cards
      charactersData.filter(character => {
        // Filter characters based on the selected house
        return character.house === house;
      }).forEach(character => {
        createCharacterCard(character);
      });
    }
  
    // Fetch characters from the API
    fetch('https://hp-api.onrender.com/api/characters')
      .then(response => response.json())
      .then(data => {
        charactersData = data; // Store characters data
        // Display all characters initially
        charactersData.forEach(character => {
          createCharacterCard(character);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  
    // Add event listeners to filter buttons for each house
    document.getElementById('filter-gryffindor').addEventListener('click', function() {
      filterCharactersByHouse('Gryffindor');
    });
  
    document.getElementById('filter-hufflepuff').addEventListener('click', function() {
      filterCharactersByHouse('Hufflepuff');
    });
  
    document.getElementById('filter-ravenclaw').addEventListener('click', function() {
      filterCharactersByHouse('Ravenclaw');
    });
  
    document.getElementById('filter-slytherin').addEventListener('click', function() {
      filterCharactersByHouse('Slytherin');
    });
  });
  