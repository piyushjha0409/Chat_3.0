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

  const [friends, setFriends] = useState<any[] | null>(null);
  const [myName, setMyName] = useState<string | null>(null);
  const [myPublicKey, setMyPublicKey] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<{ friendname: string | null, publicKey: string | null }>({ friendname: null, publicKey: null });
  const [activeChatMessages, setActiveChatMessages] = useState<any[] | null>(null);
  const [showConnectButton, setShowConnectButton] = useState<string>("block");
  const [myContract, setMyContract] = useState<any>(null);

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
        setMyPublicKey(address as any);
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
        const frnd = { "name": name, "publicKey": publicKey };
        setFriends(friends!.concat(frnd));
      } catch (err) {
        alert(
          "Friend already Added! You can't be friend with the same person twice ;P"
        );
      }
    } catch (err) {
      alert("Invalid address!");
    }
  }

  //function for adding the chat message 
  const sendMessage = async (data: string) => {
    if(!(activeChat && activeChat.publicKey )) return;
    const receiverAddress = activeChat.publicKey;
    await myContract.sendMessage(receiverAddress, data);
  }

  //function for fetching the chat messages with a friend
  const getMessage = async (friendPublicKey: string) => {
    let nickName :string | undefined;
    let messages: any[] = [];
    friends!.forEach(element => {
      if(element.publicKey === friendPublicKey){
        nickName = element.name
      }
    });

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
