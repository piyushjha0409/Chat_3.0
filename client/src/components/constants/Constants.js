import chat from "../constants/Chat.json";
require('dotenv').config()

//address of the contract
export const contractAddress =  process.env.CONTRACT_ADDRESS

//exporting the abi 
export const chatContractABI = chat.abi;