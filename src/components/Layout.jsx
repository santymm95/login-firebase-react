import { useState } from "react"
import NavLogin from "./NavLogin"
import Sidebar from "./Sidebar"

export default function Layout() {
  const [active, setActive] = useState("Inicio")

  const user = {
    name: "Santiago Montoya",
    photo: "https://i.pravatar.cc/150?img=12"
  }

  const handleLogout = () => {
    console.log("Cerrando sesión...")
  }

  return (
    <div className="flex h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col">
        <NavLogin user={user} onLogout={handleLogout} />
        <main className="p-6 flex-1 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">{active}</h2>
          <p>Aquí va el contenido de {active}.</p>
        </main>
      </div>
    </div>
  )
}
