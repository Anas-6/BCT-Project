require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://sepolia.infura.io/v3", //  Infura/Alchemy URL
      accounts: ["2fd996796563c75B2054D5B5070821F5908d0011"], //  Ethereum account private key
    },
  },
};
