import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Addcase from "./Case Management/Addcase";
import EditCase from "./Case Management/EditCase";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Addcase" element={<Addcase />} />
            <Route path="/Editcase" element={<EditCase />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
