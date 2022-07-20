
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from "../../actions";
import { NavLink } from "react-router-dom";

export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> state.videogames)
    useEffect( () => {
        dispatch(getVideogames())
    }, [])

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
            <NavLink to="/videogames"></NavLink>
            <h1>VIDEOGAMES</h1>
            <button onClick={e=>{handleClick(e)}}> Lista de videogames</button>
        </div>
    )
}
