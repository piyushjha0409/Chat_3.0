import { useState } from 'react';
import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from "./components/Sidebar"


function App() {
  const contractAddress = process.env.CONTRACT_ADDRESS
  const [account, setAccount] = useState<String>();

  return (
   <>
   <h1>This is the home page of the application</h1>
   <Sidebar  setAccount={setAccount} account={account} />

   </> 
  );
}

export default App;
