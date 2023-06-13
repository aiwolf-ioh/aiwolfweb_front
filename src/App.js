
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from "./components/HomePage";
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { AuthProvider } from './AuthContext';
import { AlertProvider } from './AlertContext';

function App() {
  return (
    <div className="App bg-light">
      <Router>
        <AuthProvider>
          <AlertProvider>
            <Header/>
            <Alert/>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Routes>
            <Footer/>
          </AlertProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
