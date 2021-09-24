require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("my-deploy", "Deploys contract, get wallets, and outputs files", async (taskArgs, hre) => {
  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  // Await deployment
  await greeter.deployed();

  // Get address
  const contractAddress = greeter.address;

  // Write file
  fs.writeFileSync('./.contract', contractAddress);

  // Get generated signer wallets
  const accounts = await hre.ethers.getSigners();

  // Get the first wallet address
  const walletAddress = accounts[0].address;

  // Write file
  fs.writeFileSync('./.wallet', walletAddress);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  hardhat: {
    chainId: 1337
  },
};
