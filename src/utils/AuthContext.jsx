import React, { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { account, databases } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.info(error);
    }

    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      );
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.log("Login error :", error);
    }
  };

  const handleUserLogOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handleResgiter = async (e, credentials) => {
    e.preventDefault();
    if (credentials.password1 !== credentials.password2) {
      alert("Password not matched");
      return;
    }

    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );
      await account.createEmailSession(
        credentials.email,
        credentials.password1
      );
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogOut,
    handleResgiter,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
