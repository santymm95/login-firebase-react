import React, { useState } from "react"
import "../App.css"
import NavLogin from "../components/NavLogin"


function Home() {
  const [active, setActive] = useState("Inicio")

  const user = {
    name: "Santiago Montoya",
    photo: "https://i.pravatar.cc/150?img=12",
  }

  const handleLogout = () => {
    console.log("Cerrando sesión…")
  }

  return (
    <div className="flex h-screen">
    
      {/* 🔹 Contenedor principal (Nav arriba + contenido) */}
      <div className="flex flex-col flex-1">
        {/* Barra superior */}
        <NavLogin user={user} onLogout={handleLogout} />

        {/* Contenido */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Bienvenido a ACEMA</h1>
          <p className="text-gray-700">
            Este es el Home principal de la aplicación.
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">{active}</h2>
            <p>Aquí va el contenido de <b>{active}</b>.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
