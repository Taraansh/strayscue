import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [caseId, setCaseID] = useState("");
  const [reportingdetail_set, setReportingdetail_set] = useState([]);
  const [animaldetail_set, setAnimaldetail_set] = useState([]);
  const [medicaldetail_set, setMedicaldetail_set] = useState([]);
  const [operationdetail_set, setOperationdetail_set] = useState([]);
  const [postoperationdetail_set, setPostoperationdetail_set] = useState([]);
  const [type_of_case, setType_of_case] = useState("");
  const [status_of_case, setStatus_of_case] = useState("");
  const [mortality_of_case, setMortality_of_case] = useState("");
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/authorize/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    if (data.detail === "No active account found with the given credentials") {
      alert("Enter Correct Credentials");
    } else {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      const userEmail = jwtDecode(data.access).email;
      const userId = jwtDecode(data.access).user_id;
      localStorage.setItem("email", userEmail);
      localStorage.setItem("id", userId);
      navigate("/");
    }
  };

  let logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("authTokens");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    setAuthTokens(null);
    setUser(null);
    navigate("/");
  };

  let addNewCase = async (typeOfCase, statusOfCase, mortalityOfCase) => {
    const userAddingThisCase = localStorage.getItem("id");

    const response = await fetch("http://127.0.0.1:8000/cases/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type_of_case: typeOfCase,
        status_of_case: statusOfCase,
        mortality_of_case: mortalityOfCase,
        user_adding_this_case: userAddingThisCase,
      }),
    });

    let data = await response.json();

    console.log(data);

    try {
      if (data) {
        if (data.error) {
          console.error("Enter correct details");
        } else {
          setCaseID(data.case_id);
          setReportingdetail_set(data.reportingdetail_set);
          setAnimaldetail_set(data.animaldetail_set);
          setMedicaldetail_set(data.medicaldetail_set);
          setOperationdetail_set(data.operationdetail_set);
          setPostoperationdetail_set(data.postoperationdetail_set);
          setType_of_case(data.type_of_case);
          setStatus_of_case(data.status_of_case);
          setMortality_of_case(data.mortality_of_case);
          navigate("/Addcase");
        }
      }
    } catch (error) {
      console.error("An Error has occurred. Please Try again");
    }
  };

  const updateToken = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/authorize/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      }
    );

    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user: user,
    date: date,
    time: time,
    caseId: caseId,
    reportingdetail_set:reportingdetail_set,
    animaldetail_set:animaldetail_set,
    medicaldetail_set:medicaldetail_set,
    operationdetail_set:operationdetail_set,
    postoperationdetail_set:postoperationdetail_set,
    type_of_case:type_of_case,
    status_of_case:status_of_case,
    mortality_of_case:mortality_of_case,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    addNewCase: addNewCase,
  };

  useEffect(() => {
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${(current.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${current.getDate().toString().padStart(2, "0")}`;
    const currentTime = `${current
      .getHours()
      .toString()
      .padStart(2, "0")}:${current.getMinutes().toString().padStart(2, "0")}`;
    setDate(currentDate);
    setTime(currentTime);
    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [authTokens, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
