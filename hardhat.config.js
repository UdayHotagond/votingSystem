/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");




task("accounts-with-balance", "Prints the list of accounts with their ETH balance")
  .setAction(async () => {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
      const balance = await account.getBalance();
      console.log(account.address,`:`, ethers.utils.formatEther(balance),`ETH`);
    }
  });
  task("deploy-contract", "Deploys the simpleStorage contract")
  .addParam("name", "The name to initialize the contract with")
  .setAction (async (taskArgs) => {
    const SimpleStorage = await ethers.getContractFactory(taskArgs.name);
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
    console.log(`Contract deployed at:${simpleStorage.address}`);
  });
  task("interact-contract", "Intreracts the simpleStorage contract")
  .addParam("name", "The name to initialize the contract with")
  .setAction (async (taskArgs) => {
    const deployedAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3"

    //Get the contract factory and attach it tpo the deployed address
    const simpleStorage = await hre.ethers.getContractAt("SimpleStorage",deployedAddress);

    console.log("Interacting with deployed SimpleStorage contract at",deployedAddress);
    const setTx=await simpleStorage.set(42);
    await setTx.wait();//Wait for the transaction to be mined
    console.log("Stored number set to 42.");
    //Retrieve the stored number
    const storedNumber=await simpleStorage.get();
    console.log("Retrieved stored number.",storedNumber); 
  });
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {

      url: "https://sepolia.infura.io/v3/f26d0e6bd8ea4db58c5c46783d8fe031",
      accounts: ["da81212f08756a3b1e94e0be19dc51cef2ce3134afc4f77287e6ed89a7fe05ab"]
    }
  },
};
