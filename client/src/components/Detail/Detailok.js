import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../actions";
import img from "./img.png"

export default function Detail (props) {
    console.log("props",props)
    const dispatch = useDispatch();
    const {id} = props.match.params
   
    useEffect(() => {
        dispatch( getDetail(id)) // sino uso el useParams(), lo equivalente seria poner props.match.params.id y poner como parametro a Detail (props)
    }, [dispatch,id])
    let detok = useSelector ((state)=> {return state.detail})
    console.log("detOK", detok) 
    return(
        <div>
            <h1>{detok.name}</h1>
            <p>Rating {detok.rating}</p>
            <div>
                <img
                    
                    src={detok.background_image || img}
                    alt={detok.name}
                    width="400px"
                    height="400px"
                />
            </div>
            <h3>Descripcion</h3>
            <h5>{detok.description}</h5>
            <h4>Fecha de creacion </h4>
                <span>{detok.released}</span>
            <h4>Generos:</h4>
                <p>{detok.genres?.map(g => (g.name ? g.name : g)).join(", ")}</p>
            <h4>Plataformas:</h4>
               <p>{
              typeof detok.platforms === "string" ? detok.platforms:
               detok.platforms?.map(g => (g.name ? g.name : g)).join(", ")}</p>
            
            <Link to= "/home"><button>Volver</button></Link>        
        </div>
    )
}