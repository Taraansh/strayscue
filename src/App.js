import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Addcase from "./Case Management/Addcase";
import ReporterManagement from "./Reporter Management/ReporterManagement";
import NGOManagement from "./NGO Management/NgoManagement";
import VetManagement from "./Vet Management/VetManagement";
import SponsorManagement from "./Sponsor Management/SponsorManagement";
import UserManagement from "./User Management/UserManagement"
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Addcase" element={<Addcase />} />
            <Route path="/Reporter" element={<ReporterManagement/>} />
            <Route path="/NGO" element={<NGOManagement/>} />
            <Route path="/Vet" element={<VetManagement/>} />
            <Route path="/Sponsor" element={<SponsorManagement/>} />
            <Route path="/User Management" element={<UserManagement/>} />
          </Routes>
          <div>
  <hr style={{marginTop:"5rem"}}/>
<footer
 style={{textAlign:"center",
 alignItems:"center",
 paddingBottom:"0.5rem",
 display:"flex",
 fontSize:"0.8rem",
 justifyContent:"center"
}}><span style={{ fontWeight:"bold",marginRight:"0.1rem"}}>copyright &copy; Sterilization 2022.</span> <span> All rights reserved</span></footer>   </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
