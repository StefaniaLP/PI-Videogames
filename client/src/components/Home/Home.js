
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres , filterByGenre, filterByCreator, sortAlphabetically, sortByRating} from "../../actions";
import { Link } from "react-router-dom";
import CardGame from '../CardGame/CardGame';
import Paginated from '../Paginated/Paginated';


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
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
        SetActualPage(1);
        SetSort(`Ordenado por: ${e.target.value}`)
    }
    /*let activeClassName = "underline";
    dentro del Navlink verificar si pongo esto cuando arme el css
    className={({ isActive }) =>
              isActive ? activeClassName : undefined*/
    return(
        <div>
            <Link to="/videogames">Crear Videojuego</Link>
            <h1>VIDEOGAMES</h1>
            <br></br>
            <div>  
                <label>Filtrar:  </label>
                <select onChange={(e)=> handleFilterByGenre(e)}>
                    <option value= "All" >Todos los generos</option>
                    { allGenres?.map(el => (
                        <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                    }
                </select>
                <select onChange={(e)=> handleFilterByCreator(e)} >
                    <option value= "All" >Todos los creadores</option>
                    <option value= "Creado">Creado BD</option>
                    <option value= "Existente">Existente API</option>
                </select>

                <br></br>

                <label>Ordenar:  </label>
                <select onChange={(e)=> handleSortAlfab(e)}>
                    <option value= ""  >Orden Alfabetico</option>
                    <option value= "Asc" >A - Z</option>
                    <option value= "Desc" >Z - A</option>
                </select>
                <select onChange={(e)=> handleSortRating(e)}>
                    <option value= "" >Rating</option>
                    <option value= "Rating-asc" > Rating Ascendente</option>
                    <option value= "Rating-desc" >Rating Descendente</option>
                </select>

            </div>
            <Paginated 
               
                gamesxPage={gamesxPage} 
                allVideogames={allVideogames.length} 
                paginated={paginado}
            />
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
    )
}
