import { ethers } from "ethers";
const addresses = require("./adresses");

async function getAlreadyAwarded(playerAddress) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const AwardContract = new ethers.Contract(
      addresses.awardAddress,
      [
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ],
      provider
    );
    const filter = AwardContract.filters.Transfer(
      addresses.awardAddress,
      playerAddress,
      null
    );
    const awards = await AwardContract.queryFilter(filter);
    console.log(awards);
    return (awards.length > 1) ? true : false;
  }
}

async function getLevelsCompleted(playerAddress) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const EthernautContract = new ethers.Contract(
      addresses.EthernautAddress,
      [
        "event LevelCompletedLog(address indexed player, address indexed level)",
      ],
      provider
    );
    const filter = EthernautContract.filters.LevelCompletedLog(
      playerAddress,
      null
    );
    let levels = await EthernautContract.queryFilter(filter);
    return levels.length;
  }
}

async function mintAward(playerAddress) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      addresses.awardAddress,
      ["function safeMint(address to) public onlyOwner"],
      signer
    );
    contract.safeMint(playerAddress);
  }
}

export { getAlreadyAwarded, getLevelsCompleted, mintAward };
