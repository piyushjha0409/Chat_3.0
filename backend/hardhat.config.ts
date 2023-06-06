import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const RPC_URL = process.env.RPC_URL as string
const PRIVATE_KEY: string = process.env.PRIVATE_KEY as string

interface networks{
 name: string,
 url: string,
 private_key: string

}
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
     sepolia:{
         url: RPC_URL,
         accounts: [PRIVATE_KEY]
     }
  }
};

export default config;
