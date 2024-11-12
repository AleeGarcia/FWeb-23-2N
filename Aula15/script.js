let currentPokemonId = 1;

function fetchPokemon(id = 1) {
  const pokemonNameInput = document.getElementById("pokemon-name");
  const pokemonId = pokemonNameInput.value ? pokemonNameInput.value : id;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayPokemon(data);
      playPokemonSound(data.id);
    })
    .catch((error) => {
      console.error("Erro ao buscar o Pokémon:", error);
    });
}

function displayPokemon(pokemon) {
  const imageUrl = pokemon.sprites.front_default;
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ");
  const weight = pokemon.weight / 10;
  const height = pokemon.height / 10;

  document.getElementById("pokemon-image").src = imageUrl;
  document.getElementById("pokemon-display-name").innerText = name;
  document.getElementById("pokemon-type").innerText = `Tipo: ${type}`;
  document.getElementById("pokemon-weight").innerText = `Peso: ${weight} kg`;
  document.getElementById("pokemon-height").innerText = `Altura: ${height} m`;
}

function playPokemonSound(pokemonId) {
  const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
  const pokemonSound = new Audio(audioUrl);
  pokemonSound.play();
}

function changePokemon(direction) {
  currentPokemonId += direction;
  if (currentPokemonId < 1) currentPokemonId = 1;
  fetchPokemonById(currentPokemonId);
}

function fetchPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayPokemon(data);
      playPokemonSound(data.id);
    })
    .catch((error) => {
      alert("Pokémon não encontrado!");
    });
}

window.onload = () => {
  fetchPokemon(1);

  const pokemonNameInput = document.getElementById("pokemon-name");
  pokemonNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      fetchPokemon();
    }
  });
};
