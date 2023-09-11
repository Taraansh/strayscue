import { createContext, useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Change this link here with the backend link
  const websiteUrl = "http://127.0.0.1:8000";

  const [case_id, setCaseID] = useState("");
  const [allCases, setAllCases] = useState([]);
  const [allSponsors, setAllSponsors] = useState([]);
  const [allVets, setAllVets] = useState([]);
  const [allReporters, setAllReporters] = useState([]);
  const [allNgos, setAllNgos] = useState([]);
  const [allCasesLinkedWithNGO, setAllCasesLinkedWithNGO] = useState([]);
  const [allUsersLinkedWithNgo, setAllUsersLinkedWithNgo] = useState([]);
  const [allUsersForAdmin, setAllUsersForAdmin] = useState([]);
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
      toast.error("Enter Correct Credentials.");
    } else {
      toast.success("Logged in Successfully.");
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      const userEmail = jwtDecode(data.access).email;
      const userId = jwtDecode(data.access).user_id;
      const username = jwtDecode(data.access).username;
      const is_superuser = jwtDecode(data.access).is_superuser;
      const type_of_user_in_ngo = jwtDecode(data.access).type_of_user_in_ngo;
      const ngo_linked_with_this_user = jwtDecode(
        data.access
      ).ngo_linked_with_this_user;
      localStorage.setItem("email", userEmail);
      localStorage.setItem("id", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("is_superuser", is_superuser);
      localStorage.setItem("type_of_user_in_ngo", type_of_user_in_ngo);
      localStorage.setItem(
        "ngo_linked_with_this_user",
        ngo_linked_with_this_user
      );
      getUserProfile();
      navigate("/");
    }
  };

  const getUserProfile = useCallback(async () => {
    try {
      const response = await fetch(
        `${websiteUrl}/authorize/getprofile/${localStorage.getItem("email")}/`
      );
      const data = await response.json();
      localStorage.setItem(
        "ngo_linked_with_this_user",
        data.ngo_linked_with_this_user
      );
      localStorage.setItem("ngo_name", data.ngo_name);
      localStorage.setItem("profilePhoto", data.profilePhoto);
    } catch (error) {
      console.error("Error fetching Profile:", error);
    }
  }, [websiteUrl]);

  const logoutUser = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.removeItem("authTokens");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("profilePhoto");
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
    const ngoLinkedWithThisCase = localStorage.getItem(
      "ngo_linked_with_this_user"
    );

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
        ngo_linked_with_this_case: ngoLinkedWithThisCase,
      }),
    });

    let data = await response.json();

    try {
      if (data) {
        if (data.error) {
          console.error("Enter correct details");
        } else {
          setCaseID(data.case_id);
          setType_of_case(data.type_of_case);
          setStatus_of_case(data.status_of_case);
          setMortality_of_case(data.mortality_of_case);
          navigate("/Editcase", { state: { data: data } });
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
      setAllUsersLinkedWithNgo(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Users:", error);
    }
  }, []);

  const getAllUsersForAdmin = useCallback(async () => {
    try {
      const response = await fetch(`${websiteUrl}/authorize/getallusers/`);
      const data = await response.json();
      setAllUsersForAdmin(data);
    } catch (error) {
      // Handle error, e.g., set an error state or display an error message
      console.error("Error fetching Users:", error);
    }
  }, []);

  const handleDownloadImage = async (e, imageUrl) => {
    e.preventDefault();
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "image.jpg"; // You can set a desired file name for the downloaded image
      downloadLink.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  //Handle Button to delete Saved Animal Pictures
  const handleAnimalPictureDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Animal Picture by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deleteanimalpicture/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Animal Picture when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Animal Picture when the delete request fails
          toast.error("Failed to delete Animal Picture");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Animal Picture:", error);
      }
    }
  };

  //Handle Button to delete Saved Feeding Record Image
  const handleFeedingRecordImageDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Feeding Record Image by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deletefeedingrecord/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Feeding Record Image when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Feeding Record Image when the delete request fails
          toast.error("Failed to delete Feeding Record Image");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Feeding Record Image:", error);
      }
    }
  };

  //Handle Button to delete Saved Blood Report Image
  const handleBloodReportImageDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Blood Report by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deletebloodrecord/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Blood Report when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Blood Report when the delete request fails
          toast.error("Failed to delete Blood Report");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Blood Report:", error);
      }
    }
  };

  //Handle Button to delete Saved Medical Prescription Image
  const handleMedicalPrescriptionImageDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Medical Prescription Image by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deletemedicalprescription/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Medical Prescription Image when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Medical Prescription Image when the delete request fails
          toast.error("Failed to delete Medical Prescription Image");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Medical Prescription Image:", error);
      }
    }
  };

  //Handle Button to delete Saved Treatment Record Image
  const handleTreatmentRecordImageDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Treatment Record by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deletetreatmentrecord/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Treatment Record when the when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Treatment Record when the delete request fails
          toast.error("Failed to delete Treatment Record");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Treatment Record:", error);
      }
    }
  };

  //Handle Button to delete Saved Organ Image
  const handleOrganImageDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Organ Image by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deleteorganimage/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Organ Image when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Organ Image when the delete request fails
          toast.error("Failed to delete Organ Image");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Organ Image:", error);
      }
    }
  };

  //Handle Button to delete Saved Post Operation Pictures
  const handlePopPicturesDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Post Operation Pictures by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deletepostoperationpicture/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Post Operation Pictures when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Post Operation Pictures when the delete request fails
          toast.error("Failed to delete Post Operation Picture");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Post Operation Pictures:", error);
      }
    }
  };

  //Handle Button to delete Saved Release Pictures
  const handleReleasePicturesDeleteButton = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Warning: This image will be deleted forever. Are you Sure?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Release Picture by making an API call
        const response = await fetch(
          `${websiteUrl}/cases/deletereleasepicture/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 204) {
          toast.success("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Release Picture when the image was already deleted
          toast.info("Image is already Deleted.");
        } else {
          // Handle the Release Picture when the delete request fails
          toast.error("Failed to delete Release Picture");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Release Picture:", error);
      }
    }
  };

  const updateToken = useCallback(async () => {
    const response = await fetch(`${websiteUrl}/authorize/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

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
    authTokens: authTokens,
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
    allUsersForAdmin: allUsersForAdmin,
    allCasesLinkedWithNGO: allCasesLinkedWithNGO,

    loginUser: loginUser,
    logoutUser: logoutUser,
    addNewCase: addNewCase,
    getAllCases: getAllCases,
    getAllSponsors: getAllSponsors,
    getAllVets: getAllVets,
    getAllReporters: getAllReporters,
    getAllNgos: getAllNgos,
    getAllUsersLinkedWithNgo: getAllUsersLinkedWithNgo,
    getAllUsersForAdmin: getAllUsersForAdmin,
    getAllCasesLinkedWithNgo: getAllCasesLinkedWithNgo,
    handleDownloadImage: handleDownloadImage,
    handleAnimalPictureDeleteButton: handleAnimalPictureDeleteButton,
    handleFeedingRecordImageDeleteButton: handleFeedingRecordImageDeleteButton,
    handleBloodReportImageDeleteButton: handleBloodReportImageDeleteButton,
    handleMedicalPrescriptionImageDeleteButton:
      handleMedicalPrescriptionImageDeleteButton,
    handleTreatmentRecordImageDeleteButton:
      handleTreatmentRecordImageDeleteButton,
    handleOrganImageDeleteButton: handleOrganImageDeleteButton,
    handlePopPicturesDeleteButton: handlePopPicturesDeleteButton,
    handleReleasePicturesDeleteButton: handleReleasePicturesDeleteButton,
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
