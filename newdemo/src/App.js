import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import Home from "./Home";
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState("register");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    if (user) {
      setAuthenticatedUser(user);
      setCurrentForm("home");
    }
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLogin = (user) => {
    setAuthenticatedUser(user);
    sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
    setCurrentForm("home");
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    sessionStorage.removeItem("authenticatedUser");
    setCurrentForm("login");
  };

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
      ) : currentForm === "register" ? (
        <Register onFormSwitch={toggleForm} />
      ) : (
        <Home user={authenticatedUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
