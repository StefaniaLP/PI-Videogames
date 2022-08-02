
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres , filterByGenre, filterByCreator, sortAlphabetically, sortByRating} from "../../actions";
import { Link } from "react-router-dom";
import CardGame from '../CardGame/CardGame';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';
import "./Homec.css"


export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> {return state.videogames})
    const allGenres = useSelector(state => state.genres)
    const [actualPage, SetActualPage] = useState(1)
    const [sort, SetSort]=useState("")
    const [gamesxPage] = useState(15) //15
    const indexLastGame= actualPage*gamesxPage //15
    const indexFirstGame = indexLastGame- gamesxPage // 0
    const actualGames = allVideogames.slice(indexFirstGame,indexLastGame)
    
    //console.log ("aaaaaaaall genres", allGenres)
    //console.log ("gamexpage", gamesxPage)
    //console.log ("allVideogames.len", allVideogames.length)
    const paginado = (pageNumber) => {
        SetActualPage (pageNumber)
    }
    useEffect( () => {
        dispatch(getVideogames())
    }, [dispatch])

    useEffect ( ()=> {
        dispatch(getGenres());
    },[dispatch])

    /*function handleClick (e){
        e.preventDefault()
        dispatch(getVideogames())
    }  */

    function handleFilterByGenre (e) {
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
    }

    function handleFilterByCreator(e){
        e.preventDefault()
        dispatch(filterByCreator(e.target.value))
    }

    function handleSortAlfab(e){
        e.preventDefault();
        dispatch(sortAlphabetically(e.target.value))
        SetActualPage(1);
        SetSort(`Ordenado por: ${e.target.value}`)
        console.log("sort",sort)
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
        SetActualPage(1);
        SetSort(`Ordenado por: ${e.target.value}`)
    }
    
    return(
    <div className='homegral'>
        <div className='containerHome'>
            <div className='menuNav'>
                <h1 className='tit'>Listado de videogames ...</h1>
                <br></br>
                <div className='search'>
                    <SearchBar />
                </div> 
                <div className='paginado'>
                    <Paginated 
                
                        gamesxPage={gamesxPage} 
                        allVideogames={allVideogames.length} 
                        paginated={paginado}
                    />
                </div>
            </div>
           
        
            <div className='menuFilterAndSort'>  
                
                <label className='lab'>Filtrar:  </label>
                <select onChange={(e)=> handleFilterByGenre(e)} className='selec'>
                    <option value= "All" className='opt'>Todos los generos</option>
                    { allGenres?.map(el => (
                        <option key={el.id} value={el.name} className='opt'>{el.name}</option>
                        ))
                    }
                </select>
                <select onChange={(e)=> handleFilterByCreator(e)} className='selec'>
                    <option value= "All" className='opt'>Todos los creadores</option>
                    <option value= "Creado" className='opt'>Creado BD</option>
                    <option value= "Existente" className='opt'>Existente API</option>
                </select>

                <br></br>

                <label className='lab'>Ordenar:  </label>
                <select onChange={(e)=> handleSortAlfab(e)} className='selec'>
                    <option value= ""  className='opt' >Orden Alfabetico</option>
                    <option value= "Asc" className='opt'>A - Z</option>
                    <option value= "Desc" className='opt'>Z - A</option>
                </select>
                <select onChange={(e)=> handleSortRating(e)} className='selec'>
                    <option value= "" className='opt'>Rating</option>
                    <option value= "Rating-asc" className='opt' > Rating Ascendente</option>
                    <option value= "Rating-desc" className='opt'>Rating Descendente</option>
                </select>

                <label className='lab'>Otras acciones: </label>
                <Link to="/videogames">
                    <button className='crear'>Crear Videojuego</button>
                </Link>
            </div>
            
            <div className="card_gral">
            {
                actualGames && actualGames.map(el =>{
                    return ( 
                        
                        <CardGame 
                            key={el.id}
                            name= {el.name} 
                            background_image= {el.background_image} 
                            genres={el.genres}
                            rating={el.rating}
                            id={el.id}
                           
                        />
                        
                    )
                })
            }
            </div>

        </div>
            
    </div>
    )
}
