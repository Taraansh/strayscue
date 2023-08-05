import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import logo from "../assets/profile.png";
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function EditCase() {
  const path = useLocation()
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState(0);
  const { user, logoutUser, websiteUrl, allReporters, getAllReporters, allVets, getAllVets } = useContext(AuthContext);

  // Reporting Details State
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [reporterName, setReporterName] = useState(null);
  const [reporterContact, setReporterContact] = useState(null);
  const [reporterAltContact, setReporterAltContact] = useState(null);
  const [reporterEmail, setReporterEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [reportedDate, setReportedDate] = useState(null);
  const [reportedTime, setReportedTime] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [consentFormImageFile, setConsentFormImageFile] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState("");
  const [backImagePreview, setBackImagePreview] = useState("");
  const [consentFormImagePreview, setConsentFormImagePreview] = useState("");

  const [isFrontImageDeleted, setIsFrontImageDeleted] = useState(false);
  const [isBackImageDeleted, setIsBackImageDeleted] = useState(false);
  const [isConsentFormImageDeleted, setIsConsentFormImageDeleted] = useState(false);

  // Animal Details State
  const [animalSpecies, setAnimalSpecies] = useState(null);
  const [animalBreed, setAnimalBreed] = useState(null);
  const [animalAge, setAnimalAge] = useState(null);
  const [animalTemperament, setAnimalTemperament] = useState(null);
  const [animalGender, setAnimalGender] = useState(null);
  const [animalPregnant, setAnimalPregnant] = useState(null);
  const [animalMarking, setAnimalMarking] = useState(null);
  const [animalColor, setAnimalColor] = useState(null);
  const [animalCatchable, setAnimalCatchable] = useState(null);
  const [animalWeight, setAnimalWeight] = useState(null);
  const [admissionReason, setAdmissionReason] = useState(null);
  const [animalPictures, setAnimalPictures] = useState([]);
  const [animalPicturesPreview, setAnimalPicturesPreview] = useState([]);

  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // Medical Details State
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [vaccinationStatus, setVaccinationStatus] = useState(null);
  const [dewormed, setDewormed] = useState(null);
  const [fitForSurgery, setFitForSurgery] = useState(null);
  const [otherDetails, setOtherDetails] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [feedingRecordImage, setFeedingRecordImage] = useState(null);
  const [feedingRecordImagePreview, setFeedingRecordImagePreview] = useState("");
  const [bloodReportImage, setBloodReportImage] = useState(null);
  const [bloodReportImagePreview, setBloodReportImagePreview] = useState("");

  const [isFeedingRecordImageDeleted, setIsFeedingRecordImageDeleted] = useState(false);
  const [isBloodReportImageDeleted, setIsBloodReportImageDeleted] = useState(false);

  // Operation Details State
  const [vetName, setVetName] = useState(null);
  const [operationDate, setOperationDate] = useState(null);
  const [operationStartTime, setOperationStartTime] = useState(null);
  const [operationEndTime, setOperationEndTime] = useState(null);
  const [operationOutcome, setOperationOutcome] = useState(null);
  const [medicalPrescriptionImage, setMedicalPrescriptionImage] = useState(null);
  const [medicalPrescriptionImagePreview, setMedicalPrescriptionImagePreview] = useState(null);
  const [treatmentRecordImage, setTreatmentRecordImage] = useState(null);
  const [treatmentRecordImagePreview, setTreatmentRecordImagePreview] = useState(null);
  const [organImage, setOrganImage] = useState(null);
  const [organImagePreview, setOrganImagePreview] = useState(null);

  const [isMedicalPrescriptionImageDeleted, setIsMedicalPrescriptionImageDeleted] = useState(false);
  const [isTreatmentRecordImageDeleted, setIsTreatmentRecordImageDeleted] = useState(false);
  const [isOrganImageDeleted, setIsOrganImageDeleted] = useState(false);

  // Post Operation Details State
  const [popComment, setPopComment] = useState(null);
  const [popFacility, setPopFacility] = useState(null);
  const [popExpectedDays, setPopExpectedDays] = useState(null);
  const [popStartDate, setPopStartDate] = useState(null);
  const [popEndDate, setPopEndDate] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [euthanized, setEuthanized] = useState(null);
  const [comments, setComments] = useState(null);
  const [popPictures, setPopPictures] = useState(null);
  const [popPicturesPreview, setPopPicturesPreview] = useState(null);
  const [releasePictures, setReleasePictures] = useState(null);
  const [releasePicturesPreview, setReleasePicturesPreview] = useState(null);

  const [isPopPicturesDeleted, setIsPopPicturesDeleted] = useState(false);
  const [isReleasePicturesDeleted, setIsReleasePicturesDeleted] = useState(false);

  useEffect(() => {
    getAllReporters();
    getAllVets();
  }, [getAllReporters, getAllVets])


  const buttonStyle = {
    border: "1px solid black",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "2px",
  };

  const handleClick = (index) => {
    setActiveButton(index);
  };

  // Reporting Details Image Management
  const handleFrontImageChange = (event) => {
    const file = event.target.files[0];
    setFrontImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFrontImagePreview("");
    }
  };

  const handleDeleteFrontImage = () => {
    setFrontImageFile(null);
    setFrontImagePreview('');
  };

  const handleDeleteSavedFrontImage = () => {
    setIsFrontImageDeleted(true);
  }

  const handleBackImageChange = (event) => {
    const file = event.target.files[0];
    setBackImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackImagePreview("");
    }
  };

  const handleDeleteBackImage = () => {
    setBackImageFile(null);
    setBackImagePreview('');
  };

  const handleDeleteSavedBackImage = () => {
    setIsBackImageDeleted(true);
  }

  const handleConsentFormImageChange = (event) => {
    const file = event.target.files[0];
    setConsentFormImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConsentFormImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setConsentFormImagePreview("");
    }
  };

  const handleDeleteConsentFormImage = () => {
    setConsentFormImageFile(null);
    setConsentFormImagePreview('');
  };

  const handleDeleteSavedConsentFormImage = () => {
    setIsConsentFormImageDeleted(true);
  }

  // Animal Details Image Management
  const handleAnimalPictursChange = (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files);

    setAnimalPictures(imageFiles);

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setAnimalPicturesPreview(imagePreviews);
  };


  const handleDeleteAnimalPicture = (e, index) => {
    e.preventDefault()
    const updatedPictures = [...animalPictures];
    const updatedPreviews = [...animalPicturesPreview];

    updatedPictures.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setAnimalPictures(updatedPictures);
    setAnimalPicturesPreview(updatedPreviews);
  };

  const handleDeleteSavedAnimalPicture = (e, id) => {
    e.preventDefault()
    setDeletedImageIds([...deletedImageIds, id]);
    handleAnimalPictureDeleteButton(e, id)
  };


  const handleAnimalPictureDeleteButton = async (e, id) => {
    e.preventDefault()
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
          console.log("Image deleted successfully")
        } else if (response.status === 404) {
          // Handle the Animal Picture when the delete request fails
          alert("Image is already Deleted")
        } else {
          // Handle the Animal Picture when the delete request fails
          console.log("Failed to delete Animal Picture:", id);
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting Animal Picture:", error);
      }
    }
  };

  const handleOpenImage = (e, imageUrl) => {
    e.preventDefault();
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.setAttribute('target', '_blank'); // Open the link in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadImage = async (e, imageUrl) => {
    e.preventDefault();
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'animal_picture.jpg'; // You can set a desired file name for the downloaded image
      downloadLink.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Medical Details Image Management
  const handleFeedingRecordImage = (event) => {
    const file = event.target.files[0];
    setFeedingRecordImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeedingRecordImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFeedingRecordImagePreview("");
    }
  };

  const handleDeleteFeedingRecordImage = () => {
    setFeedingRecordImage(null);
    setFeedingRecordImagePreview('');
  };

  const handleDeleteSavedFeedingRecordImage = () => {
    setIsFeedingRecordImageDeleted(true);
  }

  const handleBloodReportImage = (event) => {
    const file = event.target.files[0];
    setBloodReportImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBloodReportImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBloodReportImagePreview("");
    }
  };

  const handleDeleteBloodReportImage = () => {
    setBloodReportImage(null);
    setBloodReportImagePreview('');
  };

  const handleDeleteSavedBloodReportImage = () => {
    setIsBloodReportImageDeleted(true);
  }

  // Operation Details Image Management
  const handleMedicalPrescriptionImage = (event) => {
    const file = event.target.files[0];
    setMedicalPrescriptionImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedicalPrescriptionImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMedicalPrescriptionImagePreview("");
    }
  };

  const handleDeleteMedicalPrescriptionImage = () => {
    setMedicalPrescriptionImage(null);
    setMedicalPrescriptionImagePreview('');
  };

  const handleDeleteSavedMedicalPrescriptionImage = () => {
    setIsMedicalPrescriptionImageDeleted(true);
  }

  const handleTreatmentRecordImage = (event) => {
    const file = event.target.files[0];
    setTreatmentRecordImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTreatmentRecordImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setTreatmentRecordImagePreview("");
    }
  };

  const handleDeleteTreatmentRecordImage = () => {
    setTreatmentRecordImage(null);
    setTreatmentRecordImagePreview('');
  };

  const handleDeleteSavedTreatmentRecordImage = () => {
    setIsTreatmentRecordImageDeleted(true);
  }

  const handleOrganImage = (event) => {
    const file = event.target.files[0];
    setOrganImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrganImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setOrganImagePreview("");
    }
  };

  const handleDeleteOrganImage = () => {
    setOrganImage(null);
    setOrganImagePreview('');
  };

  const handleDeleteSavedOrganImage = () => {
    setIsOrganImageDeleted(true);
  }

  // Post Operation Details Image Management
  const handlePopPictures = (event) => {
    const file = event.target.files[0];
    setPopPictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPopPicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPopPicturesPreview("");
    }
  };

  const handleDeletePopPictures = () => {
    setPopPictures(null);
    setPopPicturesPreview('');
  };

  const handleDeleteSavedPopPictures = () => {
    setIsPopPicturesDeleted(true);
  }

  const handleReleasePictures = (event) => {
    const file = event.target.files[0];
    setReleasePictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReleasePicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setReleasePicturesPreview("");
    }
  };

  const handleDeleteReleasePictures = () => {
    setReleasePictures(null);
    setReleasePicturesPreview('');
  };

  const handleDeleteSavedReleasePictures = () => {
    setIsReleasePicturesDeleted(true);
  }

  // Handling Reporting Details
  const handleUpdateReportingDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (frontImageFile) {
      formData.append('frontImage', frontImageFile ? frontImageFile : null);
    } else if (isFrontImageDeleted) {
      formData.append('frontImage', "null");
    } else {
      formData.append('frontImage', path.state.data.reportingdetail?.frontImage);
    }

    if (backImageFile) {
      formData.append('backImage', backImageFile ? backImageFile : null);
    } else if (isBackImageDeleted) {
      formData.append('backImage', "null");
    } else {
      formData.append('backImage', path.state.data.reportingdetail?.backImage);
    }

    if (consentFormImageFile) {
      formData.append('consentFormImage', consentFormImageFile ? consentFormImageFile : null);
    } else if (isFrontImageDeleted) {
      formData.append('consentFormImage', "null");
    } else {
      formData.append('consentFormImage', path.state.data.reportingdetail?.consentFormImage);
    }

    formData.append("reporterName", reporterName ? reporterName : path.state.data.reportingdetail?.reporterName);
    formData.append("reporterContact", reporterContact ? reporterContact : path.state.data.reportingdetail?.reporterContact);
    formData.append("reporterAltContact", reporterAltContact ? (reporterAltContact ? reporterAltContact : "") : path.state.data.reportingdetail?.reporterAltContact);
    formData.append("reporterEmail", reporterEmail ? (reporterEmail ? reporterEmail : "") : path.state.data.reportingdetail?.reporterEmail);
    formData.append("location", location ? location : path.state.data.reportingdetail?.location);
    formData.append("pincode", pincode ? pincode : path.state.data.reportingdetail?.pincode);
    formData.append("landmark", landmark ? landmark : path.state.data.reportingdetail?.landmark);
    formData.append("reportedDate", reportedDate ? (reportedDate ? reportedDate : "1111-11-11") : (path.state.data.reportingdetail?.reportedDate ? path.state.data.reportingdetail?.reportedDate : "1111-11-11"));
    formData.append("reportedTime", reportedTime ? (reportedTime ? reportedTime : "11:11:11") : (path.state.data.reportingdetail?.reportedTime ? path.state.data.reportingdetail?.reportedTime : "11:11:11"));
    formData.append("pickupDate", pickupDate ? (pickupDate ? pickupDate : "1111-11-11") : (path.state.data.reportingdetail?.pickupDate ? path.state.data.reportingdetail?.pickupDate : "1111-11-11"));
    formData.append("pickupTime", pickupTime ? (pickupTime ? pickupTime : "11:11:11") : (path.state.data.reportingdetail?.pickupTime ? path.state.data.reportingdetail?.pickupTime : "11:11:11"));

    try {
      const response = await axios.put(
        `${websiteUrl}/cases/updatereporter/${path.state.data.reportingdetail?.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log("Success:", response.data);
        alert("Reporter Updated Successfully");
        setActiveButton(1);
        // Handle success or display a success message.
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error or display an error message.
    }
  };

  // Handling Animal Details
  const handleUpdateAnimalDetails = async (e) => {
    e.preventDefault();

    if ((reporterName || path.state.data.reportingdetail?.reporterName) && (reporterContact || path.state.data.reportingdetail?.reporterContact) && (location ||
      path.state.data.reportingdetail?.location) && (pincode || path.state.data.reportingdetail?.pincode) && (location || path.state.data.reportingdetail?.landmark)) {
      const formData = new FormData();
      formData.append("animalSpecies", animalSpecies ? animalSpecies : path.state.data.animaldetail?.animalSpecies);
      formData.append("animalBreed", animalBreed ? animalBreed : path.state.data.animaldetail?.animalBreed);
      formData.append("animalAge", animalAge ? animalAge : path.state.data.animaldetail?.animalAge);
      formData.append("animalTemperament", animalAge ? animalTemperament : path.state.data.animaldetail?.animalAge);
      formData.append("animalGender", animalGender ? animalGender : path.state.data.animaldetail?.animalGender);
      formData.append("animalPregnant", animalPregnant ? animalPregnant : path.state.data.animaldetail?.animalPregnant);
      formData.append("animalMarking", animalMarking ? animalMarking : path.state.data.animaldetail?.animalMarking);
      formData.append("animalColor", animalColor ? animalColor : path.state.data.animaldetail?.animalColor);
      formData.append("animalCatchable", animalCatchable ? animalCatchable : path.state.data.animaldetail?.animalCatchable);
      formData.append("animalWeight", animalWeight ? animalWeight : path.state.data.animaldetail?.animalWeight);
      formData.append("admissionReason", admissionReason ? admissionReason : path.state.data.animaldetail?.admissionReason);
      // Append the selected images to the formData
      for (let i = 0; i < animalPictures.length; i++) {
        formData.append('animalPictures', animalPictures[i]);
      }

      // if (animalPictures) {
      //   formData.append('animalPictures', animalPictures ? animalPictures : null);
      // } else if (isAnimalPictureDeleted){
      //   formData.append('animalPictures', "null");
      // } else{
      //   formData.append('animalPictures', path.state.data.animaldetail?.animalPictures);
      // }

      console.log(animalSpecies)
      console.log(animalBreed)
      console.log(animalAge)
      console.log(animalTemperament)
      console.log(animalGender)
      console.log(animalMarking)
      console.log(animalColor)
      console.log(animalCatchable)
      console.log(animalWeight)
      console.log(admissionReason)
      console.log(animalPictures)

      try {
        const response = await axios.put(
          `${websiteUrl}/cases/updateanimal/${path.state.data.animaldetail?.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("Success:", response.data);
          alert("Animal Details Updated Successfully");
          setActiveButton(2);
          // Handle success or display a success message.
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error or display an error message.
      }
    } else {
      alert("Please fill Reporter Details First")
      setActiveButton(0)
    }
  };

  // Handling Medical Details
  const handleUpdateMedicalDetails = async (e) => {
    e.preventDefault();

    if ((reporterName || path.state.data.reportingdetail?.reporterName) && (reporterContact || path.state.data.reportingdetail?.reporterContact) && (location ||
      path.state.data.reportingdetail?.location) && (pincode || path.state.data.reportingdetail?.pincode) && (location || path.state.data.reportingdetail?.landmark)) {
      const formData = new FormData();

      if (bloodReportImage) {
        formData.append('bloodReportImage', bloodReportImage ? bloodReportImage : null);
      } else if (isBloodReportImageDeleted) {
        formData.append('bloodReportImage', "null");
      } else {
        formData.append('bloodReportImage', path.state.data.medicaldetail?.bloodReportImage);
      }

      if (feedingRecordImage) {
        formData.append('feedingRecordImage', feedingRecordImage ? feedingRecordImage : null);
      } else if (isFeedingRecordImageDeleted) {
        formData.append('feedingRecordImage', "null");
      } else {
        formData.append('feedingRecordImage', path.state.data.medicaldetail?.feedingRecordImage);
      }

      formData.append("medicalHistory", medicalHistory ? medicalHistory : path.state.data.medicaldetail?.medicalHistory);
      formData.append("vaccinationStatus", vaccinationStatus ? vaccinationStatus : path.state.data.medicaldetail?.vaccinationStatus);
      formData.append("dewormed", dewormed ? dewormed : path.state.data.medicaldetail?.dewormed);
      formData.append("fitForSurgery", fitForSurgery ? fitForSurgery : path.state.data.medicaldetail?.fitForSurgery);
      formData.append("otherDetails", otherDetails ? otherDetails : path.state.data.medicaldetail?.otherDetails);
      formData.append("admissionDate", admissionDate ? (admissionDate ? admissionDate : "1111-11-11") : (path.state.data.medicaldetail?.admissionDate ? path.state.data.medicaldetail?.admissionDate : "1111-11-11"));

      try {
        const response = await axios.put(
          `${websiteUrl}/cases/updatemedical/${path.state.data.medicaldetail?.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("Success:", response.data);
          alert("Medical Details Updated Successfully");
          setActiveButton(3);
          // Handle success or display a success message.
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error or display an error message.
      }
    }
    else {
      alert("Please fill Reporter Details First")
      setActiveButton(0)
    }
  };

  // Handling Operation Details
  const handleUpdateOperationDetails = async (e) => {
    e.preventDefault();

    if ((reporterName || path.state.data.reportingdetail?.reporterName) && (reporterContact || path.state.data.reportingdetail?.reporterContact) && (location ||
      path.state.data.reportingdetail?.location) && (pincode || path.state.data.reportingdetail?.pincode) && (location || path.state.data.reportingdetail?.landmark)) {
      const formData = new FormData();

      if (medicalPrescriptionImage) {
        formData.append('medicalPrescriptionImage', medicalPrescriptionImage ? medicalPrescriptionImage : null);
      } else if (isMedicalPrescriptionImageDeleted) {
        formData.append('medicalPrescriptionImage', "null");
      } else {
        formData.append('medicalPrescriptionImage', path.state.data.operationdetail?.medicalPrescriptionImage);
      }

      if (treatmentRecordImage) {
        formData.append('treatmentRecordImage', treatmentRecordImage ? treatmentRecordImage : null);
      } else if (isTreatmentRecordImageDeleted) {
        formData.append('treatmentRecordImage', "null");
      } else {
        formData.append('treatmentRecordImage', path.state.data.operationdetail?.treatmentRecordImage);
      }

      if (organImage) {
        formData.append('organImage', organImage ? organImage : null);
      } else if (isOrganImageDeleted) {
        formData.append('organImage', "null");
      } else {
        formData.append('organImage', path.state.data.operationdetail?.organImage);
      }

      formData.append("vetName", vetName ? vetName : "");
      formData.append("operationDate", operationDate ? operationDate : "1111-11-11");
      formData.append("operationStartTime", operationStartTime ? operationStartTime : "11:11:11");
      formData.append("operationEndTime", operationEndTime ? operationEndTime : "11:11:11");
      formData.append("operationOutcome", operationOutcome ? operationOutcome : "");

      try {
        const response = await axios.put(
          `${websiteUrl}/cases/updateoperational/${path.state.data.operationdetail?.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("Success:", response.data);
          alert("Operation Details Updated Successfully");
          setActiveButton(4);
          // Handle success or display a success message.
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error or display an error message.
      }
    } else {
      alert("Please fill Reporter Details First")
      setActiveButton(0)
    }
  };

  // Handling Post Operation Details
  const handleUpdatePostOperationDetails = async (e) => {
    e.preventDefault();

    if ((reporterName || path.state.data.reportingdetail?.reporterName) && (reporterContact || path.state.data.reportingdetail?.reporterContact) && (location ||
      path.state.data.reportingdetail?.location) && (pincode || path.state.data.reportingdetail?.pincode) && (location || path.state.data.reportingdetail?.landmark)) {

      const formData = new FormData();
      if (popPictures) {
        formData.append('popPictures', popPictures ? popPictures : null);
      } else if (isPopPicturesDeleted) {
        formData.append('popPictures', "null");
      } else {
        formData.append('popPictures', path.state.data.postoperationdetail?.popPictures);
      }

      if (releasePictures) {
        formData.append('releasePictures', releasePictures ? releasePictures : null);
      } else if (isReleasePicturesDeleted) {
        formData.append('releasePictures', "null");
      } else {
        formData.append('releasePictures', path.state.data.postoperationdetail?.releasePictures);
      }

      formData.append("popComment", popComment ? popComment : path.state.data.postoperationdetail?.popComment);
      formData.append("popFacility", popFacility ? popFacility : path.state.data.postoperationdetail?.popFacility);
      formData.append("popExpectedDays", popExpectedDays ? popExpectedDays : path.state.data.postoperationdetail?.popExpectedDays);
      formData.append("popStartDate", popStartDate ? (popStartDate ? popStartDate : "1111-11-11") : (path.state.data.postoperationdetail?.popStartDate ? path.state.data.postoperationdetail?.popStartDate : "1111-11-11"));
      formData.append("popEndDate", popEndDate ? (popEndDate ? popEndDate : "1111-11-11") : (path.state.data.postoperationdetail?.popEndDate ? path.state.data.postoperationdetail?.popEndDate : "1111-11-11"));
      formData.append("releaseDate", releaseDate ? (releaseDate ? releaseDate : "1111-11-11") : (path.state.data.postoperationdetail?.releaseDate ? path.state.data.postoperationdetail?.releaseDate : "1111-11-11"));
      formData.append("euthanized", euthanized ? euthanized : path.state.data.postoperationdetail?.euthanized);
      formData.append("comments", comments ? comments : path.state.data.postoperationdetail?.comments);

      try {
        const response = await axios.put(
          `${websiteUrl}/cases/updatepostoperational/${path.state.data.postoperationdetail?.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("Success:", response.data);
          alert("Post Operation Details Updated Successfully");
          navigate("/Dashboard");
          // Handle success or display a success message.
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error or display an error message.
      }
    } else {
      alert("Please fill Reporter Details First")
      setActiveButton(0)
    }
  };

  // Handle Select Reporter 
  const handleReporterSelection = (e) => {
    const selectedReporterName = e.target.value;

    // Find the selected reporter from the array based on the name
    const selectedReporter = allReporters.find((reporter) => reporter.reported_name === selectedReporterName);

    if (selectedReporter) {
      // Update the state with the selected reporter's information
      setReporterName(selectedReporter.reported_name);
      setReporterContact(selectedReporter.phone_number);
      setReporterEmail(selectedReporter.email_id);
    } else {
      // If the reporter is not found, reset the state
      setReporterName('');
      setReporterContact('');
      setReporterEmail('');
    }
  };

  // Handle Select Vet 
  const handleVetSelection = (e) => {
    const selectedVetName = e.target.value;

    // Find the selected vet from the array based on the name
    const selectedVet = allVets.find((vet) => vet.vet_name === selectedVetName);

    if (selectedVet) {
      // Update the state with the selected vet's information
      setVetName(selectedVet.vet_name);
    } else {
      // If the vet is not found, reset the state
      setVetName('');
    }
  };

  return (user &&
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "2rem",
          margin: "0",

        }}
      >
        <NavBar />
        <div
          style={{
            paddingTop: "3rem",
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            paddingLeft: "50px",
          }}
        >
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="mx-4 px-4">{path.state.data.type_of_case} Case</h4>
            <div style={{ paddingRight: "2rem" }}>
              <Link style={{ marginRight: "0.2rem", textDecoration: "none", fontWeight: "bold" }} to="/Dashboard">
                Dashboard
              </Link>
              <span style={{ fontWeight: "bold", textDecoration: "none" }}>/Edit Case</span>
            </div>
          </div>

          <div className="case-lists mx-auto px-4">
            <div className="row mb-3 top-menu">
              <div className="col">
                <label htmlFor="type_of_case" className="form-label">
                  Type of case
                </label>
                <input
                  id="type_of_case"
                  className="form-control my-1"
                  aria-label="Type of case"
                  name="type_of_case"
                  value={path.state.data.type_of_case}
                  readOnly
                ></input>
              </div>
              <div className="col">
                <label htmlFor="status_of_case" className="form-label">
                  Status of case
                </label>
                <input
                  id="status_of_case"
                  className="form-control my-1"
                  aria-label="Status of case"
                  name="status_of_case"
                  value={path.state.data.status_of_case}
                  readOnly
                ></input>
              </div>
              <div className="col">
                <label htmlFor="mortality_of_case" className="form-label">
                  Mortality of case
                </label>
                <input
                  id="mortality_of_case"
                  className="form-control my-1"
                  aria-label="Mortality of case"
                  name="mortality_of_case"
                  value={path.state.data.mortality_of_case}
                  readOnly
                ></input>
              </div>
            </div>
          </div>

          <div className="case-lists mx-auto">
            <div className="mx-auto px-4 container-fluid">
              {/* Change bar */}
              <div
                className="btn-group form-1 mt-2"
                style={{ width: "100%" }}
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  style={buttonStyle}
                  type="button"
                  className={`btn btn-outline-secondary ${activeButton === 0 ? "active" : ""
                    }`}
                  onClick={() => handleClick(0)}
                >
                  Reporter Details
                </button>
                <button
                  style={buttonStyle}
                  type="button"
                  className={`btn btn-outline-secondary ${activeButton === 1 ? "active" : ""
                    }`}
                  onClick={() => handleClick(1)}
                >
                  Animal Details
                </button>
                <button
                  style={buttonStyle}
                  type="button"
                  className={`btn btn-outline-secondary ${activeButton === 2 ? "active" : ""
                    }`}
                  onClick={() => handleClick(2)}
                >
                  Medical Details
                </button>
                <button
                  style={buttonStyle}
                  type="button"
                  className={`btn btn-outline-secondary ${activeButton === 3 ? "active" : ""
                    }`}
                  onClick={() => handleClick(3)}
                >
                  Operation Details
                </button>
                <button
                  style={buttonStyle}
                  type="button"
                  className={`btn btn-outline-secondary ${activeButton === 4 ? "active" : ""
                    }`}
                  onClick={() => handleClick(4)}
                >
                  Post Operation Details
                </button>
              </div>

              {activeButton === 0 && (
                <>
                  <div className="my-3">
                    <h2>Reporter Details:</h2>

                    {!path.state.data.reportingdetail?.reporterName &&
                      (<div className="mb-3">
                        <label htmlFor="selectReporter" className="form-label">
                          Select from saved Reporter
                        </label>
                        <select
                          id="selectReporter"
                          className="form-select"
                          name="selectReporter"
                          onChange={handleReporterSelection}
                          defaultValue={reporterName} // To ensure the selected option is the same as the reporterName state}
                        >
                          <option value="">Choose Reporter</option>
                          {allReporters.map((data, index) => {
                            return (
                              <option key={index} value={data.reported_name}>{data.reported_name}</option>
                            )
                          })
                          }
                        </select>
                      </div>)}

                    <form onSubmit={handleUpdateReportingDetails}>
                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="reporterName" className="form-label">
                              Reporter Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="reporterName"
                              aria-describedby="reporterNameHelp"
                              name="reporterName"
                              placeholder="Name"
                              required
                              defaultValue={reporterName || (path.state.data.reportingdetail?.reporterName === "null" ? '' : path.state.data.reportingdetail?.reporterName)}
                              onChange={(e) => setReporterName(e.target.value)}
                              autoComplete="name"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="contact" className="form-label">
                              Phone Number<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="contact"
                              aria-describedby="contactHelp"
                              name="reporterContact"
                              placeholder="Phone Number"
                              required
                              defaultValue={reporterContact || (path.state.data.reportingdetail?.reporterContact === "null" ? '' : path.state.data.reportingdetail?.reporterContact)}
                              onChange={(e) => setReporterContact(e.target.value)}
                              autoComplete="tel"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="altcontact" className="form-label">
                              Alternte Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="altcontact"
                              aria-describedby="altCcontactHelp"
                              name="reporterAltContact"
                              defaultValue={path.state.data.reportingdetail?.reporterAltContact === "null" ? '' : path.state.data.reportingdetail?.reporterAltContact}
                              placeholder="Alternate Phone Number"
                              onChange={(e) =>
                                setReporterAltContact(e.target.value)
                              }
                              autoComplete="altnumber"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="reporterEmail" className="form-label">
                              Email ID
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="reporterEmail"
                              aria-describedby="emailHelp"
                              name="reporterEmail"
                              placeholder="Email ID"
                              defaultValue={reporterEmail || (path.state.data.reportingdetail?.reporterEmail === "null" ? '' : path.state.data.reportingdetail?.reporterEmail)}
                              onChange={(e) => setReporterEmail(e.target.value)}
                              autoComplete="email"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Landmark<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              aria-describedby="addressHelp"
                              name="landmark"
                              placeholder="Near to xyz place"
                              required
                              defaultValue={path.state.data.reportingdetail?.landmark === "null" ? '' : path.state.data.reportingdetail?.landmark}
                              onChange={(e) => setLandmark(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">
                              Pincode<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="pincode"
                              aria-describedby="pincodeHelp"
                              name="pincode"
                              placeholder="Pincode"
                              required
                              defaultValue={path.state.data.reportingdetail?.pincode === "null" ? '' : path.state.data.reportingdetail?.pincode}
                              onChange={(e) => setPincode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="location" className="form-label">
                              Location<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="location"
                              aria-describedby="locationHelp"
                              name="location"
                              placeholder="Location"
                              required
                              defaultValue={path.state.data.reportingdetail?.location === "null" ? '' : path.state.data.reportingdetail?.location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="form-group col">
                          <label className="form-label" htmlFor="reporteddate">
                            Reported Date
                          </label>
                          <input
                            className="form-control"
                            id="reporteddate"
                            name="reportedDate"
                            type="date"
                            defaultValue={path.state.data.reportingdetail?.reportedDate ? (path.state.data.reportingdetail?.reportedDate === '1111-11-11' ? "" : path.state.data.reportingdetail?.reportedDate) : ''}
                            onChange={(e) => setReportedDate(e.target.value)}
                          />
                        </div>
                        <div className="form-group col">
                          <label className="form-label" htmlFor="reportedTime">
                            Reported Time
                          </label>
                          <input
                            className="form-control"
                            id="reportedTime"
                            name="reportedTime"
                            type="time"
                            defaultValue={path.state.data.reportingdetail?.reportedTime ? (path.state.data.reportingdetail?.reportedTime === '11:11:11' ? "" : path.state.data.reportingdetail?.reportedTime) : ''}
                            onChange={(e) => setReportedTime(e.target.value)}
                          />
                        </div>
                        <div className="form-group col">
                          <label className="form-label" htmlFor="pickupDate">
                            Pickup Date
                          </label>
                          <input
                            className="form-control"
                            id="pickupDate"
                            name="pickupDate"
                            placeholder="MM/DD/YYYY"
                            type="date"
                            defaultValue={path.state.data.reportingdetail?.pickupDate ? (path.state.data.reportingdetail?.pickupDate === '1111-11-11' ? "" : path.state.data.reportingdetail?.pickupDate) : ''}
                            onChange={(e) => setPickupDate(e.target.value)}
                          />
                        </div>
                        <div className="form-group col">
                          <label className="form-label" htmlFor="pickupTime">
                            Pickup Time
                          </label>
                          <input
                            className="form-control"
                            id="pickupTime"
                            name="pickupTime"
                            type="time"
                            defaultValue={path.state.data.reportingdetail?.pickupTime ? (path.state.data.reportingdetail?.pickupTime === '11:11:11' ? "" : path.state.data.reportingdetail?.pickupTime) : ''}
                            onChange={(e) => setPickupTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <h4 className="my-2">Reporter Photo ID-</h4>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label className="form-label" htmlFor="frontImage">
                              Front Photo:
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="frontImage"
                                accept="image/*"
                                name="frontImage"
                                onChange={handleFrontImageChange}
                              />
                            </div>
                          </div>
                          {(!isFrontImageDeleted)
                            ? ((path.state.data.reportingdetail?.frontImage) ? (<div>
                              <h6>Preview:</h6>
                              <img
                                src={`http://localhost:8000${path.state.data.reportingdetail?.frontImage}`}
                                alt="Consent Form Preview"
                                height="100px"
                              />
                              <button onClick={handleDeleteSavedFrontImage}>Delete</button>
                            </div>) : (frontImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={frontImagePreview}
                                  alt="Consent Form Preview"
                                  height="100px"
                                />
                                <button onClick={handleDeleteFrontImage}>Delete</button>
                              </div>))
                            ) : (frontImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={frontImagePreview}
                                  alt="Consent Form Preview"
                                  height="100px"
                                />
                                <button onClick={handleDeleteFrontImage}>Delete</button>
                              </div>))}

                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label className="form-label" htmlFor="backImage">
                              Back Photo:
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="backImage"
                                name="backImage"
                                accept="image/*"
                                onChange={handleBackImageChange}
                              />
                            </div>
                          </div>
                          {(!isBackImageDeleted) ? ((path.state.data.reportingdetail?.backImage) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.reportingdetail?.backImage}`}
                              alt="Consent Form Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedBackImage}>Delete</button>
                          </div>) : (backImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={backImagePreview}
                                alt="Consent Form Preview"
                                height="100px"
                              />
                              <button onClick={handleDeleteBackImage}>Delete</button>
                            </div>))
                          ) : (backImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={backImagePreview}
                                alt="Consent Form Preview"
                                height="100px"
                              />
                              <button onClick={handleDeleteBackImage}>Delete</button>
                            </div>))}
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="consentFormImage"
                          >
                            Consent Form
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="consentFormImage"
                              name="consentFormImage"
                              accept="image/*"
                              onChange={handleConsentFormImageChange}
                            />
                          </div>
                        </div>
                        {(!isConsentFormImageDeleted) ? ((path.state.data.reportingdetail?.consentFormImage) ? (<div>
                          <h6>Preview:</h6>
                          <img
                            src={`http://localhost:8000${path.state.data.reportingdetail?.consentFormImage}`}
                            alt="Consent Form Preview"
                            height="100px"
                          />
                          <button onClick={handleDeleteSavedConsentFormImage}>Delete</button>
                        </div>) : (consentFormImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={consentFormImagePreview}
                              alt="Consent Form Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteConsentFormImage}>Delete</button>
                          </div>))
                        ) : (consentFormImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={consentFormImagePreview}
                              alt="Consent Form Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteConsentFormImage}>Delete</button>
                          </div>))}
                      </div>

                      <div className="my-3">
                        <button
                          type="button"
                          style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                          className="btn"
                          onClick={() => {
                            setActiveButton(1);
                          }}
                        >
                          Next
                        </button>
                        <button
                          type="submit"
                          style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                          className="btn  float-end mx-1"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                          className="btn  float-end mx-1"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to Exit?"
                            );
                            if (confirmDelete) {
                              navigate("/Dashboard");
                            }
                          }}
                        >
                          Exit
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {activeButton === 1 && (
                <>
                  <div className="my-3">
                    <h2>Further Animal Details :</h2>
                    <h5>Animal ID:</h5>
                    <form onSubmit={handleUpdateAnimalDetails}>
                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="animalSpecies" className="form-label">
                              Animal Species
                            </label>
                            <select
                              id="animalSpecies"
                              className="form-select"
                              aria-label="Animal Species"
                              name="animalSpecies"
                              defaultValue={path.state.data.animaldetail?.animalSpecies || ''}
                              onChange={(e) => {
                                setAnimalSpecies(e.target.value);
                              }}
                            >
                              <option value="">Choose Species</option>
                              <option value="Dog">Dog</option>
                              <option value="Cat">Cat</option>
                              <option value="Bird">Bird</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="animalBreed" className="form-label">
                              Animal Breed
                            </label>
                            <select
                              id="animalBreed"
                              className="form-select"
                              aria-label="Animal Breed"
                              name="animalBreed"
                              defaultValue={path.state.data.animaldetail?.animalBreed || ''}
                              onChange={(e) => {
                                setAnimalBreed(e.target.value);
                              }}
                            >
                              <option value="">Choose Breed</option>
                              <option value="Indie">Indie</option>
                              <option value="Pet">Pet</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="animalAge" className="form-label">
                              Animal Age
                            </label>
                            <select
                              id="animalAge"
                              className="form-select"
                              aria-label="Animal Age"
                              name="animalAge"
                              defaultValue={path.state.data.animaldetail?.animalAge || ''}
                              onChange={(e) => {
                                setAnimalAge(e.target.value);
                              }}
                            >
                              <option value="">Age</option>
                              <option value="0-1">0-1 Yrs</option>
                              <option value="1-5">1-5 Yrs</option>
                              <option value="5-10">5-10 Yrs</option>
                              <option value="10+">10+ Yrs</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="animalTemperament"
                              className="form-label"
                            >
                              Animal Temperament
                            </label>
                            <select
                              id="animalTemperament"
                              className="form-select"
                              aria-label="Animal Temperament"
                              name="animalTemperament"
                              defaultValue={path.state.data.animaldetail?.animalTemperament || ''}
                              onChange={(e) => {
                                setAnimalTemperament(e.target.value);
                              }}
                            >
                              <option value="">Choose</option>
                              <option value="Friendly">Friendly</option>
                              <option value="Aggressive">Aggressive</option>
                              <option value="Scared">Scared</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="animalGender" className="form-label">
                              Animal Gender
                            </label>
                            <select
                              id="animalGender"
                              className="form-select"
                              aria-label="Animal Gender"
                              name="animalGender"
                              defaultValue={path.state.data.animaldetail?.animalGender || ''}
                              onChange={(e) => {
                                setAnimalGender(e.target.value);
                              }}
                            >
                              <option value="">Choose Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="animalPregnant"
                              className="form-label"
                            >
                              Animal Pregnant
                            </label>
                            <select
                              id="animalPregnant"
                              className="form-select"
                              aria-label="Animal Pregnant"
                              name="animalPregnant"
                              defaultValue={path.state.data.animaldetail?.animalPregnant || ''}
                              onChange={(e) => {
                                setAnimalPregnant(e.target.value);
                              }}
                            >
                              <option value="">Choose</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                              <option value="Not Sure">Not Sure</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="form-group col mb-3">
                          <label htmlFor="animalMarking" className="form-label">
                            Animal Marking
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="animalMarking"
                            name="animalMarking"
                            placeholder="Animal Marking"
                            aria-label="Animal Marking"
                            defaultValue={path.state.data.animaldetail?.animalMarking === "null" ? '' : path.state.data.animaldetail?.animalMarking}
                            onChange={(e) => {
                              setAnimalMarking(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group col mb-3">
                          <label htmlFor="animalColor" className="form-label">
                            Animal Color
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="animalColor"
                            name="animalColor"
                            placeholder="Animal Color"
                            aria-label="Animal Color"
                            defaultValue={path.state.data.animaldetail?.animalColor === "null" ? '' : path.state.data.animaldetail?.animalColor}
                            onChange={(e) => {
                              setAnimalColor(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group col mb-3">
                          <label htmlFor="animalCatchable" className="form-label">
                            Animal Catchable
                          </label>
                          <select
                            id="animalCatchable"
                            className="form-select"
                            aria-label="Animal Catchable"
                            name="animalCatchable"
                            defaultValue={path.state.data.animaldetail?.animalCatchable}
                            onChange={(e) => {
                              setAnimalCatchable(e.target.value);
                            }}
                          >
                            <option value="">Choose</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="form-group col mb-3">
                          <label htmlFor="animalWeight" className="form-label">
                            Animal Weight (kgs)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="animalWeight"
                            name="animalWeight"
                            placeholder="Animal Weight"
                            aria-label="Animal Weight (kgs)"
                            defaultValue={path.state.data.animaldetail?.animalWeight === "null" ? '' : path.state.data.animaldetail?.animalWeight}
                            onChange={(e) => {
                              setAnimalWeight(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group col mb-3">
                          <label htmlFor="admissionReason" className="form-label">
                            Reason for Admission
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="admissionReason"
                            name="admissionReason"
                            placeholder="Reason for Admission"
                            aria-label="Reason for Admission"
                            defaultValue={path.state.data.animaldetail?.admissionReason === "null" ? '' : path.state.data.animaldetail?.admissionReason}
                            onChange={(e) => {
                              setAdmissionReason(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      {/* <div className="row form-1">
                      <div className="form-group mb-3">
                        <label
                          className="form-label h5"
                          htmlFor="animalPictures"
                        >
                          Animal Pictures -
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="btn custom-file-input"
                            id="animalPictures"
                            name="animalPictures"
                            accept="image/*"
                            onChange={handleAnimalPictursChange}
                          />
                        </div>
                      </div>
                      {(!isAnimalPictureDeleted)?((path.state.data.animaldetail?.animalPictures) ? (<div>
                            <h6>Preview:</h6>
                            <img
                            src={`http://localhost:8000${path.state.data.animaldetail?.animalPictures}`}
                            alt="Animal Pictures Preview"
                            height="100px"
                            />
                            <button onClick={handleDeleteSavedAnimalPicture}>Delete</button>
                        </div>) : (animalPicturesPreview && (
                        <div>
                          <h6>Preview:</h6>
                            <img
                              src={animalPicturesPreview}
                              alt="Animal Pictures Preview"
                              height="100px"
                            />
                          <button onClick={handleDeleteAnimalPicture}>Delete</button>
                        </div>))):(animalPicturesPreview && (
                        <div>
                          <h6>Preview:</h6>
                            <img
                              src={animalPicturesPreview}
                              alt="Animal Pictures Preview"
                              height="100px"
                            />
                          <button onClick={handleDeleteAnimalPicture}>Delete</button>
                        </div>))}
                    </div> */}
                      <div className="form-group mb-3">
                        <label className="form-label h5" htmlFor="animalPictures">
                          Animal Pictures -
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="btn custom-file-input"
                            id="animalPictures"
                            name="animalPictures"
                            accept="image/*"
                            multiple
                            onChange={handleAnimalPictursChange}
                          />
                        </div>
                      </div>
                      {/* {path.state.data.animaldetail?.animalPictures ? (path.state.data.animaldetail?.animalPictures.map((data, index)=>(
                        <div key={index}>
                          <h6>Preview:</h6>
                          <img src={`http://localhost:8000${path.state.data.animaldetail?.animalPictures[index]?.animalPictures}`} alt="Animal Pictures Preview" height="100px" />
                          <button>Delete</button>
                        </div>
                      ))) : (animalPicturesPreview.map((preview, index) => (
                        <div key={index}>
                          <h6>Preview:</h6>
                          <img src={preview} alt="Animal Pictures Preview" height="100px" />
                          <button onClick={(e) => handleDeleteAnimalPicture(e, index)}>
                            Delete
                          </button>
                        </div>
                      )))
                    } */}
                      {animalPicturesPreview.length > 0 && (
                        <div>
                          <h4>Preview</h4>
                          <div className='my-2' style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gridGap: "10px",
                            padding: "20px",
                            maxWidth: "1200px",
                            margin: "0 auto",
                          }}>

                            {animalPicturesPreview.map((preview, index) => (
                              <div key={index} className='my-1'>
                                <img src={preview} alt="Animal Pictures Preview" height="100px" />
                                <button onClick={(e) => handleDeleteAnimalPicture(e, index)}>
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {path.state.data.animaldetail?.animalPictures.length > 0 && (
                        <div className='my-2' style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                          gridGap: "10px",
                          padding: "20px",
                          maxWidth: "1200px",
                          margin: "0 auto",
                        }}>
                          {/* <h6>Preview of Saved Images:</h6> */}
                          {path.state.data.animaldetail.animalPictures.map((data, index) => (
                            // Check if the image ID is not in the deletedImageIds array
                            // If not, display the image and the delete button
                            !deletedImageIds.includes(data.id) && (
                              <div key={index} className='my-1'>
                                <p>Image {index + 1}:</p>
                                <img
                                  src={`http://localhost:8000${data.animalPictures}`}
                                  alt="Animal Pictures Preview"
                                  height="100px"
                                />
                                <div className='my-3' style={{ display: "flex", alignItems: "center" }} >
                                  <button className='btn' style={{ background: "#ffffff", border: "1px solid grey", padding: "0.3rem" }} onClick={(e) => handleDeleteSavedAnimalPicture(e, data.id)}> <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="red"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"
                                      id="_icons"
                                      fill="red"
                                      className="fill-000000"
                                    ></path>
                                  </svg></button>
                                  <button className='mx-2 btn btn-primary' style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }} onClick={(e) => handleOpenImage(e, `http://localhost:8000${data.animalPictures}`)}>
                                    Open
                                  </button>
                                  <button className='btn btn-primary' style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff", paddingLeft:"0.4rem", paddingRight:"0", paddingBottom:"0.2rem" }} onClick={(e) => handleDownloadImage(e, `http://localhost:8000${data.animalPictures}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-download" viewBox="0 0 24 24">
                                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg> </button>


                                </div>

                                <div className=" my-3">
                                  <label className="form-label" htmlFor="admissionDate">
                                    Upload Date:
                                  </label>
                                  <input

                                    className="my-0 form-control"
                                    id="animal_picture_upload_date"
                                    name="animal_picture_upload_date"
                                    type="date"
                                    readOnly
                                    disabled
                                    value={data.animal_picture_upload_date}
                                  />
                                </div>
                              </div>
                            )))}
                        </div>
                      )}


                      <div className="my-2">
                        <div className="form-buttons">
                          <div className='mb-2'>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn "
                              onClick={() => {
                                setActiveButton(0);
                              }}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn mx-2"
                              onClick={() => {
                                setActiveButton(2);
                              }}
                            >
                              Next
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn mx-2"
                              onClick={() => {
                                const confirmDelete = window.confirm(
                                  "Are you sure you want to Exit?"
                                );
                                if (confirmDelete) {
                                  navigate("/Dashboard");
                                }
                              }}
                            >
                              Exit
                            </button>
                            <button
                              type="submit"
                              className="btn"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {activeButton === 2 && (
                <>
                  <div className="my-3">
                    <h2>Medical Details:</h2>
                    <form onSubmit={handleUpdateMedicalDetails}>
                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="medicalHistory"
                              className="form-label"
                            >
                              Medical History / Other Issues
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="medicalHistory"
                              defaultValue={path.state.data.medicaldetail?.medicalHistory === "null" ? '' : path.state.data.medicaldetail?.medicalHistory}
                              name="medicalHistory"
                              placeholder="Medical History / Other Issues"
                              onChange={(e) => setMedicalHistory(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="vaccinationStatus"
                              className="form-label"
                            >
                              Animal Vaccinated
                            </label>
                            <select
                              id="vaccinationStatus"
                              className="form-select"
                              aria-label="Animal Vaccinated"
                              name="vaccinationStatus"
                              defaultValue={path.state.data.medicaldetail?.vaccinationStatus || ''}
                              onChange={(e) =>
                                setVaccinationStatus(e.target.value)
                              }
                            >
                              <option value="">Choose Vaccination Status</option>
                              <option value="Already Done">Already Done</option>
                              <option value="To be done in NGO">To be done in NGO</option>
                              <option value="Not Done">Not Done</option>
                              <option value="Unsure">Unsure</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="dewormed" className="form-label">
                              Animal Dewormed
                            </label>
                            <select
                              id="dewormed"
                              className="form-select"
                              aria-label="Animal Dewormed"
                              name="dewormed"
                              defaultValue={path.state.data.medicaldetail?.dewormed || ''}
                              onChange={(e) => setDewormed(e.target.value)}
                            >
                              <option value="">Choose</option>
                              <option value="Already Done">Already Done</option>
                              <option value="To be done in NGO">
                                To be done in NGO
                              </option>
                              <option value="Not Done">Not Done</option>
                              <option value="Unsure">Unsure</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="fitForSurgery" className="form-label">
                              Animal Fit for Surgery
                            </label>
                            <select
                              id="fitForSurgery"
                              className="form-select"
                              aria-label="Animal Fit for Surgery"
                              name="fitForSurgery"
                              defaultValue={path.state.data.medicaldetail?.fitForSurgery || ''}
                              onChange={(e) => setFitForSurgery(e.target.value)}
                            >
                              <option value="">Choose</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                              <option value="Unsure">Unsure</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="otherDetails" className="form-label">
                              Other Details
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="otherDetails"
                              defaultValue={path.state.data.medicaldetail?.otherDetails === "null" ? '' : path.state.data.medicaldetail?.otherDetails}
                              name="otherDetails"
                              placeholder="Other Details"
                              onChange={(e) => setOtherDetails(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="admissionDate">
                              Admission Date
                            </label>
                            <input
                              className="form-control"
                              id="admissionDate"
                              name="admissionDate"
                              type="date"
                              defaultValue={path.state.data.medicaldetail?.admissionDate ? (path.state.data.medicaldetail?.admissionDate === '1111-11-11' ? "" : path.state.data.medicaldetail?.admissionDate) : ''}
                              onChange={(e) => setAdmissionDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-3">
                            <label
                              className="form-label"
                              htmlFor="bloodReportImage"
                            >
                              Blood Report Pictures -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="bloodReportImage"
                                accept="image/*"
                                name="bloodReportImage"
                                onChange={handleBloodReportImage}
                              />
                            </div>
                          </div>
                          {(!isBloodReportImageDeleted) ? ((path.state.data.medicaldetail?.bloodReportImage) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.medicaldetail?.bloodReportImage}`}
                              alt="Consent Form Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedBloodReportImage}>Delete</button>
                          </div>) : (bloodReportImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={bloodReportImagePreview}
                                alt="Blood Report Preview"
                                height="100px"
                              />
                              <button onClick={handleDeleteBloodReportImage}>Delete</button>
                            </div>))) : (bloodReportImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={bloodReportImagePreview}
                                  alt="Blood Report Preview"
                                  height="100px"
                                />
                                <button onClick={handleDeleteBloodReportImage}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="form-group mb-3">
                            <label
                              className="form-label"
                              htmlFor="feedingRecordImage"
                            >
                              Feeding Record Pictures -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="feedingRecordImage"
                                accept="image/*"
                                name="feedingRecordImage"
                                onChange={handleFeedingRecordImage}
                              />
                            </div>
                          </div>
                          {(!isFeedingRecordImageDeleted) ? ((path.state.data.medicaldetail?.feedingRecordImage) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.medicaldetail?.feedingRecordImage}`}
                              alt="Feeding Record Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedFeedingRecordImage}>Delete</button>
                          </div>) : (feedingRecordImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={feedingRecordImagePreview}
                                alt="Feeding Record Preview"
                                height="100px"
                              />
                              <button onClick={handleDeleteFeedingRecordImage}>Delete</button>
                            </div>))) : (feedingRecordImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={feedingRecordImagePreview}
                                  alt="Feeding Record Preview"
                                  height="100px"
                                />
                                <button onClick={handleDeleteFeedingRecordImage}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="my-1">
                        <div className="form-buttons">
                          <div className='mb-2'>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn"
                              onClick={() => {
                                setActiveButton(1);
                              }}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn  mx-2"
                              onClick={() => {
                                setActiveButton(3);
                              }}
                            >
                              Next
                            </button>

                          </div>
                          <div>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn  mx-1"
                              onClick={() => {
                                const confirmDelete = window.confirm(
                                  "Are you sure you want to Exit?"
                                );
                                if (confirmDelete) {
                                  navigate("/Dashboard");
                                }
                              }}
                            >
                              Exit
                            </button>
                            <button
                              type="submit"
                              className="btn"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {activeButton === 3 && (
                <>
                  <div className="my-3">
                    <h2>Operation Details :</h2>

                    {!path.state.data.operationdetail?.vetName &&
                      (<div className="mb-3">
                        <label htmlFor="selectVet" className="form-label">
                          Select from saved Vet
                        </label>
                        <select
                          id="selectVet"
                          className="form-select"
                          name="selectVet"
                          onChange={handleVetSelection}
                          defaultValue={vetName} // To ensure the selected option is the same as the vetName state}
                        >
                          <option value="">Choose Vet</option>
                          {allVets.map((data, index) => {
                            return (
                              <option key={index} value={data.vet_name}>{data.vet_name}</option>
                            )
                          })
                          }
                        </select>
                      </div>)}

                    <form onSubmit={handleUpdateOperationDetails}>
                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-3">
                            <label htmlFor="vetName" className="form-label">
                              Vet Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="vetName"
                              defaultValue={vetName || (path.state.data.operationdetail?.vetName === "null" ? '' : path.state.data.operationdetail?.vetName)}
                              name="vetName"
                              placeholder="Vet Name"
                              onChange={(e) => setVetName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group mb-3">
                            <label className="form-label" htmlFor="operationDate">
                              Operation Date
                            </label>
                            <input
                              className="form-control"
                              id="operationDate"
                              name="operationDate"
                              type="date"
                              defaultValue={path.state.data.operationdetail?.operationDate ? (path.state.data.operationdetail?.operationDate === '1111-11-11' ? "" : path.state.data.operationdetail?.operationDate) : ''}
                              onChange={(e) => setOperationDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col mb-3">
                          <div className="row form-1">
                            <div className="form-group col">
                              <label
                                className="form-label"
                                htmlFor="operationStartTime"
                              >
                                Operation Start Time
                              </label>
                              <input
                                className="form-control"
                                id="operationStartTime"
                                name="operationStartTime"
                                type="time"
                                defaultValue={path.state.data.operationdetail?.operationStartTime ? (path.state.data.operationdetail?.operationStartTime === '11:11:11' ? "" : path.state.data.operationdetail?.operationStartTime) : ''}
                                onChange={(e) =>
                                  setOperationStartTime(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-group col">
                              <label
                                className="form-label"
                                htmlFor="operationEndTime"
                              >
                                Operation End Time
                              </label>
                              <input
                                className="form-control"
                                id="operationEndTime"
                                name="operationEndTime"
                                type="time"
                                defaultValue={path.state.data.operationdetail?.operationEndTime ? (path.state.data.operationdetail?.operationEndTime === '11:11:11' ? "" : path.state.data.operationdetail?.operationEndTime) : ''}
                                onChange={(e) =>
                                  setOperationEndTime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col mb-3">
                          <label
                            htmlFor="operationOutcome"
                            className="form-label"
                          >
                            Operation Outcome
                          </label>
                          <select
                            id="operationOutcome"
                            className="form-select"
                            aria-label="Operation Outcome"
                            name="operationOutcome"
                            defaultValue={path.state.data.operationdetail?.operationOutcome || ''}
                            onChange={(e) => setOperationOutcome(e.target.value)}
                          >
                            <option value="">Choose Outcome</option>
                            <option value="Success">Success</option>
                            <option value="Failure">Failure</option>
                            <option value="Complicated">Complicated</option>
                          </select>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-2">
                            <label
                              className="form-label"
                              htmlFor="medicalPrescriptionImage"
                            >
                              Medication Prescription -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="medicalPrescriptionImage"
                                accept="image/*"
                                name="medicalPrescriptionImage"
                                onChange={handleMedicalPrescriptionImage}
                              />
                            </div>
                          </div>
                          {(!isMedicalPrescriptionImageDeleted) ? ((path.state.data.operationdetail?.medicalPrescriptionImage) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.operationdetail?.medicalPrescriptionImage}`}
                              alt="Medical Prescription Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedMedicalPrescriptionImage}>Delete</button>
                          </div>) : (medicalPrescriptionImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={medicalPrescriptionImagePreview}
                                alt="Feeding Record Preview"
                                height="100px"
                              /><button onClick={handleDeleteMedicalPrescriptionImage}>Delete</button>
                            </div>))) : (medicalPrescriptionImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={medicalPrescriptionImagePreview}
                                  alt="Feeding Record Preview"
                                  height="100px"
                                /><button onClick={handleDeleteMedicalPrescriptionImage}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-2">
                            <label
                              className="form-label"
                              htmlFor="treatmentRecordImage"
                            >
                              Treatment Records -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="treatmentRecordImage"
                                accept="image/*"
                                name="treatmentRecordImage"
                                onChange={handleTreatmentRecordImage}
                              />
                            </div>
                          </div>
                          {(!isTreatmentRecordImageDeleted) ? ((path.state.data.operationdetail?.treatmentRecordImage) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.operationdetail?.treatmentRecordImage}`}
                              alt="Treatment Records Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedTreatmentRecordImage}>Delete</button>
                          </div>) : (treatmentRecordImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={treatmentRecordImagePreview}
                                alt="Treatment Records Preview"
                                height="100px"
                              /><button onClick={handleDeleteTreatmentRecordImage}>Delete</button>
                            </div>))) : (treatmentRecordImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={treatmentRecordImagePreview}
                                  alt="Treatment Records Preview"
                                  height="100px"
                                /><button onClick={handleDeleteTreatmentRecordImage}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-2">
                            <label className="form-label" htmlFor="organImage">
                              Organ Pictures -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="organImage"
                                accept="image/*"
                                name="organImage"
                                onChange={handleOrganImage}
                              />
                            </div>
                          </div>
                          {(!isOrganImageDeleted) ? ((path.state.data.operationdetail?.organImage) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.operationdetail?.organImage}`}
                              alt="Organ Pictures Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedOrganImage}>Delete</button>
                          </div>) : (organImagePreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={organImagePreview}
                                alt="Organ Pictures Preview"
                                height="100px"
                              /><button onClick={handleDeleteOrganImage}>Delete</button>
                            </div>))) : (organImagePreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={organImagePreview}
                                  alt="Organ Pictures Preview"
                                  height="100px"
                                /><button onClick={handleDeleteOrganImage}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="my-1">
                        <div className="form-buttons">
                          <div className='mb-2'>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn "
                              onClick={() => {
                                setActiveButton(2);
                              }}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn  mx-2"
                              onClick={() => {
                                setActiveButton(4);
                              }}
                            >
                              Next
                            </button>

                          </div>
                          <div>
                            <button
                              type="button"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                              className="btn  mx-1"
                              onClick={() => {
                                const confirmDelete = window.confirm(
                                  "Are you sure you want to Exit?"
                                );
                                if (confirmDelete) {
                                  navigate("/Dashboard");
                                }
                              }}
                            >
                              Exit
                            </button>
                            <button
                              type="submit"
                              className="btn"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {activeButton === 4 && (
                <>
                  <div className="my-3">
                    <h2>Post Operation Details :</h2>
                    <form onSubmit={handleUpdatePostOperationDetails}>
                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="popComment" className="form-label">
                              Post-Operation Comments
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="popComment"
                              defaultValue={path.state.data.postoperationdetail?.popComment === "null" ? '' : path.state.data.postoperationdetail?.popComment}
                              name="popComment"
                              placeholder="Comments"
                              onChange={(e) => setPopComment(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="popFacility" className="form-label">
                              Post-Operation facility
                            </label>
                            <select
                              id="popFacility"
                              className="form-select"
                              aria-label="Post-Operation facility"
                              name="popFacility"
                              defaultValue={path.state.data.postoperationdetail?.popFacility || ''}
                              onChange={(e) => setPopFacility(e.target.value)}
                            >
                              <option value="">Choose Facility</option>
                              <option value="In Shelter">In Shelter</option>
                              <option value="Not in shelter">
                                Not in shelter
                              </option>
                              <option value="On Street">On Street</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="popExpectedDays"
                              className="form-label"
                            >
                              Post-Operation Expected Days
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="popExpectedDays"
                              defaultValue={path.state.data.postoperationdetail?.popExpectedDays === "null" ? '' : path.state.data.postoperationdetail?.popExpectedDays}
                              name="popExpectedDays"
                              placeholder="Expected Days"
                              onChange={(e) => setPopExpectedDays(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col mb-3">
                          <label className="form-label" htmlFor="popStartDate">
                            Post-Operation Start Date
                          </label>
                          <input
                            className="form-control"
                            id="popStartDate"
                            name="popStartDate"
                            type="date"
                            defaultValue={path.state.data.postoperationdetail?.popStartDate ? (path.state.data.postoperationdetail?.popStartDate === '1111-11-11' ? "" : path.state.data.postoperationdetail?.popStartDate) : ''}
                            onChange={(e) => setPopStartDate(e.target.value)}
                          />
                        </div>
                        <div className="col mb-3">
                          <label className="form-label" htmlFor="popEndDate">
                            Post-Operation End Date
                          </label>
                          <input
                            className="form-control"
                            id="popEndDate"
                            name="popEndDate"
                            type="date"
                            defaultValue={path.state.data.postoperationdetail?.popEndDate ? (path.state.data.postoperationdetail?.popEndDate === '1111-11-11' ? "" : path.state.data.postoperationdetail?.popEndDate) : ''}
                            onChange={(e) => setPopEndDate(e.target.value)}
                          />
                        </div>
                        <div className="col mb-3">
                          <label className="form-label" htmlFor="releaseDate">
                            Release Date
                          </label>
                          <input
                            className="form-control"
                            id="releaseDate"
                            name="releaseDate"
                            type="date"
                            defaultValue={path.state.data.postoperationdetail?.releaseDate ? (path.state.data.postoperationdetail?.releaseDate === '1111-11-11' ? "" : path.state.data.postoperationdetail?.releaseDate) : ''}
                            onChange={(e) => setReleaseDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="euthanized" className="form-label">
                              Euthanized
                            </label>
                            <select
                              id="euthanized"
                              className="form-select"
                              aria-label="Euthanized"
                              name="euthanized"
                              defaultValue={path.state.data.postoperationdetail?.euthanized || ''}
                              onChange={(e) => setEuthanized(e.target.value)}
                            >
                              <option value="">Choose</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="comments" className="form-label">
                              Other Comments
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="comments"
                              defaultValue={path.state.data.postoperationdetail?.comments === "null" ? '' : path.state.data.postoperationdetail?.comments}
                              name="comments"
                              placeholder="Other Comments"
                              onChange={(e) => setComments(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-2">
                            <label className="form-label" htmlFor="popPictures">
                              Post-Operation Pictures -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="popPictures"
                                accept="image/*"
                                name="popPictures"
                                onChange={handlePopPictures}
                              />
                            </div>
                          </div>
                          {(!isPopPicturesDeleted) ? ((path.state.data.postoperationdetail?.popPictures) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.postoperationdetail?.popPictures}`}
                              alt="Animal Pictures Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedPopPictures}>Delete</button>
                          </div>) : (popPicturesPreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={popPicturesPreview}
                                alt="Post Operation Pictures Preview"
                                height="100px"
                              /><button onClick={handleDeletePopPictures}>Delete</button>
                            </div>))) : (popPicturesPreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={popPicturesPreview}
                                  alt="Post Operation Pictures Preview"
                                  height="100px"
                                /><button onClick={handleDeletePopPictures}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="row form-1">
                        <div className="col">
                          <div className="form-group mb-2">
                            <label
                              className="form-label"
                              htmlFor="releasePictures"
                            >
                              Release Pictures -
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="btn custom-file-input"
                                id="releasePictures"
                                accept="image/*"
                                name="releasePictures"
                                onChange={handleReleasePictures}
                              />
                            </div>
                          </div>
                          {(!isReleasePicturesDeleted) ? ((path.state.data.postoperationdetail?.releasePictures) ? (<div>
                            <h6>Preview:</h6>
                            <img
                              src={`http://localhost:8000${path.state.data.postoperationdetail?.releasePictures}`}
                              alt="Release Pictures Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteSavedReleasePictures}>Delete</button>
                          </div>) : (releasePicturesPreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={releasePicturesPreview}
                                alt="Release Pictures Preview"
                                height="100px"
                              /><button onClick={handleDeleteReleasePictures}>Delete</button>
                            </div>))) : (releasePicturesPreview && (
                              <div>
                                <h6>Preview:</h6>
                                <img
                                  src={releasePicturesPreview}
                                  alt="Release Pictures Preview"
                                  height="100px"
                                /><button onClick={handleDeleteReleasePictures}>Delete</button>
                              </div>))}
                        </div>
                      </div>

                      <div className="my-1">
                        <button
                          type="button"
                          style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                          className="btn "
                          onClick={() => {
                            setActiveButton(3);
                          }}
                        >
                          Previous
                        </button>
                        <button
                          type="submit"
                          style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                          className="btn float-end mx-1"
                        >
                          Save
                        </button>
                        <button
                          type="Button"
                          style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }}
                          className="btn  float-end mx-1"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to Exit?"
                            );
                            if (confirmDelete) {
                              navigate("/Dashboard");
                            }
                          }}
                        >
                          Exit
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            right: "0.1rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100vw",
            fontSize: "20px",
            zIndex: "9",
            padding: "0.5rem 0.5rem",
            backgroundColor: "#ffffff"
          }}>
          <span>
            <label style={{ padding: "0.5rem", fontWeight: "bold" }}>
              {localStorage.getItem("username")}
            </label>
            <img
              width="17%"
              style={{ marginRight: "1.5rem", cursor: "pointer" }}
              src={logo}
              alt="Logo"
            ></img>
            <i
              style={{ cursor: "pointer" }}
              className="fa-solid fa-right-from-bracket"
              onClick={logoutUser}
            ></i>
          </span>
        </div>
      </div>
    </>
  )
}
