import React, { createContext, useState } from "react";

// type AppContextType = {
//   account: string;
//   setAccount: React.Dispatch<React.SetStateAction<string>>;
// };

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");


  //CHAT USER DATA
  
  const contextValue = {
    
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
