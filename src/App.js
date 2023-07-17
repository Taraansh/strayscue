import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import CaseReporterDetails from "./User Management/CaseReporterDetails";
import CaseAnimalDetails from "./User Management/CaseAnimalDetails";
import CaseMedicalDetails from "./User Management/CaseMedicalDetails";
import CaseOperationDetails from "./User Management/CaseOperationDetails";
import CasePostOperationDetails from "./User Management/CasePostOperationDetails";
import Addcase from "./User Management/Addcase";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/caseReporter" element={<CaseReporterDetails />} />
            <Route path="/caseAnimal" element={<CaseAnimalDetails />} />
            <Route path="/caseMedical" element={<CaseMedicalDetails />} />
            <Route path="/caseOperation" element={<CaseOperationDetails />} />
            <Route path="/casePostOperation" element={<CasePostOperationDetails />} />
            <Route path="/Addcase" element={<Addcase />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
