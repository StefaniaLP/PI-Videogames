import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../actions";
import img from "./img.png"
import './Detailc.css'

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
        <div className="conteinerDetail">
            <div > 
                <div className="detail">
                    <h1 className="tittleDetail">{detok.name}</h1>
                    <h4 className="subtit">Rating: </h4>
                    <p className="subdetail">{detok.rating}</p>
                    <h4 className="subtit">Fecha de creacion: </h4>
                    <p className="subdetail">{detok.released}</p>
                    <img
                        
                        src={detok.background_image || img}
                        alt={detok.name}
                        width="400px"
                        height="400px"
                    />
                </div>

                <div className="detail">
                    <h4 className="subtit">Descripcion</h4>
                    <p className="subdetail">{detok.description}</p>
                    
                    <h4 className="subtit">Generos:</h4>
                        <p className="subdetail">{detok.genres?.map(g => (g.name ? g.name : g)).join(", ")}</p>
                    
                    <h4 className="subtit">Plataformas:</h4>
                    <p className="subdetail">{
                    typeof detok.platforms === "string" ? detok.platforms:
                    detok.platforms?.map(g => (g.name ? g.name : g)).join(", ")}</p>
                </div>
                
                
                <Link to= "/home"><button className="butt">Volver</button></Link>  
            </div>      
        </div>
    )
}