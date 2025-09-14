const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// Clave secreta de reCAPTCHA. Se obtiene desde las variables de entorno de Firebase.
const RECAPTCHA_SECRET_KEY = functions.config().recaptcha.secret;

/**
 * Función para verificar el token de reCAPTCHA.
 * @param {string} data.recaptchaToken - El token de reCAPTCHA enviado desde el cliente.
 */
exports.verifyRecaptcha = functions.https.onCall(async (data, context) => {
  const { recaptchaToken } = data;

  if (!recaptchaToken) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'El token de reCAPTCHA es requerido.'
    );
  }

  try {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const response = await axios.post(verificationUrl);
    const { success, score } = response.data;

    if (!success) {
      console.error('Verificación de reCAPTCHA fallida:', response.data);
      throw new functions.https.HttpsError(
        'permission-denied',
        'Falló la verificación de reCAPTCHA.'
      );
    }
    
    // Opcional: Para reCAPTCHA v3, puedes verificar la puntuación aquí
    // if (score < 0.5) {
    //   throw new functions.https.HttpsError(
    //     'permission-denied',
    //     'Puntuación de reCAPTCHA muy baja.'
    //   );
    // }

    return { success: true, score: score };

  } catch (error) {
    console.error('Error al verificar reCAPTCHA:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error interno al verificar reCAPTCHA.'
    );
  }
});

/**
 * Función que maneja el inicio de sesión después de verificar reCAPTCHA.
 * @param {string} data.email - Correo del usuario.
 * @param {string} data.password - Contraseña del usuario.
 * @param {string} data.recaptchaToken - Token de reCAPTCHA.
 */
exports.signInWithEmail = functions.https.onCall(async (data, context) => {
  const { email, password, recaptchaToken } = data;

  try {
    // 1. Llama a la función interna para verificar el reCAPTCHA
    await exports.verifyRecaptcha(data, context);

    // 2. Si la verificación es exitosa, procede con la autenticación de Firebase
    const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
    const app = require("firebase/app").initializeApp(functions.config().firebase);
    const auth = getAuth(app);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // 3. Devuelve un token personalizado o un estado de éxito
    const idToken = await userCredential.user.getIdToken();
    return { idToken };

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Error de autenticación.'
    );
  }
});