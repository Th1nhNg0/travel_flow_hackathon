import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const [user, setUser] = useState<any>({ name: "John Doe" });
  const login = () => {
    setUser({ name: "John Doe" });
  };
  const logout = () => {
    setUser(null);
  };
  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
