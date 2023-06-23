import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  chatContractABI,
} from "../src/components/constants/Constants";
import Chat from "./components/chat/Chat";
import { useState } from "react";
import { ethers } from "ethers";

function App() {

  const contractAddress = "0x3C3Bd1952a4ed603e6891FB858fFba78BBcF4114Dard04098" 

  const [friend, setFriend] = useState(null);
  const [account, setAccount] = useState(null);
  const [myContract, setMyContract] = useState(null);
  const [myName, setMyName] = useState(null);
  const [pubKey, setMyPubKey] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState("block");

  //making function for connecting the wallet
  const connectToMetamask = () => {
    try {
      (window.ethereum as any).enable();
      return true;
    } catch (err) {
      return false;
      console.error(err);
    }
  };

  //function for login
  const connectWallet = async () => {
    const res = await connectToMetamask();
    if (res === true) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();
      //now we will try connecting the contract
      try {
        const contract = new ethers.Contract(
          contractAddress as string,
          chatContractABI,
          signer
        );
        setMyContract(contract as any);
        const address = await signer.getAddress();
        //checking if user exists or not
        const present = await contract.checkUserExists(address);

        let username;
        if (present) {
          username = await contract.getUsername(address);
        } else {
          username = prompt("Enter the username");
          await contract.createUser(username);
        }
        setMyName(username);
        setMyPubKey(address as any);
        setShowConnectButton("none");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Couldnt connect to metamask");
    }
  };

  //function for adding friend
  async function addChat(name: any, publicKey: any) {
    try {
      let present = await myContract.checkUserExists(publicKey);
      if (!present) {
        alert("Given address not found: Ask him to join the app :)");
        return;
      }
      try {
        await myContract.addFriend(publicKey, name);
        const frnd = { name: name, publicKey: publicKey };
        setFriends(friends.concat(frnd));
      } catch (err) {
        alert(
          "Friend already Added! You can't be friend with the same person twice ;P"
        );
      }
    } catch (err) {
      alert("Invalid address!");
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
