import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../actions";

export default function Detail (props) {
    //console.log(props)
    const dispatch = useDispatch();
    const {id} = useParams()
    const det= useSelector(state => state.detail)
    useEffect(() => {
        dispatch(getDetail(id)) // sino uso el useParams(), lo equivalente seria poner props.match.params.id
    }, [dispatch])

   
    
    console.log("details", det) 
    console.log("getdetail", getDetail)
    return(
        <div>
            
           
            <h1>{det}</h1>
           
            
            <Link to= "/home"><button>Volver</button></Link>
        </div>
    )
}