import React, {useState, useEffect} from 'react'
import useMetamask from './useMetamask';
const Web3 = require("web3")


type Props = {}

const [account, setAccount] = useState("")
//this will return a boolean value 
const isMetamaskInstalled = useMetamask();

//function for connection the metamask wallet 
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      // Request permission to access the user's accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      // Use the web3 instance to interact with the blockchain
      // ...
    } else {
      console.log('Please install MetaMask or another Ethereum-compatible wallet.');
    }
  }
  
const Homepage = (props: Props) => {
  return (
    <>
    <div className='flex justify-center h-32 items-center'>
    <h1>Welcome to chat 3.0</h1>
    </div>
    <div className='flex justify-center'>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Connect Wallet
</button>

    </div>
    </>
  )
}

export default Homepage