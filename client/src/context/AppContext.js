import React, { createContext, useState } from "react";


import  {connectWallet, checkIfWalletConnected, fetchContract, connectingContract} from "../api/api"

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
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("")


  //function for fetching the data
  const fetchData = async () =>{
  try{
 
 //get contract 
 const contract = await connectingContract()
 //get account 
 const connectAccount = await connectWallet()
 setAccount(connectAccount);
 //GET USERNAME
 const username = await contract.getUsername()
  }catch(err){
    console.error(err)
  }
  }
 

  return (
    <AppContext.Provider value={
       fetchData

    }>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
