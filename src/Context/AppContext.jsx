import { createContext, useState } from "react";

export const AppContext = createContext({
  backendurl: "",
  isloggedin: false,
  setIsLoggedin: () => {},
  userData: {},
  setUserData: () => {},
});

export const AppContextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});  

  const value = {
    backendurl,
    isloggedin,
    setIsLoggedin,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
