import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getPlatforms, postVideogame} from "../../actions";
import "./Formc.css"

export default function Form (){
    const dispatch = useDispatch()
    const history =useHistory()// me redirige a la ruta que yo le diga
    const generos= useSelector((state)=> state.genres) 
    const plataformas= useSelector((state)=> state.platforms) 
    //console.log("generos", generos)
    //console.log("plataformas", plataformas)
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
        dispatch(getPlatforms())
        dispatch(getGenres())
    },[dispatch])

    function handleChange (e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    function handleSelectPlat (e){
        setInput({
            ...input,
            platforms : [...input.platforms, e.target.value]
        })
    }

    function handleSelectGen (e){
        setInput({
            ...input,
            genres : [...input.genres, e.target.value]
        })
    }

    function handleSubmit (e){
        e.preventDefault()
        dispatch(postVideogame(input))
        alert("Videogames creado")
        setInput ({

            name: "",
            description: "",
            rating: "",
            released: "",
            background_image: "",
            platforms: [],
            genres: [],
        })
        history.push("/home")
    }

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea un videogame</h1>

            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={(e)=> {handleChange(e)}}/>
                </div>

                <div>
                    <label>Descripcion: </label>
                    <input type="text" value={input.description} name="description" onChange={(e)=> {handleChange(e)}} />
                </div>

                <div>
                    <label>Rating: </label>
                    <input type="number" value={input.rating} name="rating" onChange={(e)=> {handleChange(e)}}/>
                </div>

                <div>
                    <label>Fecha de lanzamiento: </label>
                    <input type="date" value={input.released} name="released" onChange={(e)=> {handleChange(e)}}/>
                </div>

                <div>
                    <label>Imagen: </label>
                    <input type="text" value={input.background_image} name="background_image" onChange={(e)=> {handleChange(e)}} />
                </div>

                <div>
                    <label>Generos: </label>
                    <select onChange={(e)=> {handleSelectGen(e)}} > 
                        { generos?.map(el => (
                        <option key={el.id} value={el.name} >{el.name}</option>
                        ))
                        }
                    </select>
                    <ul><li> Generos seleccionadas: {input.genres.map( (el)=> `${el} / `)} </li></ul>
                </div>
                
                <div>
                    <label>Plataformas: </label>
                    <select onChange={(e)=> {handleSelectPlat(e)}}> 
                        { plataformas.data?.map(el => (
                        <option key={el} value={el} >{el}</option>
                        ))
                        }
                    </select>
                    <ul><li> Plataformas seleccionados: {input.platforms.map( (el)=> `${el} / `)} </li></ul>
                </div>

                


                <button type="submit">Crear</button>
            </form>
        </div>
    )
}