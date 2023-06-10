import { useState } from 'react';
import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from "./components/Sidebar"
import BlockchainChatArtifact from "../contracts/BlockchainChatArtifact.json";


function App() {
  const contractAddress = process.env.CONTRACT_ADDRESS
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
