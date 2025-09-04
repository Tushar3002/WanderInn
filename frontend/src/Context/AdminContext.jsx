import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { authDataContext } from "./AuthContext";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [users, setUsers] = useState([]);
  const [allListings, setAllListings] = useState([]);

  const fetchUsers = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/admin/users", {
        withCredentials: true,
      });
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchListings = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/admin/listings", {
        withCredentials: true,
      });
      setAllListings(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <adminDataContext.Provider
      value={{ users, allListings, fetchUsers, fetchListings }}
    >
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
