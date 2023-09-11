import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Editcase from "./Case Management/EditCase";
import ReporterManagement from "./Reporter Management/ReporterManagement";
import NGOManagement from "./NGO Management/NgoManagement";
import VetManagement from "./Vet Management/VetManagement";
import SponsorManagement from "./Sponsor Management/SponsorManagement";
import UserManagement from "./User Management/UserManagement";
import Settings from "./components/Settings";
import AddUser from "./User Management/AddUser";
import AddNgo from "./NGO Management/AddNgo";
import AddReporter from "./Reporter Management/AddReporter";
import AddVet from "./Vet Management/AddVet";
import AddSponsor from "./Sponsor Management/AddSponsor";
import EditSponsor from "./Sponsor Management/EditSponsor";
import EditVet from "./Vet Management/EditVet";
import EditReporter from "./Reporter Management/EditReporter";
import EditNgo from "./NGO Management/EditNgo";
import EditUser from "./User Management/EditUser";
import React from "react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Editcase" element={<Editcase />} />

            <Route path="/Reporter" element={<ReporterManagement />} />
            <Route path="/Reporter/AddReporter" element={<AddReporter />} />
            <Route path="/Reporter/EditReporter" element={<EditReporter />} />

            <Route path="/NGO" element={<NGOManagement />} />
            <Route path="/NGO/AddNgo" element={<AddNgo />} />
            <Route path="/NGO/EditNgo" element={<EditNgo />} />

            <Route path="/Vet" element={<VetManagement />} />
            <Route path="/Vet/AddVet" element={<AddVet />} />
            <Route path="/Vet/EditVet" element={<EditVet />} />

            <Route path="/Sponsor" element={<SponsorManagement />} />
            <Route path="/Sponsor/AddSponsor" element={<AddSponsor />} />
            <Route path="/Sponsor/EditSponsor" element={<EditSponsor />} />

            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/UserManagement/AddUser" element={<AddUser />} />
            <Route path="/UserManagement/EditUser" element={<EditUser />} />

            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
