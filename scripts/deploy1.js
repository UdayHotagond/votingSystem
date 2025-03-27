//Import Hardhar runtime environment
const hre=require("hardhat");

async function main(){
    //1.Get the ContractFactory for the contract
    const EtherWallet=await hre.ethers.getContractFactory("EtherWallet");
    
    //2.Deploy the contract(you can pass constructor arguments here if needed)
    const etherWallet=await EtherWallet.deploy();

    //3.Wait for the deployment to be mined
    await etherWallet.deployed();

    console.log("EtherWallet deployed to:",etherWallet.address);
}
//Execute the main function
main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
});