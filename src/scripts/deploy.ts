import { ethers } from "hardhat";

async function main() {
  // Deploy your custom token first (if you haven't already)
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);

  const TOKEN_ADDRESS = myToken.address;
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy(
    process.env.VRF_COORDINATOR_ADDRESS,
    process.env.LINK_TOKEN_ADDRESS,
    TOKEN_ADDRESS,
    process.env.KEY_HASH
  );

  await coinFlip.deployed();

  console.log("CoinFlip deployed to:", coinFlip.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});