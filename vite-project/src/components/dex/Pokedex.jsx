
import PokemonList from "../PokemonList/PokemonList.jsx";
import Pokesearch from "../search/pokesearch";
import './pokedex.css';


const Pokedex = () => {
  return (
      <div className="pokedex">
            <h1 id="pokedex-wrapper">Pokedex</h1>
            <Pokesearch />
            <PokemonList/>
      </div>
  )
}

export default Pokedex;