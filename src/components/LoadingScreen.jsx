// src/components/LoadingScreen.jsx
import React from "react";
import "../App.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <h1>Cargando</h1>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
