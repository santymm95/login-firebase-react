import React, { useState } from "react";
import { Link } from "react-router-dom";
// importa solo una imagen de fondo
import fondo1 from "../assets/fondo2.webp";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import logo from "../assets/logo.png";
import "../assets/styles/login.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
import appFirebase from "../Credenciales";

const auth = getAuth(appFirebase);

function Login() {
  // Estados para el formulario
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Mostrar reCAPTCHA solo al hacer clic en el botón
  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowRecaptcha(true);
  };

  const handleActualLogin = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Por favor, completa el reCAPTCHA");
      return;
    }

    setLoading(true);

    try {
      // Validación con backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(`❌ ${data.message}`);
        return;
      }

      // Iniciar sesión en Firebase Web SDK
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // Login exitoso → ir directo al home
      // Login exitoso → primero LoadingScreen
      navigate("/LoadingScreen");

      // Después de 3 segundos, ir a Home
      setTimeout(() => {
        navigate("/home");
      }, 3000); // 3000 ms = 3 segundos
    } catch (error) {
      console.error(error);
      alert("❌ Error al conectar con el servidor o Firebase");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const { value: emailToReset } = await MySwal.fire({
      title: "<strong>Restablecer contraseña</strong>",
      html: `
      <p>Ingresa tu correo para enviar el enlace de recuperación:</p>
      <input type="email" id="swal-input" class="swal2-input" placeholder="correo@acemaingenieria.com">`,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      customClass: {
        popup: "my-swal-popup",
        title: "my-swal-title",
        confirmButton: "my-swal-confirm",
        cancelButton: "my-swal-cancel",
        input: "my-swal-input",
      },
      preConfirm: () => {
        const email = document.getElementById("swal-input").value;
        if (!email) {
          Swal.showValidationMessage("¡Debes escribir un correo!");
        }
        return email;
      },
    });

    if (!emailToReset) return;

    try {
      await sendPasswordResetEmail(auth, emailToReset);
      await MySwal.fire({
        icon: "success",
        title: "¡Correo enviado!",
        text: "Se ha enviado un correo para restablecer la contraseña.",
      });
    } catch (error) {
      console.error(error);
      await MySwal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo enviar el correo: ${error.message}`,
      });
    }
  };

  return (
    <div className="login-container-split">
      <div
        className="login-left-panel"
        style={{ backgroundImage: `url(${fondo1})` }}
      >
        <div className="welcome-content">
          <h1>Bienvenido</h1>
          <p>
            <strong>ACEMA Ingeniería</strong> es una empresa de Medellín
            especializada en proyectos eléctricos y energías renovables, con
            experiencia en granjas solares y sistemas de baja, media y alta
            tensión.
          </p>
          <p>
            Conoce más en:{" "}
            <a
              href="https://www.acemaingenieria.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.acemaingenieria.com
            </a>
          </p>
         
        </div>
      </div>

      <div className="login-right-panel">
        <form className="login-form-right" onSubmit={handleActualLogin}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>

        
          <div className="floating-label-group">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="floating-input"
              placeholder=" "
            />
            <label className="floating-label">Correo Electrónico</label>
          </div>

          <div className="floating-label-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="floating-input"
              placeholder=" "
            />
            <label className="floating-label">Contraseña</label>
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOff className="toggle-icon" />
              ) : (
                <Eye className="toggle-icon" />
              )}
            </div>
          </div>
        
          {!showRecaptcha && (
            <button className="login-button" onClick={handleLoginClick}>
              INICIAR SESIÓN
            </button>
            
          )}
    <a href="#" className="forgot-password" onClick={handlePasswordReset}>
            ¿Olvidaste tu contraseña?
          </a>
          {showRecaptcha && (
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6Lc5fskrAAAAAMaSa3Ms-a31TKBo97dZnnhnQwm6"
                onChange={(token) => setRecaptchaToken(token)}
              />
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "..." : "INICIAR SESIÓN"}
              </button>
              
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
