
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from "./components/HomePage";
import Login from './components/Login';

function App() {
  return (
    <div className="App bg-light">
      <Header/>
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      <Footer/>
    </div>
  );
}

export default App;
