import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import appFirebase from "../Credenciales";
import CalendarComponent from "./CalendarComponent";
import logo from "../assets/images/logo.png";
import { Bell, Calendar, Settings } from "lucide-react";
import axios from "axios";
import "../assets/styles/navlogin.css";

const auth = getAuth(appFirebase);

function NavLogin() {
  const [usuario, setUsuario] = useState(null);
  const [usuarioData, setUsuarioData] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user || null);
      if (user) {
        try {
          const res = await axios.get(`http://localhost:5000/me/${user.uid}`);
          setUsuarioData(res.data.success ? res.data.user : null);
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
          setUsuarioData(null);
        }
      } else setUsuarioData(null);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const getInicial = (email) => (email ? email.charAt(0).toUpperCase() : "?");

  if (checkingAuth) {
    return (
      <nav className="nav-login">
        <div className="nav-left">
          <img src={logo} alt="ACEMA" className="nav-logo" />
        </div>
        <div className="nav-right">
          <div className="loader-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav-login">
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="ACEMA" className="nav-logo" />
        </Link>
        {/* <ul className="nav-list">
          <li><Link to="/compras">Compras</Link></li>
          <li><Link to="/rrhh">RRHH</Link></li>
          <li><Link to="/inventario">Inventario</Link></li>
          <li><Link to="/ti">TI</Link></li>
        </ul> */}
      </div>

      <div className="nav-right">
        {usuario && usuarioData && (
          <>
            {/* Iconos en línea */}
            <div className="nav-icons">
              <div className="icon-wrapper" title="Notificaciones">
                <Bell size={20} className="nav-icon" />
              </div>
              <div
                className="icon-wrapper"
                
                onMouseEnter={() => setCalendarOpen(!calendarOpen)}
              >
                <Calendar size={20} className="nav-icon" />
              </div>
              <div className="icon-wrapper" title="Configuración">
                <Settings size={20} className="nav-icon" />
              </div>
            </div>

            {/* Información del usuario */}
            <div className="user-info">
              <div className="user-icon">{getInicial(usuario.email)}</div>
              <div className="nav-user">
                {usuarioData.nombre} {usuarioData.apellido}
                <div className="user-rol">{usuarioData.rol}</div>
              </div>
            </div>

            {/* Modal calendario */}
            {calendarOpen && (
              <div className="calendar-modal">
            
                  {calendarOpen && <CalendarComponent onClose={() => setCalendarOpen(false)} />}
              
              
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default NavLogin;
