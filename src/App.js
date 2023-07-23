import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Addcase from "./Case Management/Addcase";
import Editcase from "./Case Management/EditCase";
import ReporterManagement from "./Reporter Management/ReporterManagement";
import NGOManagement from "./NGO Management/NgoManagement";
import VetManagement from "./Vet Management/VetManagement";
import SponsorManagement from "./Sponsor Management/SponsorManagement";
import UserManagement from "./User Management/UserManagement"
import Settings from "./components/Settings";
import AddUser from "./User Management/AddUser";
import AddNgo from "./NGO Management/AddNgo";
import AddReporter from "./Reporter Management/AddReporter";
import AddVet from "./Vet Management/AddVet";
import AddSponsor from "./Sponsor Management/AddSponsor";
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
            <Route path="/Editcase" element={<Editcase/>} />
            <Route path="/Reporter" element={<ReporterManagement/>} />
            <Route path="/Reporter/AddReporter" element={<AddReporter/>} />
            <Route path="/NGO" element={<NGOManagement/>} />
            <Route path="/NGO/AddNgo" element={<AddNgo/>} />
            <Route path="/Vet" element={<VetManagement/>} />
            <Route path="/Vet/AddVet" element={<AddVet/>} />
            <Route path="/Sponsor" element={<SponsorManagement/>} />
            <Route path="/UserManagement" element={<UserManagement/>} />

            <Route path="/Sponsor/AddSponsor" element={<AddSponsor/>} />
            <Route path="/User Management" element={<UserManagement/>} />
            <Route path="/User Management/Add User" element={<AddUser/>} />
            <Route path="/Settings" element={<Settings/>} />
          </Routes>
          {/* <div>
  <hr style={{marginTop:"5rem"}}/>
<footer
 style={{textAlign:"center",
 alignItems:"center",
 paddingBottom:"0.5rem",
 display:"flex",
 fontSize:"0.8rem",
 justifyContent:"center"
}}><span style={{ fontWeight:"bold",marginRight:"0.1rem"}}>copyright &copy; Sterilization 2022.</span> <span> All rights reserved</span></footer>   </div> */}

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
