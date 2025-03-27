const hre=require("hardhat");

async function main(){
    const candidates=["Uday","Soham","Sunidhi","Sumit","Shubodh"];
    const VotingSysgtem=await hre.ethers.getContractFactory("votingSystem");
    
    
    const votingSystem=await VotingSysgtem.deploy(candidates);

    
    await votingSystem.deployed();

    console.log("voting system deployed to:",votingSystem.address);
}
main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
});