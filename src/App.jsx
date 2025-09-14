import "./App.css"
import { useState, useEffect } from "react"

// Firebase
import appFirebase from "./credenciales.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Componentes
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx"

const auth = getAuth(appFirebase)

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        // Usuario autenticado
        setLoading(true)
        setTimeout(() => {
          setUser(usuarioFirebase)
          setLoading(false)
        }, 2000) // mantiene 2s la animación
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return <div>{user ? <Home user={user} correo={user.email} /> : <Login />}</div>
}

export default App
