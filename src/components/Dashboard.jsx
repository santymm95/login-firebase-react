import React, { useState } from 'react';
import NavLogin from './NavLogin';
import Sidebar from './Sidebar';
import '../assets/styles/dashboard.css';

const Dashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Navbar superior */}
      <NavLogin toggleSidebar={toggleSidebar} />

      {/* Contenedor principal */}
      <div className="main-content-wrapper">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Contenido principal */}
        <main className="dashboard-content">
          {/* Grid de cards */}
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Métricas</h3>
              <p>Datos clave de la aplicación.</p>
            </div>
            <div className="dashboard-card">
              <h3>Notificaciones</h3>
              <p>Últimas alertas y mensajes.</p>
            </div>
            <div className="dashboard-card">
              <h3>Proyectos</h3>
              <p>Resumen de proyectos activos.</p>
            </div>
            <div className="dashboard-card">
              <h3>Usuarios</h3>
              <p>Resumen de actividad de usuarios.</p>
            </div>
          </div>

          {/* Contenido específico de la página */}
          <div className="dashboard-page-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
