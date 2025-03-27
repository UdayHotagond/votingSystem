// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract EtherWallet {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender; // Set deployer as owner
    }

    // Fallback function to accept Ether transfers
    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    // Deposit function
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    // Withdraw function
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // Owner withdraws all funds
    function withdrawAll() external {
        require(msg.sender == owner, "Only owner can withdraw all funds");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available for withdrawal");

        payable(owner).transfer(contractBalance);
    }

    // Get contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}