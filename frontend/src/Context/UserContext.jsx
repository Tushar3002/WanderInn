import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
export const userDataContext = createContext();

function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      if (error.response) {
        console.log("❌ Backend responded with error:");
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data); // 👈 this usually explains the exact reason
      } else if (error.request) {
        console.log("❌ No response from server");
        console.log(error.request);
      } else {
        console.log("❌ Error setting up request");
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    if (serverUrl) {
      getCurrentUser();
    }
  }, [serverUrl]);
  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
