import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import appFirebase from "../Credenciales";
import logo from "../assets/logo.png";
import { LogOut } from "lucide-react";
import "../assets/styles/navlogin.css";

const auth = getAuth(appFirebase);

function NavLogin() {
  const [usuario, setUsuario] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // ✅ estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user ? user : null);
      setCheckingAuth(false); // ✅ autenticación lista
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error.message);
    } finally {
      setLoadingLogout(false);
    }
  };

  const getInicial = (email) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  // Mientras Firebase verifica la sesión, mostramos un placeholder
  if (checkingAuth) {
    return (
      <nav className="nav-login">
        <div className="nav-left">
          <img src={logo} alt="ACEMA" className="nav-logo" />
        </div>
        <div className="nav-right">
          <div className="loader-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav-login">
      <div className="nav-left">
        <img src={logo} alt="ACEMA" className="nav-logo" />
      </div>

      <div className="nav-right">
        {usuario && (
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
        )}
      </div>
    </nav>
  );
}

export default NavLogin;
