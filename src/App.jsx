import React from "react";
import Room from "./pages/Room";
import PrivateRoutes from "./components/PrivateRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./utils/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
