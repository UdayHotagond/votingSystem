// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract votingSystem {
    struct candidate {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(address => bool) public hasvoted;
    candidate[] public candidates;

    constructor(string[] memory candidates_name) {
        admin = msg.sender;
        for (uint i = 0; i < candidates_name.length; i++) {
            candidates.push(candidate({name: candidates_name[i], voteCount: 0}));
        }
    }

    function vote(uint candidate_index) public {
        require(!hasvoted[msg.sender], "Already voted");
        require(candidate_index < candidates.length, "Invalid candidate index");

        candidates[candidate_index].voteCount++;
        hasvoted[msg.sender] = true;

        console.log("Voter:", msg.sender);
        console.log("Voted for candidate index:", candidate_index);
        console.log("Candidate Name:", candidates[candidate_index].name);
        console.log("Total Votes for Candidate:", candidates[candidate_index].voteCount);
    }

    function getWinner() public view returns (string memory) {
        uint winnner_index = 0;
        for (uint i = 1; i < candidates.length; i++) {
            if (candidates[winnner_index].voteCount < candidates[i].voteCount) {
                winnner_index = i;
            }
        }
        
        console.log("Winner:", candidates[winnner_index].name);
        console.log("Votes:", candidates[winnner_index].voteCount);

        return candidates[winnner_index].name;
    }
}
