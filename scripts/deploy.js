//Import Hardhar runtime environment
const hre=require("hardhat");

async function main(){
    //1.Get the ContractFactory for the contract
    const SimpleStorage=await hre.ethers.getContractFactory("SimpleStorage");
    
    //2.Deploy the contract(you can pass constructor arguments here if needed)
    const simpleStorage=await SimpleStorage.deploy();

    //3.Wait for the deployment to be mined
    await simpleStorage.deployed();

    console.log("SimpleStorage deployed to:",simpleStorage.address);
}
//Execute the main function
main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
});