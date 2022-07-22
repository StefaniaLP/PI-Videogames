import React from "react";
import { Link } from "react-router-dom";
import "./Landingc.css";

export default function Landing() {
  return (
    <div className="container">
      <h1 className="tittle">GAME START</h1>
      <h2 className="subtittle">By Stefania P.</h2>
      <Link to="/home">
        <button className="here"> HERE </button>
      </Link>
    </div>
  );
}

