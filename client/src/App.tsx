import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {abi} from "../src/components/abi"
import Chat from "./components/chat/Chat";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {

  const contractAddress = "0xF02C9B63dDaA173AA8a7794B559200A3f0418E92" 

  const [friends, setFriends] = useState<any[] | null>(null);
  const [myName, setMyName] = useState<string | null>(null);
  const [myPublicKey, setMyPublicKey] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<{ friendname: string | null, publicKey: string | null }>({ friendname: null, publicKey: null });
  const [activeChatMessages, setActiveChatMessages] = useState<any[] | null>(null);
  const [showConnectButton, setShowConnectButton] = useState<string>("block");
  const [myContract, setMyContract] = useState<any>(null);

  //making function for connecting the wallet
  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
          // Request account access if needed
          await provider.send(
              "eth_requestAccounts", []
          );
          return true
      } catch (error) {
          console.error(error)
          return false
      }
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
          contractAddress,
          abi,
          signer
        );
        setMyContract(contract);
        const address = await signer.getAddress();
        //checking if user exists or not
        const present = await contract.checkUserExists( address )

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
    let nickName :string | null = null;
    let messages: any[] = [];
    friends!.forEach(element => {
      if(element.publicKey === friendPublicKey){
        nickName = element.name
      }
    });
    //Now get messages
    const data = await myContract.readMessage(friendPublicKey)
    data.forEach(( item: any )=>{
         const timestamp = new Date(1000*item[1].toNumber()).toUTCString();
         messages.push({"publicKey": item[0], "timestamp": timestamp, "data": item[2]})
    });
    setActiveChat({ friendname: nickName, publicKey: friendPublicKey})
    setActiveChatMessages( messages )
  }

  useEffect(() => {
  const loadFriends = async () => {
   //make  an empty array for the friend list 
   let friendList: any = [];
   //get friends
   try{
    const data = await myContract.getMyFriendList();
    data.array.forEach((element: any) => {
      friendList.push({ "PublicKey": element[0], "name": element[1]})
    });
   }catch(err){
    friendList = null;
   }
   setFriends(friendList)
   console.log(friendList);
  }
  loadFriends(); //calling the function 
  }, [myPublicKey, myContract])


  //Message component
const Messages = activeChatMessages ? activeChatMessages.map((message) => {
  let margin = "5%"
  let sender = activeChat.friendname;
  if( message.publicKey === myPublicKey) {
    margin = "15%"
    sender = "You"
  }
  return(
  <>
  
  </>)
}) : null


//display each chat cards
// const chat = friends ? friends.map((data) => {
//   return (
//     <Chat publicKey={friends.publicKey} name={friends.name}/>

//   )
// }) : null

return (
       <>
       <button onClick={connectToMetamask}>Connect walllet</button>
       </>
  );
}

export default App;
