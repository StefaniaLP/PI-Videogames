import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getPlatforms} from "../../actions";

export default function Form (){
    const dispatch = useDispatch()
    const generos= useSelector((state)=> state.genres) 
    const plataformas= useSelector((state)=> state.platforms) 
    const [input, setInput]= useState({
        name: "",
        description: "",
        rating: "",
        released: "",
        background_image: "",
        platforms: [],
        genres: [],
    })

    useEffect (()=> {
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])


    //46:09


    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea un videogame</h1>

            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" />
                </div>

                <div>
                    <label>Descripcion:</label>
                    <input type="text" value={input.description} name="description" />
                </div>

                <div>
                    <label>Rating:</label>
                    <input type="text" value={input.rating} name="rating" />
                </div>

                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input type="text" value={input.released} name="released" />
                </div>

                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.background_image} name="background_image" />
                </div>

                
            </form>
        </div>
    )
}