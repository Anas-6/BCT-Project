import { create } from "ipfs-http-client";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export const uploadToIPFS = async (file) => {
  try {
    const addedFile = await ipfs.add(file);
    console.log("File uploaded to IPFS:", addedFile.path);
    return addedFile.path; // Return the IPFS hash
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
  }
};

export const storeHashOnBlockchain = async (hash, contractAddress, abi) => {
  const contract = new web3.eth.Contract(abi, contractAddress);
  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods
      .storeDocumentHash(1, hash)
      .send({ from: accounts[0] });
    console.log("IPFS hash stored on blockchain");
  } catch (error) {
    console.error("Error storing hash on blockchain:", error);
  }
};
