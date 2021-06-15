import { ethers } from "ethers";
const addresses = require("./adresses");
//const config = require("./config");
require('dotenv').config();

async function getAlreadyAwarded(playerAddress, badgeID) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const AwardContract = new ethers.Contract(
      addresses.awardContractAddress,
      [
        "function balanceOf(address account, uint256 id) public view returns (uint256)",
      ],
      provider
    );    
    const awards = await AwardContract.balanceOf(playerAddress, badgeID);
    console.log("getAlreadyAwarded")
    return (awards.toNumber() > 0) ? true : false;
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

async function mintAward(playerAddress, badgeID) {      
    // Connect to Infura provider and to SpaceMedals wallet
    const provider = new ethers.providers.InfuraProvider("rinkeby", {
      projectId: process.env.INFURA_ID,
      projectSecret: process.env.INFURA_SECRET,
    });
    
    let wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY
    );
    wallet = await wallet.connect(provider); 

    const contract = new ethers.Contract(
      addresses.awardContractAddress,
      ["function mint(address account, uint256 id, uint256 amount, bytes memory data)"],
      wallet
    );
    contract.mint(playerAddress, badgeID, 1, 0x0000);
  
}

export { getAlreadyAwarded, getLevelsCompleted, mintAward };
