// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract MusicAwardNFT is ERC721URIStorage, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping (address => bool) private _approvedMinters;

    struct Award {
        string artist;
        string songTitle;
        string certificationDate;
        string recordLabel;
        string album;
        string awardType;
    }

    mapping (uint256 => Award) public awardInfo;

    event AwardMinted(address indexed minter, uint256 indexed tokenId, string indexed awardType);

    modifier onlyApprovedMinter() {
        require(isApprovedMinter(msg.sender), "Only approved minters can mint awards");
        _;
    }
    constructor() ERC721("Music Award NFT", "MA") {}

    function addApprovedMinter(address minter) public onlyOwner {
        _approvedMinters[minter] = true;
    }

    function removeApprovedMinter(address minter) public onlyOwner {
        _approvedMinters[minter] = false;
    }

    function isApprovedMinter(address minter) public view returns (bool) {
        return _approvedMinters[minter];
    }

    function mintAward(
        string memory artist,
        string memory songTitle,
        string memory certificationDate,
        string memory recordLabel,
        string memory album,
        string memory awardType
    ) public onlyApprovedMinter {
        require(isApprovedMinter(msg.sender), "Only approved minters can mint awards");
        require(keccak256(bytes(awardType)) == keccak256(bytes("Gold")) ||
                keccak256(bytes(awardType)) == keccak256(bytes("Platinum")) ||
                keccak256(bytes(awardType)) == keccak256(bytes("Diamond")),
                "Invalid award type");

        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        string memory awardImage;
        if (keccak256(bytes(awardType)) == keccak256(bytes("Gold"))) {
            awardImage = "ipfs://QmRtmZSxUoUtETXBXz9DdEnL9w4mfgMYK963VoRV1cUyZ4/1.png";
        } else if (keccak256(bytes(awardType)) == keccak256(bytes("Platinum"))) {
            awardImage = "ipfs://QmRtmZSxUoUtETXBXz9DdEnL9w4mfgMYK963VoRV1cUyZ4/2.png";
        } else {
            awardImage = "ipfs://QmRtmZSxUoUtETXBXz9DdEnL9w4mfgMYK963VoRV1cUyZ4/3.png";
        }

        string memory metadata = string(abi.encodePacked(
            "data:application/json,{",
            "\"name\":\"", songTitle, " by ", artist, "\",",
            "\"description\":\"Music Award NFT for ", songTitle, "\",",
            "\"image\":\"", awardImage, "\",",
            "\"attributes\":[",
                "{\"trait_type\":\"artist\",\"value\":\"", artist, "\"},",
                "{\"trait_type\":\"songTitle\",\"value\":\"", songTitle, "\"},",
                "{\"trait_type\":\"certificationDate\",\"value\":\"", certificationDate, "\"},",
                "{\"trait_type\":\"recordLabel\",\"value\":\"", recordLabel, "\"},",
                "{\"trait_type\":\"album\",\"value\":\"", album, "\"},",
                "{\"trait_type\":\"awardType\",\"value\":\"", awardType, "\"}",
            "]}"
        ));


        _mint(owner(), newTokenId);
        _setTokenURI(newTokenId, metadata);

        awardInfo[newTokenId] = Award(artist, songTitle, certificationDate, recordLabel, album, awardType);

        emit AwardMinted(msg.sender, newTokenId, awardType);
    }

    function transferAward(uint256 tokenId, address recipient) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        require(recipient != address(0), "Invalid recipient address");

        _transfer(owner(), recipient, tokenId);
    }
}