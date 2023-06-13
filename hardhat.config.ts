import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config()

interface Props {
  url: string,
  accounts ? : string
}
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url: process.env.NETWORK_RPC_URL || "",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""]
    }
  },
};

export default config;
