import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"; // Iconos
import logo from "../assets/logo.png"; // Logo de ACEMA
import "../App.css"; // Importamos los estilos

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="login-background">
      {/* 👇 Capas del fondo */}
      <div className="bg-3"></div>
      <div className="login-overlay"></div>

      {/* Tarjeta */}
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="ACEMA" className="login-logo" />
          <h2>Bienvenido a ACEMA</h2>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="input-group">
            <span className="input-icon">
              <Mail size={18} />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Botón */}
          <button type="submit" className="login-btn">
            <LogIn size={18} className="btn-icon" /> Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
