const hre=require("hardhat");
async function main(){
    //Replace with your deployed contract's address
    const deployedAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3"

    //Get the contract factory and attach it tpo the deployed address
    const simpleStorage = await hre.ethers.getContractAt("SimpleStorage",deployedAddress);

    console.log("Interacting with deployed SimpleStorage contract at",deployedAddress);
    const setTx=await simpleStorage.set(42);
    await setTx.wait();//Wait for the transaction to be mined
    console.log("Stored number set to 42.");
    //Retrieve the stored number
    const storedNumber=await simpleStorage.get();
    console.log("Retrieved stored number.",storedNumber.toString()); 
}
main()
   .catch((error)=>{
    console.error(error);
   })