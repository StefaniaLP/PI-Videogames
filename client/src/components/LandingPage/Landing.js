import React from "react";
import { Link } from "react-router-dom";
import "./Landingc.css";

export default function Landing() {
  return (
    <div className="container">
      <h1 className="tittle">TITULO</h1>
      <h2 className="subtittle">SUBTITULO</h2>
      <Link to="/home">
        <button className="login"> Login </button>
      </Link>
    </div>
  );
}

