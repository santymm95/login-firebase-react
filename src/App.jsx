import "./App.css";
import { useState } from "react";

// importando los módulos de firebase
import appFirebase from "./credenciales.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(appFirebase);
//importar nuestros componentes
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setUser(user);
    } else {
      // User is signed out
      setUser(null);
    }
  });

  return (
    <div>{user ? <Home user={user} correo={user.email} /> : <Login />}</div>
  );
}

export default App;
