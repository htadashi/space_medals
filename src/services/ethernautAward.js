import { ethers } from "ethers";
const addresses = require("./adresses");

async function getAlreadyAwarded(playerAddress, provider) {
  if (typeof window.ethereum !== "undefined") {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const playerAddress = account[0];
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

async function getLevelsCompleted() {
  if (typeof window.ethereum !== "undefined") {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const playerAddress = account[0];
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

async function mintAward() {
  if (typeof window.ethereum !== "undefined") {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      addresses.awardAddress,
      ["function safeMint(address to) public onlyOwner"],
      signer
    );
    contract.safeMint(account[0]);
  }
}

export { getAlreadyAwarded, getLevelsCompleted, mintAward };
