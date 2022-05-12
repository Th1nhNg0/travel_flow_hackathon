import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAPI from "../api/user";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState(null);
  const login = ({ email, password }) => {
    return UserAPI.signIn({ email, password }).then((user) => {
      setUser(user);
    });
  };
  const register = ({ email, name, password }) => {
    return UserAPI.signUp({ email, name, password }).then((user) => {
      setUser(user);
    });
  };
  const logout = () => {
    AsyncStorage.removeItem("token");
    setUser(null);
  };
  useEffect(() => {
    setisLoading(true);
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          UserAPI.getUser().then((user) => {
            setUser(user);
          });
        }
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  const value = {
    user,
    isLoading,
    isLoggedIn: !!user,
    login,
    logout,
    register,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
