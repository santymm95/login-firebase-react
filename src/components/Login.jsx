import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/logo.png";
import "../assets/styles/login.css";
import appFirebase from "../credenciales";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth(appFirebase);

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false); // ✅ Mostrar reCAPTCHA después del clic
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false); // ✅ Habilitar botón

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Primer clic: mostrar reCAPTCHA
  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowRecaptcha(true);
  };

  // Login real, solo se habilita después de completar reCAPTCHA
  const handleActualLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Sesión iniciada:", email);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error("❌ Error en el inicio de sesión:", error.message);
      alert("Error al iniciar sesión: " + error.message);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const emailToReset = prompt("Por favor, introduce tu correo electrónico:");
    if (emailToReset) {
      try {
        await sendPasswordResetEmail(auth, emailToReset);
        alert(
          "Se ha enviado un correo electrónico para restablecer tu contraseña."
        );
        console.log("✅ Correo de restablecimiento enviado a:", emailToReset);
      } catch (error) {
        console.error(
          "❌ Error al enviar el correo de restablecimiento:",
          error.message
        );
        alert("Error al enviar el correo: " + error.message);
      }
    } else {
      alert("Por favor, introduce un correo electrónico válido.");
    }
  };

  const handleRegisterClick = () => {
    alert("Redirigir a la página de registro o abrir un modal.");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRecaptchaChange = (token) => {
    if (token) setRecaptchaCompleted(true);
  };

  return (
    <div className="login-container-split">
      {/* Columna izquierda */}
      <div className="login-left-panel">
        <div className="company-logo-section">
          <img src={logo} alt="Logo de la Compañía" className="company-logo" />
        </div>
        <div className="welcome-content">
          <h1>Bienvenido</h1>
          <p>Regístrate para una cuenta ERP aquí</p>
          <p className="description-text">
            Regístrate para una cuenta ERP gratuita aquí y obtén acceso a la
            tienda web, la academia y el portal de membresía myERP.
          </p>
          <button className="register-button" onClick={handleRegisterClick}>
            REGÍSTRATE AQUÍ
          </button>
        </div>
        <div className="footer-links">
          <span>
            <a href="#">ELEGIR IDIOMA</a>
          </span>
          <span>
            <a href="#">CENTRO DE AYUDA</a>
          </span>
          <span>
            <a href="#">SITIO WEB ERP</a>
          </span>
          <span>
            <a href="#">PRECIOS</a>
          </span>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="login-right-panel">
        <h2>Inicia sesión</h2>
        <form className="login-form-right">
          {/* Email */}
          <div className="floating-label-group">
            <Mail className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="email" className="floating-label">
              Tu Correo Electrónico
            </label>
          </div>

          {/* Contraseña */}
          <div className="floating-label-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="floating-input password-input"
              placeholder=" "
            />
            <label htmlFor="password" className="floating-label">
              Contraseña
            </label>
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOff className="toggle-icon" />
              ) : (
                <Eye className="toggle-icon" />
              )}
            </div>
          </div>

          {/* Botón inicial para mostrar reCAPTCHA */}
          {!showRecaptcha && (
            <button className="login-button" onClick={handleLoginClick}>
              INICIAR SESIÓN
            </button>
          )}

          {/* reCAPTCHA + botón final */}
          {showRecaptcha && (
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6Les98grAAAAAMIB2Sze_m-nEuxWkWNdzercrxLp"
                onChange={handleRecaptchaChange}
              />
              <button
                className="login-button"
                onClick={handleActualLogin}
                disabled={!recaptchaCompleted || loading}
              >
                INICIAR SESIÓN
              </button>
            </div>
          )}

          <a href="#" className="forgot-password" onClick={handlePasswordReset}>
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
