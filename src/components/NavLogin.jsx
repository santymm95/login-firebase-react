import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import appFirebase from "../credenciales";
import logo from "../assets/logo.png";
import { LogOut, LogIn, UserPlus } from "lucide-react";

const auth = getAuth(appFirebase);

function NavLogin() {
  const [usuario, setUsuario] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await signOut(auth);
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error.message);
    } finally {
      setLoadingLogout(false);
    }
  };

  // 📌 Obtener inicial del correo
  const getInicial = (email) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  return (
    <nav className="nav-login">
      {/* Logo */}
      <div className="nav-left">
        <img src={logo} alt="ACEMA" className="nav-logo" />
        <h1 className="nav-title">ACEMA</h1>
      </div>

      {/* Sección derecha */}
      <div className="nav-right">
        {usuario ? (
          <>
            <div className="user-info">
              <div className="user-icon">{getInicial(usuario.email)}</div>
              <span className="nav-user">{usuario.email}</span>
            </div>
            <button
              className="nav-btn logout"
              onClick={handleLogout}
              disabled={loadingLogout}
            >
              {loadingLogout ? (
                <div className="loader-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <>
                  <LogOut size={18} /> Cerrar sesión
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="nav-btn login">
              <LogIn size={18} /> Iniciar sesión
            </a>
            <a href="/register" className="nav-btn register">
              <UserPlus size={18} /> Registrarse
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavLogin;
