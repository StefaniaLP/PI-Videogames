import React from "react";
import { Link } from "react-router-dom";
import "./CardGamec.css";


export default function CardGame({ name, background_image, genres, id, rating }) {

  return (
    <div className="card" key={id}>
      <div className="card-details">

        <h3 className="card-title">{name}</h3>
        <p>{rating}</p>
        <div className="img-game">
          <img
            src={background_image}
            alt={name}
            height="400px"
            width="400px"
          />
        </div>
        <div >Generos: 
          <p>
          { genres[0].name ? 
            genres.map(genre => genre.name).join(', ') :
            genres.join(', ') 
          }
          </p>   
        </div>

        <Link to="/videogames" >
          <button className="card-button">Ver mas detalle </button>
        </Link>
      </div>
      
    </div>
  );
}