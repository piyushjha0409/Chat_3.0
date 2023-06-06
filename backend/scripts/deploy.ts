import { ethers } from "hardhat";

async function main() {

  const chatAppContract = await ethers.getContractFactory("chatApp")

  //deploying the contract
  const deployChatAppContract = await chatAppContract.deploy()

  //finish deploying
  await deployChatAppContract.deployed();

  //print the address of the contract after the deploying the contract
  console.log(`The contract has been deployed on the address ${deployChatAppContract.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
