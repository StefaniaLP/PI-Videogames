
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from "../../actions";
import { Link } from "react-router-dom";
import CardGame from '../CardGame/CardGame';
import Paginated from '../Paginated/Paginated';

export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> {return state.videogames})
    const [actualPage, SetActualPage] = useState(1)
    const [gamesxPage] = useState(15) //15
    const indexLastGame= actualPage*gamesxPage //15
    const indexFirstGame = indexLastGame- gamesxPage // 0
    const actualGames = allVideogames.slice(indexFirstGame,indexLastGame)

    console.log ("gamexpage", gamesxPage)
    console.log ("allVideogames.len", allVideogames.length)
    const paginado = (pageNumber) => {
        SetActualPage (pageNumber)
    }
    useEffect( () => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleClick (e){
        e.preventDefault()
        dispatch(getVideogames())
    }    
    /*let activeClassName = "underline";
    dentro del Navlink verificar si pongo esto cuando arme el css
    className={({ isActive }) =>
              isActive ? activeClassName : undefined*/
    return(
        <div>
            <Link to="/videogames">Crear Videojuego</Link>
            <h1>VIDEOGAMES</h1>
            <button onClick={e=>{handleClick(e)}}> Lista de videogames</button>
            <div>
                <select>
                    <option value= "asc">Ascendente</option>
                    <option value= "desc">Descendente</option>
                </select>
                
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
                                id={el.id}/>
                        
                      )
                    })
                }
            </div>
        </div>
    )
}
