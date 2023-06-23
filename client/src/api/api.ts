import React from "react"
import { useState, useEffect } from "react"
import { contractAddress, chatContractABI } from "../components/constants/Constants"
import Web3Modal from "web3modal"
const Web3 = require("web3")


//function for checking for the wal
export const  checkIfWalletConnected = async () =>{
    if (typeof window.ethereum !== undefined) {
      // Request permission to access the user's accounts
     const accounts =  await (window.ethereum as any).request({ method: "eth_requestAccounts" })
     console.log(accounts[0])
     return accounts[0]
  
    } else {
      console.log(
        "Please install MetaMask or another Ethereum-compatible wallet."
      );
    }
  }

  //function for connecting the wallet 
 export const connectWallet = async () => {
  if (typeof window.ethereum !== undefined) {
    try{
      const accounts = await Web3.eth.getAccounts().then(console.log)
      console.log(accounts[0])
      const firstAccounts = accounts[0]
      return firstAccounts;
    }catch(err){
      console.log(err)
    }
  }
 }
  //function for fetching the details of the contract
  const fetchContract = (signerOrProvider: any) =>{
    try{
       new Web3.eth.Contract(contractAddress, chatContractABI, signerOrProvider);
    }catch(err){
        console.error(err)
    }
  }
  
  //function for connecting the contract
  export const connectingContract = () => {
    try{
      const web3modal = new Web3Modal();
      const connection = web3modal.connect();
      const web3 = new Web3(new Web3.providers.HttpProvider(connection))
     const signer = web3.getSigner()
     //using the above function 
     const contract = fetchContract(signer)
     return contract
      
    }catch(err){
      console.error(err)
    }
  }


  //function for the converting the timestamp
export const timeFunction = async (time:any) => {
  const newTime = new Date(time.toNumber());

  const realTime = newTime.getHours() + "/" + newTime.getMinutes() + "/" + newTime.getSeconds() + " Date:" + newTime.getDate() + "/" + (newTime.getMonth() + 1) + "/" + newTime.getFullYear();

  return realTime;
} 