import React from 'react';
import "./Paginatedc.css"

export default function Paginated ({gamesxPage, allVideogames, paginated}){
    var pageNumber = []
    for (var i = 1; i <= Math.ceil(allVideogames/gamesxPage); i++){ 
        pageNumber.push(i); 
    }
    console.log("pagenumbeeeeeeeeeeeeeeeeeeeeer",pageNumber)
    return ( 
        <div> 
            <ul className='paggral'> Paginas:    
               
                {pageNumber.length >1 && pageNumber.map( n =>
                
                { return(
                    <button key = {n} onClick={() => paginated(n)} className='num'>{n}</button>
                    )
                })}
            </ul>
        </div>
    )
}