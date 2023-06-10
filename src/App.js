
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from "./components/HomePage";
import Login from './components/Login';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <div className="App bg-light">
      <Router>
        <AuthProvider>
          <Header/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          <Footer/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
