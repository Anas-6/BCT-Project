import React, { useState } from "react";
import "./App.css";
import PropertyListing from "./PropertyListing"; // Import the PropertyListing component

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        alert("Wallet connected successfully!");
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet!");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blockchain Real Estate</h1>

        {!isConnected ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <PropertyListing /> // Render the PropertyListing component once the wallet is connected
        )}
      </header>
    </div>
  );
};

export default App;
