const { ethers } = require("hardhat");

async function main() {
    // Get signers (accounts)
    const [owner, addr1, addr2] = await ethers.getSigners();

    // Corrected contract address
    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; 

    // Get contract instance
    const etherWallet = await ethers.getContractAt("EtherWallet", contractAddress);

    // Deposit 1 ETH from addr1
    console.log("Addr1 depositing 1 ETH...");
    const depositTx = await addr1.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther("1.0")
    });
    await depositTx.wait();
    console.log("Deposit successful!");

    // Check balance after deposit
    let balanceAddr1 = await etherWallet.balances(addr1.address);
    console.log(`Addr1 Balance After Deposit: ${ethers.utils.formatEther(balanceAddr1)} ETH`);

    // Withdraw 0.5 ETH from addr1
    console.log("Addr1 withdrawing 0.5 ETH...");
    const withdrawTx = await etherWallet.connect(addr1).withdraw(ethers.utils.parseEther("0.5"));
    await withdrawTx.wait();
    console.log("Withdraw successful!");

    // Check new balance after withdrawal
    balanceAddr1 = await etherWallet.balances(addr1.address);
    console.log(`Addr1 Balance After Withdrawal: ${ethers.utils.formatEther(balanceAddr1)} ETH`);

    // Owner withdraws all funds
    console.log("Owner withdrawing all funds...");
    const withdrawAllTx = await etherWallet.connect(owner).withdrawAll();
    await withdrawAllTx.wait();
    console.log("Owner withdrawal successful!");

    // Check contract balance after owner withdrawal
    const contractBalance = await etherWallet.getContractBalance();
    console.log(`Contract Balance After Owner Withdrawal: ${ethers.utils.formatEther(contractBalance)} ETH`);
}

// Error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
