import { useState } from 'react';
import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from "./components/Sidebar"
import BlockchainChatArtifact from "../src/contracts/BlockchainChatArtifact.json";
import useChatContract from './useChatContract';


function App() {
  const contractAddress = "0xF5E4c7A97946f0D29d9396e0a9890B943d294dC0"
  const [account, setAccount] = useState<string>();

  const chatContract = useChatContract(
    contractAddress,
    BlockchainChatArtifact.abi,
    account 
  )
  return (
   <>
   <Sidebar  setAccount={setAccount} account={account} />
   {/* <Chat account={account} chatContract={undefined} /> */}
   </> 
  );
}

export default App;
