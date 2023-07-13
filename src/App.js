import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <PrivateRoute>
              <Route path="/Dashboard" element={<Dashboard />} />
              {/* Add more routes here */}
            </PrivateRoute>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
