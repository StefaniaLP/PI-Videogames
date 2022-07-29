import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getPlatforms, postVideogame, getVideogames} from "../../actions";
import "./Formc.css"

   
    function validate(input) {
        var errors = {};
        if(!input.name){
            errors.name = 'Nombre es un campo obligatorio';
            } else if (input.name.length > 30 ){
            errors.name = 'Nombre es demasiado extenso (Max = 30 characters)'
        }
    
        if(!input.description) {
            errors.description = 'Descripcion es un campo obligatorio';
            } else if (input.description.length > 1500) {
            errors.description = 'Descripcion es demasiado extenso (Max = 1500 characters)'
        }
    
        if(input.rating && (input.rating > 5 || input.rating < 0)) {
            errors.rating = "Rating debe estar entre 0 y 5"
        }
    
          
        /*if(input.background_image.length !== 0 ){
            errors.background_image='invalid URL'
          }*/
        
        if(!input.genres[0]){
            errors.genres = 'Generos es un campo obligatorio. Al menos se requiere un genero'
        } 
        
        if (!input.platforms[0]){
            errors.platforms = 'Plataforma es un campo obligatorio. Al menos se requiere una plataforma'
        }
        
    
        return errors;
    }
export default function Form (){
    const dispatch = useDispatch()
    const history =useHistory()// me redirige a la ruta que yo le diga
    const generos= useSelector((state)=> state.genres) 
    const plataformas= useSelector((state)=> state.platforms) 
    const vg= useSelector((state)=>state.videogames)
    //console.log("generos", generos) 
    //console.log("plataformas", plataformas)
    const [errors, setErrors] = useState({})
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
        dispatch(getVideogames())
    },[dispatch])

    function handleChange (e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: [e.target.value]
          })
          )
    }
    
    function handleSelectPlat (e){
        setInput({
            ...input,
            platforms : [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            platforms: [e.target.value]
          })
          )
    }

    function handleSelectGen (e){
        setInput({
            ...input,
            genres : [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            genres: [e.target.value]
          })
          )
    }

    function handleDeleteG(e) {
        setInput({
          ...input,
          genres: input.genres.filter((gen) => gen !== e)
        });
      }
    
      function handleDeleteP(e) {
        setInput({
          ...input,
          platforms: input.platforms.filter((plat) => plat !== e)
        });
      }
    function handleSubmit(e) {
        e.preventDefault();

        const a = vg.filter((b) => b.name === input.name);
        if (a.length > 0) {
        return alert("El nombre ya se encuenta en uso.");
        }

        dispatch(postVideogame(input))
        setInput ({

            name: "",
            description: "",
            rating: "",
            released: "",
            background_image: "",
            platforms: [],
            genres: [],
        })
        alert("El juego fue creado exitosamente.");
            
        history.push("/home")
    }

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea un videogame</h1>
            <h5>Aquellas propiedades marcadas con * son obligatorias</h5>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre*: </label>
                    <input 
                        type="text" 
                        value={input.name} 
                        name="name" 
                        required
                        onChange={(e)=> {handleChange(e)}}
                    />
                    {errors.name && (<p>{errors.name}</p> )}
                </div>

                <div>
                    <label>Descripcion*: </label>
                    <textarea 
                        type="text" 
                        value={input.description} 
                        name="description" 
                        required
                        onChange={(e)=> {handleChange(e)}}
                    ></textarea>
                    {errors.description && (<p>{errors.description}</p> )}
                </div>

                <div>
                    <label>Rating: </label>
                    <input 
                        type="number" 
                        value={input.rating} 
                        name="rating" 
                        onChange={(e)=> {handleChange(e)}}
                    />
                    {errors.rating && (<p>{errors.rating}</p> )}
                </div>

                <div>
                    <label>Fecha de lanzamiento: </label>
                    <input 
                        type="date" 
                        value={input.released} 
                        name="released" 
                        onChange={(e)=> {handleChange(e)}}
                    />
                    {errors.released && (<p >{errors.released}</p>)}

                </div>

                <div>
                    <label>Imagen: </label>
                    <input 
                        type="text" 
                        value={input.background_image} 
                        name="background_image" 
                        onChange={(e)=> {handleChange(e)}} 
                    />
                </div>

                <div>
                    <label>Generos*: </label>
                    <select required onChange={(e)=> {handleSelectGen(e)}} > 
                        <option hidden value=''>Select</option>
                        { generos?.map(el => (
                        <option key={el.id} value={el.name} >{el.name}</option>
                        ))
                        }
                    </select>
                    <ul><li> Generos seleccionadas: 
                        {input.genres.map( (el)=> (
                            <div >
                                <div >{el}
                                    <button onClick={() => handleDeleteG(el)} key={el} value={el}>
                                        <p>X</p>
                                    </button>
                                </div>
                                
                            </div>
                        ))} 
                    </li></ul>
                    {errors.genres && (<p>{errors.genres}</p> )}
                </div>
                
                <div>
                    <label>Plataformas*: </label>
                    <select required onChange={(e)=> {handleSelectPlat(e)}} d> 
                        <option hidden value=''>Select</option>
                        { plataformas.data?.map(el => (
                        <option key={el} value={el} >{el}</option>
                        ))}
                    </select>
                    <ul><li> Plataformas seleccionados: {input.platforms.map( (el)=> (
                            <div >
                                <div >{el}
                                    <button onClick={() => handleDeleteP(el)} key={el} value={el}>
                                        <p>X</p>
                                    </button>
                                </div>  
                                
                            </div>
                            ))} 
                        </li></ul>
                        {errors.platforms && (<p>{errors.platforms}</p> )}
                </div>

                


                <button disabled={input.name === '' || errors.name || 
                                input.description === '' || errors.description ||
                                input.genres[0] === '' || errors.genres ||
                                input.platforms[0] === '' || errors.platforms ||

                                (input.rating === ''&& setInput({
                                    ...input,
                                    rating: 0.0
                                })) || errors.rating ||
                                (input.released === ''&& setInput({
                                    ...input,
                                    released: "01/01/1900"
                                })) 
                                } 
                        type="submit">Crear
                </button>
                <Link to={'/home'} >Cancelar</Link>
            </form>
        </div>
    )
}