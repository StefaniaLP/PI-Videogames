
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from "../../actions";
import { Link } from "react-router-dom";
import CardGame from '../CardGame/CardGame';

export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> {return state.videogames})
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
                <p>{console.log(allVideogames)}</p>
                {
                    allVideogames && allVideogames.map(el =>{
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
