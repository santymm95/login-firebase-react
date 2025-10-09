// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZCtulM0uC_tzXjjzKrplE1oytuKSh6ko",
  authDomain: "login-acema.firebaseapp.com",
  projectId: "login-acema",
  storageBucket: "login-acema.firebasestorage.app",
  messagingSenderId: "106090524254",
  appId: "1:106090524254:web:02f9ac7db9098eb017cecf"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Inicializa los servicios de autenticación y base de datos
const auth = getAuth(app);
const db = getFirestore(app);

// Exportaciones para que otros componentes los usen
export { auth, db };
export default app;
