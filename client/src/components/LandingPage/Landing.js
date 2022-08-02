import React from "react";
import { Link } from "react-router-dom";
import "./Landingc.css";

export default function Landing() {
  return (
    <div className="container">
      <h1 className="tittle">Videogames</h1>
      <Link to="/home">
        <button className="butLanding">
          INGRESAR
        </button>
      </Link>
    </div>
  );
}

