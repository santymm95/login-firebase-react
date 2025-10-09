import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    pais: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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
        alert("✅ Usuario registrado con éxito");
        navigate("/login");
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      alert("❌ Error en el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} />
      <input name="celular" placeholder="Celular" onChange={handleChange} />
      <input name="pais" placeholder="País" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" type="password" placeholder="Clave" onChange={handleChange} />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Repetir clave"
        onChange={handleChange}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
