import axios from "axios";
import React, { useState, useContext, createContext, useEffect } from "react";
import { authDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newListData, setNewListData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let [searchData, setSearchData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [editingId, setEditingId] = useState(null);

  let { serverUrl } = useContext(authDataContext);

  const handleAddListing = async () => {
    setAdding(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      const result = await axios.post(
        serverUrl + "/api/listing/add",
        formData,
        { withCredentials: true }
      );
      setAdding(false);
      console.log(result);
      navigate("/");
      toast.success("AddListing Successfully");
      setTitle("");
      setDescription(null);
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandmark("");
      setCategory("");
    } catch (error) {
      setAdding(true);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateListing = async (id) => {
    setUpdating(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);
      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);

      const result = await axios.post(
        serverUrl + `/api/listing/update/${id}`,
        formData,
        { withCredentials: true }
      );
      setUpdating(false);
      toast.success("Listing updated successfully");
      setEditingId(null);
      navigate("/");
    } catch (error) {
      setUpdating(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteListing = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(serverUrl + `/api/listing/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Listing deleted");
      await getListing();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const startEditListing = (list) => {
    setEditingId(list._id);
    setTitle(list.title || "");
    setDescription(list.description || "");
    setFrontEndImage1(list.image1 || null);
    setFrontEndImage2(list.image2 || null);
    setFrontEndImage3(list.image3 || null);
    setBackEndImage1(null);
    setBackEndImage2(null);
    setBackEndImage3(null);
    setRent(list.rent || "");
    setCity(list.city || "");
    setLandmark(list.landmark || "");
    setCategory(list.category || "");
    // Go to step 1 where inputs exist; user can update and proceed
    navigate("/listingpage1");
  };

  const startNewListing = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setFrontEndImage1(null);
    setFrontEndImage2(null);
    setFrontEndImage3(null);
    setBackEndImage1(null);
    setBackEndImage2(null);
    setBackEndImage3(null);
    setRent("");
    setCity("");
    setLandmark("");
    setCategory("");
    navigate("/listingpage1");
  };
  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      console.log(result.data);
      setCardDetails(result.data);
      navigate(`/viewcard/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (data) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/search?query=${data}`
      );
      setSearchData(result.data);
    } catch (error) {
      setSearchData(null);
      console.log(error);
    }
  };

  const getListing = async () => {
    try {
      setIsLoading(true);
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getListing();
  }, [adding, updating, deleting]);

  let value = {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    handleAddListing,
    handleUpdateListing,
    handleDeleteListing,
    startEditListing,
    startNewListing,
    adding,
    setAdding,
    listingData,
    setListingData,
    getListing,
    newListData,
    setNewListData,
    handleViewCard,
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleting,
    setDeleting,
    handleSearch,
    searchData,
    setSearchData,
    isLoading,
    setIsLoading,
    editingId,
    setEditingId,
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
}

export default ListingContext;
