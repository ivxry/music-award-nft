const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MusicAwardNFT", function () {
  let contract;
  let owner;
  let addr1;
  let addr2;

  const artist = "Adele";
  const songTitle = "Hello";
  const certificationDate = "2021-01-01";
  const recordLabel = "XL Recordings";
  const album = "25";
  const awardType = "Gold";

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const MusicAwardNFT = await ethers.getContractFactory("MusicAwardNFT");
    contract = await MusicAwardNFT.deploy();
    await contract.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await contract.name()).to.equal("Music Award NFT");
      expect(await contract.symbol()).to.equal("MA");
    });
  });

  describe("addApprovedMinter", function () {
    it("Should allow the owner to add an approved minter", async function () {
      await contract.addApprovedMinter(addr1.address);
      expect(await contract.isApprovedMinter(addr1.address)).to.equal(true);
    });

    it("Should not allow a non-owner to add an approved minter", async function () {
      await expect(contract.connect(addr1).addApprovedMinter(addr2.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("removeApprovedMinter", function () {
    it("Should allow the owner to remove an approved minter", async function () {
      await contract.addApprovedMinter(addr1.address);
      await contract.removeApprovedMinter(addr1.address);
      expect(await contract.isApprovedMinter(addr1.address)).to.equal(false);
    });

    it("Should not allow a non-owner to remove an approved minter", async function () {
      await expect(contract.connect(addr1).removeApprovedMinter(owner.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("mintAward", function () {
    it("Should allow an approved minter to mint an award", async function () {
      await contract.addApprovedMinter(addr1.address);
      await contract.connect(addr1).mintAward(artist, songTitle, certificationDate, recordLabel, album, awardType);

      expect(await contract.ownerOf(1)).to.equal(owner.address);

      const awardInfo = await contract.awardInfo(1);
      expect(awardInfo.artist).to.equal(artist);
      expect(awardInfo.songTitle).to.equal(songTitle);
      expect(awardInfo.certificationDate).to.equal(certificationDate);
      expect(awardInfo.recordLabel).to.equal(recordLabel);
      expect(awardInfo.album).to.equal(album);
      expect(awardInfo.awardType).to.equal(awardType);
    });

    it("Should not allow an unapproved minter to mint an award", async function () {
      await expect(contract.connect(addr1).mintAward(artist, songTitle, certificationDate, recordLabel, album, awardType)).to.be.revertedWith("Only approved minters can mint awards");
    });

    it("Should not allow minting an award with an invalid award type", async function () {
      await contract.addApprovedMinter(addr1.address);
      const invalidAwardType = "InvalidType";
      await expect(contract.connect(addr1).mintAward(artist, songTitle, certificationDate, recordLabel, album, invalidAwardType)).to.be.revertedWith("Invalid award type");
    })
  })
}) 