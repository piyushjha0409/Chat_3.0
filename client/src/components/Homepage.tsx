import React, { useState, useEffect } from "react";
import useMetamask from "./useMetamask";
import { Link } from "react-router-dom";
const Web3 = require("web3");

type Props = {
  
};

const Homepage = (props: Props) => {

  //useState for setting the account
const [account, setAccount] = useState("");

  //this will return a boolean value
const isMetamaskInstalled = useMetamask();

//function for connection the metamask wallet
async function connectWallet(){
  if (typeof window.ethereum !== undefined) {
    // Request permission to access the user's accounts
    await (window.ethereum as any).request({ method: "eth_requestAccounts" })
    .then(function(accounts: any){
      if(accounts.length > 0){
        const address = accounts[0]
        setAccount(accounts[0])
      }
    })

  } else {
    console.log(
      "Please install MetaMask or another Ethereum-compatible wallet."
    );
  }
}

  //This is the jsx component
  return (
    <>
      <div className="flex justify-center h-32 items-center">
        <h1>Welcome to chat 3.0</h1>
      </div>
      <div className="flex justify-center">
        { !account && (
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={connectWallet}
        >
          Connect Wallet
        </button> 
        )}
        {
          account && (
          <>
            <div className="">
            <p> Welcome! {account}</p>
            <div className="flex justify-center">
            <Link className=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            to="/Chat"
            >Go to Chats</Link>
            </div>
            </div>
          </>
          )
        }
       
      </div>
    </>
  );
};

export default Homepage;
