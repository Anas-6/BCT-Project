import React, { useState } from "react";
import Web3 from "web3";
import { uploadToIPFS, storeHashOnBlockchain } from "./ipfsUpload";

const PropertyListing = () => {
  const [propertyId, setPropertyId] = useState("");
  const [price, setPrice] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  const web3 = new Web3(Web3.givenProvider);
  const contractAddress = "0xYourContractAddress"; // Replace with your contract's address
  const contractABI = [
    /* Your contract ABI */
  ];

  const depositPayment = async () => {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();

    try {
      await contract.methods.depositPayment(1).send({
        from: accounts[0],
        value: web3.utils.toWei(price, "ether"),
      });
      setTransactionStatus("Payment deposited successfully!");
    } catch (error) {
      console.error("Error depositing payment:", error);
      setTransactionStatus("Error occurred while depositing payment.");
    }
  };

  const handleIPFSUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const ipfsHash = await uploadToIPFS(file);
      if (ipfsHash) {
        setTransactionStatus(`File uploaded successfully: ${ipfsHash}`);
        await storeHashOnBlockchain(ipfsHash, contractAddress, contractABI);
      }
    }
  };

  return (
    <div>
      <h2>Property Listing</h2>
      <label>Property ID:</label>
      <input
        type="text"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />

      <label>Price (ETH):</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Buyer Address:</label>
      <input
        type="text"
        value={buyerAddress}
        onChange={(e) => setBuyerAddress(e.target.value)}
      />

      <label>Upload Property Document:</label>
      <input type="file" onChange={handleIPFSUpload} />

      <button onClick={depositPayment}>Deposit Payment</button>

      {transactionStatus && (
        <div>
          <p>{transactionStatus}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
