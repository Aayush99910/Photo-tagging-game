import React from "react";
import { NavLink } from "react-router-dom";
import waldoThumbnail from "../assets/home-page.jpg";

export default function Home() {
  return (
    <div>
      <nav className="nav-container">
        <div className="nav-image-container">
          <img className="nav-image" src={waldoThumbnail}/>
          <p>WHERE'S WALDO</p>
        </div>
      </nav>
      <main className="game-level-container">
          <NavLink to="/home">
            <button className="play-game-button"> 
              Play Game       
            </button>
          </NavLink>
      </main>
    </div>
  )
}