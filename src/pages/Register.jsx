import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Credenciales";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// 🧭 Componentes de navegación
import NavLogin from "../components/NavLogin";
import Sidebar from "../components/Sidebar";

import "../assets/styles/register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    documento: "",
    rol: "",
    clave: "",
  });

  const [mensaje, setMensaje] = useState("");

  const rolesDisponibles = [
    { id: 3, nombre: "Admin" },
    { id: 9, nombre: "Auxiliar de compras" },
    { id: 8, nombre: "Directora Compras" },
    { id: 4, nombre: "Director de proyecto" },
    { id: 7, nombre: "Gerente administrativa" },
    { id: 5, nombre: "Gerente de proyecto" },
    { id: 6, nombre: "Gerente general" },
    { id: 1, nombre: "Solicitante" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("⏳ Verificando usuario...");

    try {
      // 🔍 Verificar si el correo ya existe
      const existingMethods = await fetchSignInMethodsForEmail(auth, formData.correo);
      if (existingMethods.length > 0) {
        setMensaje("⚠️ Este correo ya está registrado. Inicia sesión en lugar de registrarte.");
        return;
      }

      // 🧩 Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.correo,
        formData.clave
      );
      const user = userCredential.user;

      // 💾 Guardar datos en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        documento: formData.documento,
        rol: formData.rol,
        uid: user.uid,
        creadoEn: new Date(),
      });

      setMensaje("✅ Usuario registrado correctamente. Redirigiendo...");

      // 🔁 Redirigir a Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.code === "auth/email-already-in-use") {
        setMensaje("⚠️ Este correo ya está registrado.");
      } else {
        setMensaje("❌ Error: " + error.message);
      }
    }
  };

  return (
    <div className="dashboard-layout">
      {/* 🔹 Barra superior */}
      <NavLogin />

      {/* 🔹 Contenedor principal con sidebar + contenido */}
      <div className="main-content-wrapper">
        <Sidebar />

        <div className="main-content">
          <div className="registro-container">
            <h2>Registro de Usuario</h2>

            <form onSubmit={handleSubmit} className="registro-form">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="documento"
                placeholder="Documento"
                value={formData.documento}
                onChange={handleChange}
                required
              />
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar rol</option>
                {rolesDisponibles.map((r) => (
                  <option key={r.id} value={r.nombre}>
                    {r.nombre}
                  </option>
                ))}
              </select>
              <input
                type="password"
                name="clave"
                placeholder="Contraseña"
                value={formData.clave}
                onChange={handleChange}
                required
              />

              <button type="submit">Registrar usuario</button>
            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <p className="volver-login">
              ¿Ya tienes cuenta?{" "}
              <a href="/" className="link">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
