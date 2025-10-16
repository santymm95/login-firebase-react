import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [rolFilter, setRolFilter] = useState("");

  const roles = [
    "SuperAdmin",
    "Admin",
    "Compras",
    "Colaborador",
    "Administrativo",
    "Director Proyecto",
    "Gerencia de proyectos",
    "Gerencia General",
    "Gerente Ingeniería",
    "Gerente Comercial",
  ];

  // ✅ Traer usuarios desde backend
  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/usuarios");
      if (res.data.success) {
        setUsuarios(res.data.usuarios);
      } else {
        setUsuarios([]);
        console.warn("No se pudieron cargar los usuarios:", res.data.message);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsuarios([]);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      if (res.data.success) {
        alert("✅ Usuario creado correctamente");
        setFormData({
          nombre: "",
          apellido: "",
          celular: "",
          email: "",
          password: "",
          confirmPassword: "",
          rol: "",
        });
        fetchUsuarios(); // recargar tabla
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error en el servidor: " + error.message);
    }
  };

  const filteredUsuarios = rolFilter
    ? usuarios.filter((u) => u.rol === rolFilter)
    : usuarios;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Registrar Usuario</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          name="celular"
          placeholder="Celular"
          value={formData.celular}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Clave"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Repetir clave"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Selecciona un rol</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button type="submit">Crear Usuario</button>
      </form>

      <h3>Usuarios registrados</h3>
      <label>Filtrar por rol: </label>
      <select value={rolFilter} onChange={(e) => setRolFilter(e.target.value)}>
        <option value="">Todos</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((u) => (
            <tr key={u.uid}>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.celular}</td>
              <td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
