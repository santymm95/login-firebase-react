// src/components/ResetPassword.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Hook para obtener el oobCode y navegar
import { getAuth, confirmPasswordReset } from "firebase/auth";
import appFirebase from "../credenciales";

const auth = getAuth(appFirebase);

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Para redirigir al Login
  const oobCode = searchParams.get("oobCode"); // Captura el código de la URL

  // Verifica el oobCode cuando el componente se monta
  useEffect(() => {
    if (!oobCode) {
      setError("❌ El enlace de restablecimiento es inválido o ha caducado.");
    }
  }, [oobCode]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // 1. Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("❌ Las contraseñas no coinciden.");
      return;
    }

    // 2. Validar la longitud de la contraseña
    if (password.length < 6) {
      setError("❌ La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // 3. Confirmar el restablecimiento con Firebase
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
      setError(null);
      alert("✅ Contraseña restablecida con éxito.");
      navigate("/"); // 4. Redirige al login después de 2 segundos
    } catch (err) {
      console.error(err);
      setError("❌ Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      {error && <p className="error-message">{error}</p>}
      {!success ? (
        <form onSubmit={handlePasswordChange}>
          <div className="input-group">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cambiar Contraseña</button>
        </form>
      ) : (
        <p>
          Tu contraseña ha sido restablecida. Serás redirigido al inicio de
          sesión.
        </p>
      )}
    </div>
  );
}

export default ResetPassword;