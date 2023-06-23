import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { contractAddress, chatContractABI } from "../src/components/constants/Constants";
import Chat from './components/chat/Chat';
import { useState } from 'react';
import {ethers} from "ethers"

function App() {
  const [friend, setFriend] = useState(null)
  const [account,setAccount] = useState(null)
  const [myContract, setMyContract] = useState(null)
  const [myName, setMyName] = useState(null)
  const [pubKey, setMyPubKey] = useState(null)
  const [showConnectButton, setShowConnectButton] = useState("block")

  //making function for connecting the wallet
 const connectToMetamask = () => {
  try{
     (window.ethereum as any).enable();
     return true
  }catch(err){
    return false
    console.error(err)
  }
 }

 //function for login 
 const connectWallet = async () => {
  const res = await connectToMetamask();
  if(res === true){
    const provider = new ethers.providers.Web3Provider(window.ethereum as any)
    const signer = provider.getSigner();
   //now we will try connecting the contract
    try{
      const contract = new ethers.Contract( contractAddress as any, chatContractABI, signer)
      setMyContract(contract as any)
      const address = await  signer.getAddress()
      //checking if user exists or not
      const present = await contract.checkUserExists(address)
      
      let username;
      if(present){
         username = await contract.getUsername( address ) 
      }else{
        username = prompt("Enter the username")
        await contract.createUser(username)
      }
      setMyName(username)
      setMyPubKey(address as any)
      setShowConnectButton("none")
      
    }catch(err){
      console.log(err)
    }
  }else{
    alert("Couldnt connect to metamask")
  }
 }
  
 //function for adding friend
  return (
     <BrowserRouter>
     <Routes>
     <Route path='/Chat' element={<Chat  />} />
     </Routes>
     </BrowserRouter>
      
  );
}

export default App;
