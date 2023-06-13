const {ethers}  = require("hardhat")

async function main() {
  const deployedContract = await ethers.deployContract("chat");

  await deployedContract.waitForDeployment();

  console.log("SimpleStorage Contract Address:", await deployedContract.getAddress());
}

main().catch((error)=>{
  console.error(error);
  process.exitCode = 1;
})