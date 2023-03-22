import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  )
}