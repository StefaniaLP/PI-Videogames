import React from "react";
import { Link } from "react-router-dom";
import "./Landingc.css";

export default function Landing() {
  return (
    <div className="container">
      <h1 className="tittle">VIDEOGAMES</h1>
      <h3 className="subtittle">By Stefania Peralta</h3>
      <Link to="/home">
        <button className="button"> Login </button>
      </Link>
    </div>
  );
}

