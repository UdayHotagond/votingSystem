// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";
contract simple {
    uint256 private storedValue;

    event ValueChanged(uint256 newValue);

    function setValue(uint256 _value) public {
        console.log("Setting value to:", _value); 
        storedValue = _value;
        emit ValueChanged(_value);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
}