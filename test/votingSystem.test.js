const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("VotingSystem", function () {
    let VotingSystem, votingSystem, owner, voter1, voter2;

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();
        const candidateNames = ["Uday", "Sunidhi", "Soham", "Sneha", "Rohit"];
        VotingSystem = await ethers.getContractFactory("votingSystem");
        votingSystem = await VotingSystem.deploy(candidateNames);
        await votingSystem.deployed();
    });

    it("Should log the debug information when a vote is cast", async function () {
        await votingSystem.connect(voter1).vote(0); // Voting for candidate at index 0
        const candidate = await votingSystem.candidates(0);
        expect(candidate.voteCount.toNumber()).to.equal(1);
    });

    it("Should correctly count votes", async function () {
        await votingSystem.connect(voter1).vote(0); // Voting for candidate at index 0
        await votingSystem.connect(voter2).vote(0);
        const candidate = await votingSystem.candidates(0);
        expect(candidate.voteCount.toNumber()).to.equal(2);
    });

    it("Should prevent double voting", async function () {
        await votingSystem.connect(voter1).vote(0);
        await expect(votingSystem.connect(voter1).vote(0)).to.be.revertedWith("Already voted");
    });

    it("Should reject invalid candidate index", async function () {
        await expect(votingSystem.connect(voter1).vote(10)).to.be.revertedWith("Invalid candidate index");
    });
});
