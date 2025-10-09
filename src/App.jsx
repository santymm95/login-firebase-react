  import { Routes, Route, Navigate } from "react-router-dom";
  import Login from "./components/Login";
  import Registro from "./components/Registro";
  import Home from "./components/Home";
  import Register from "./pages/Register";
  import LoadingScreen from "./components/LoadingScreen";

  function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/LoadingScreen" element={<LoadingScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  );
}

  export default App;
  
