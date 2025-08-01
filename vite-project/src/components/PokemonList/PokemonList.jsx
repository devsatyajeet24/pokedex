import { useEffect,useState } from "react";
import axios from "axios";
import './pokemonlist.css'
import Pokemon from "../Pokemon/Pokemon.jsx"

function PokemonList (){
        const [isloading,setIsLoading]=useState(true);
        const [pokeList,setPokeList]=useState([]);

        const [url,setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
        const [prevUrl,setPrevUrl] = useState('');
        const[nextUrl,setNextUrl] = useState('');


        async function DownloadPokemonList(){
            const response = await axios.get(url);
        console.log(response.data);
             const pokemonDataResults=response.data.results;

             setPrevUrl(response.data.previous);
             setNextUrl(response.data.next);

             const pokemonResultPromise =  pokemonDataResults.map((pokemon)=> axios.get(pokemon.url));
             const pokemonData =  await axios.all(pokemonResultPromise);
        console.log(pokemonData);
                const res = (pokemonData.map((poekdata)=>{
                const pokemon=poekdata.data;
                 return {id:pokemon.id,name:pokemon.name,types:pokemon.types,image:pokemon.sprites.other.dream_world.front_default} 
            }));
            console.log(res);
            setPokeList(res);
            setIsLoading(false);
          
    }
    useEffect(()=>{
            DownloadPokemonList();
    },[url]);


    return(
        <>
            <div className="pokemonlist-wrapper">
               <div>PokemonList</div>
                <div className="pokewrapper">    {(isloading)?'data is loading...':pokeList.map((p)=> <Pokemon name={p.name} image={p.image} key ={p.id}  /> )}</div>
            </div>
            <div className="controlers">
        
                <button disabled={prevUrl==null} onClick={()=>setUrl(prevUrl)}>Prev</button>
                <button onClick={()=>setUrl(nextUrl)}>Next</button>
            </div>
        </>
    
    )
}
export default PokemonList;