import React, { useState, useEffect } from "react";
import NavLogin from "../components/NavLogin";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../Credenciales";
import axios from "axios";
import { 
  faUsers, 
  faShoppingCart, 
  faBox, 
  faDesktop 
} from "@fortawesome/free-solid-svg-icons";

import "../assets/styles/dashboard.css";

const auth = getAuth(appFirebase);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [usuarioData, setUsuarioData] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const cardsData = [
    { title: "RRHH", description: "Gestión de recursos humanos", icon: faUsers, bgColor: "#60b8bb9c", color: "#006c70ff", href: "/rrhh" },
    { title: "Compras", description: "Gestión de compras y proveedores", icon: faShoppingCart, bgColor: "#215ba020", color: "#215ba0", href: "/compras" },
    { title: "Inventarios", description: "Control de inventarios", icon: faBox, bgColor: "#215ba020", color: "#215ba0", href: "/inventario" },
    { title: "TI", description: "Soporte y gestión tecnológica", icon: faDesktop, bgColor: "#215ba020", color: "#215ba0", href: "/ti" },
    // Puedes agregar más cards aquí
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:5000/me/${user.uid}`);
          setUsuarioData(res.data.success ? res.data.user : null);
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
          setUsuarioData(null);
        }
      } else {
        setUsuarioData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <NavLogin toggleSidebar={toggleSidebar} />
      <div className="main-content-wrapper">
        <Sidebar isOpen={sidebarOpen} />
        <main className="dashboard-content">
          {usuarioData && (
            <section className="dashboard-header">
              <h1>👋 Bienvenido, <span>{usuarioData.nombre} {usuarioData.apellido}</span></h1>
              <p>Nos alegra verte de nuevo en la plataforma.</p>
            </section>
          )}

          <section className="dashboard-cards-grid">
            {cardsData.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
