import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
