import React, { useState, useEffect } from "react";
import { Home, User, Settings, LogOut, FilePlus } from "lucide-react";
import { auth, db } from "../Credenciales";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "../assets/styles/sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);

  // Detectar usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Buscar la info del usuario en Firestore
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
      window.location.href = "/"; // Redirigir al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-header">
        <span className="logo"></span>
        {isExpanded && <h2 className="title">Dashboard</h2>}
      </div>

      <ul className="sidebar-menu">
        <li className="menu-item">
          <a href="#" className="menu-link">
            <Home className="icon" size={24} />
            {isExpanded && <span className="text">Inicio</span>}
          </a>
        </li>

        <li className="menu-item">
          <a href="#" className="menu-link">
            <User className="icon" size={24} />
            {isExpanded && <span className="text">Perfil</span>}
          </a>
        </li>

        <li className="menu-item">
          <a href="#" className="menu-link">
            <Settings className="icon" size={24} />
            {isExpanded && <span className="text">Configuración</span>}
          </a>
        </li>

        {/* 🔹 NUEVA OPCIÓN: Ir al formulario de registro */}
        <li className="menu-item">
          <a href="/register" className="menu-link">
            <User className="icon" size={24} />
            {isExpanded && <span className="text">Registrar usuario</span>}
          </a>
        </li>
      </ul>

      {userData && (
        <div className="sidebar-user">
          <div className="user-info">
            <User size={32} className="user-avatar" />
            {isExpanded && (
              <div className="user-details">
                <span className="user-name">
                  {userData.nombre} {userData.apellido}
                </span>
                <span className="user-role">{userData.rol}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="menu-link logout-btn">
          <LogOut className="icon" size={24} />
          {isExpanded && <span className="text">Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
