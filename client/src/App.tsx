import { useState } from 'react';
import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from "./components/Sidebar"


function App() {
  const contractAddress = process.env.CONTRACT_ADDRESS
  const [account, setAccount] = useState<string>();

  return (
   <>
   <Sidebar  setAccount={setAccount} account={account} />
   {/* <Chat account={account} chatContract={undefined} /> */}
   </> 
  );
}

export default App;
