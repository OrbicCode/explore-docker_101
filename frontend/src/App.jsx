import { useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);

  async function handleClick() {
    try {
      const response = await fetch('http://localhost:3000/pokemon/get-ten');
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    }
  }

  const pokemonList = pokemon && pokemon.map((pokemon) => <li key={pokemon.id}>{pokemon.name}</li>);
  return (
    <main>
      <div>
        <button onClick={handleClick}>get Pokemon</button>
      </div>
      <div>
        <ul>{pokemonList}</ul>
      </div>
    </main>
  );
}

export default App;
