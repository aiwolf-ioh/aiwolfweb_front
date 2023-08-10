import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Main from "./components/Main";
import Newdata from "./components/Newdata";
import Profile from "./components/Profile";
import Data from "./components/Data";
import Edit from "./components/Edit";
import { AlertProvider } from "./AlertContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedToken = localStorage.getItem("token");
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.setItem("token", JSON.stringify(""));
  };

  return (
    <div className="App bg-light">
      <Router>
        <AlertProvider>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Alert />
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<Main isLoggedIn={isLoggedIn} token={token} />} />
            <Route path="/newdata" element={<Newdata token={token} />} />
            <Route path="/profile" element={<Profile token={token} />} />
            <Route path="/data/:id" element={<Data token={token} />} />
            <Route path="/edit/:id" element={<Edit token={token} />} />
          </Routes>
          <Footer />
        </AlertProvider>
      </Router>
    </div>
  );
};

export default App;