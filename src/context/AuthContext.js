import { createContext, useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const websiteUrl = "http://127.0.0.1:8000";
  const [case_id, setCaseID] = useState("");
  const [profileData, setProfileData] = useState(null);

  const [allCases, setAllCases] = useState([]);
  const [allSponsors, setAllSponsors] = useState([]);
  const [allVets, setAllVets] = useState([]);
  const [allReporters, setAllReporters] = useState([]);
  const [allNgos, setAllNgos] = useState([]);
  const [allCasesLinkedWithNGO, setAllCasesLinkedWithNGO] = useState([]);
  const [allUsersLinkedWithNgo, setAllUsersLinkedWithNgo] = useState([]);
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
    const response = await fetch(`${websiteUrl}/authorize/token/`, {
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
      const username = jwtDecode(data.access).username;
      const is_superuser = jwtDecode(data.access).is_superuser;
      const type_of_user_in_ngo = jwtDecode(data.access).type_of_user_in_ngo;
      const ngo_linked_with_this_user = jwtDecode(data.access).ngo_linked_with_this_user;
      localStorage.setItem("email", userEmail);
      localStorage.setItem("id", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("is_superuser", is_superuser);
      localStorage.setItem("type_of_user_in_ngo", type_of_user_in_ngo);
      localStorage.setItem("ngo_linked_with_this_user", ngo_linked_with_this_user);
      getUserProfile()
      navigate("/");
    }
  };

  const getUserProfile = useCallback(async () => {
    try {
        const response = await fetch(`${websiteUrl}/authorize/getprofile/${localStorage.getItem("email")}/`);
        const data = await response.json()
        console.log(data)
        localStorage.setItem("ngo_linked_with_this_user", data.ngo_linked_with_this_user)
        localStorage.setItem("ngo_name", data.ngo_name)
        setProfileData(data)
    } catch (error) {
        console.error("Error fetching Profile:", error);
    }
}, [websiteUrl])

  const logoutUser = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.removeItem("authTokens");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("is_superuser");
      localStorage.removeItem("type_of_user_in_ngo");
      localStorage.removeItem("ngo_linked_with_this_user");
      localStorage.removeItem("ngo_name");
      setAuthTokens(null);
      setUser(null);
      navigate("/");
    },
    [setAuthTokens, setUser, navigate]
  );

  let addNewCase = async (typeOfCase, statusOfCase, mortalityOfCase) => {
    const userAddingThisCase = localStorage.getItem("id");

    const response = await fetch(`${websiteUrl}/cases/add/`, {
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
          setType_of_case(data.type_of_case);
          setStatus_of_case(data.status_of_case);
          setMortality_of_case(data.mortality_of_case);
          navigate("/Editcase", {state: {data: data}});
        }
      }
    } catch (error) {
      console.error("An Error has occurred. Please Try again");
    }
  };

  const getAllCases = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/cases/allcases/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllCases(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching cases:", error);
    }
  }, []);

  const getAllSponsors = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/sponsors/all/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllSponsors(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Sponsors:", error);
    }
  }, []);

  const getAllVets = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/vets/all/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllVets(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Vets:", error);
    }
  }, []);

  const getAllReporters = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/reporters/all/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllReporters(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Reporters:", error);
    }
  }, []);

  const getAllNgos = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/ngos/all/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllNgos(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching NGOs:", error);
    }
  }, []);

  const getAllCasesLinkedWithNgo = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/cases/ngocases/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllCasesLinkedWithNGO(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Cases:", error);
    }
  }, []);

  const getAllUsersLinkedWithNgo = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/ngos/allusers/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      console.log(data);
      setAllUsersLinkedWithNgo(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Users:", error);
    }
  }, []);

  const updateToken = useCallback(async () => {
    const response = await fetch(
      `${websiteUrl}/authorize/token/refresh/`,
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
  }, [authTokens, setAuthTokens, setUser, logoutUser, loading]);

  let contextData = {
    websiteUrl: websiteUrl,
    user: user,
    case_id: case_id,
    type_of_case: type_of_case,
    status_of_case: status_of_case,
    mortality_of_case: mortality_of_case,
    allCases: allCases,
    allSponsors: allSponsors,
    allVets: allVets,
    allReporters: allReporters,
    allNgos: allNgos,
    allUsersLinkedWithNgo: allUsersLinkedWithNgo,
    profileData:profileData,
    allCasesLinkedWithNGO: allCasesLinkedWithNGO,

    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    addNewCase: addNewCase,
    getAllCases: getAllCases,
    getAllSponsors: getAllSponsors,
    getAllVets: getAllVets,
    getAllReporters: getAllReporters,
    getAllNgos: getAllNgos,
    getAllUsersLinkedWithNgo: getAllUsersLinkedWithNgo,
    getAllCasesLinkedWithNgo: getAllCasesLinkedWithNgo,
  };

  useEffect(() => {
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
