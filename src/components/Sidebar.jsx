import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
  faShoppingCart,
  faFileAlt,
  faBox,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../Credenciales";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const navigate = useNavigate();

  // Detectar cambios en la ruta
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  // Detectar usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/"; // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const menuItems = [
    { id: "inicio", icon: faHome, label: "Inicio", href: "/" },
    { id: "compras", icon: faShoppingCart, label: "Compras", href: "/compras" },
    { id: "rrhh", icon: faFileAlt, label: "RRHH", href: "/rrhh" },
    { id: "inventario", icon: faBox, label: "Inventario", href: "/inventario" },
    { id: "ti", icon: faMicrochip, label: "TI", href: "/ti" },
    { id: "perfil", icon: faUser, label: "Perfil", href: "/perfil" },
    { id: "configuracion", icon: faCog, label: "Configuración", href: "/configuracion" },
  ];

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsExpanded(false);
      }}
    >
      {/* Menú de navegación */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <Link
                to={item.href}
                className={`menu-link ${activeItem === item.href ? "active" : ""}`}
              >
                <div className="menu-icon-wrapper">
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                </div>
                {isExpanded && <span className="menu-text">{item.label}</span>}
                {!isExpanded && isHovered && (
                  <div className="tooltip">{item.label}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer con botón de cerrar sesión */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <div className="logout-icon-wrapper">
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </div>
          {isExpanded && <span className="logout-text">Salir</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
