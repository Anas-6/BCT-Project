// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstate {
    mapping(address => uint) public payments;
    mapping(uint => string) public propertyDocuments;
    
    event DocumentUploaded(uint propertyId, string ipfsHash);
    event PaymentDeposited(address buyer, uint amount);

    function storeDocumentHash(uint propertyId, string memory ipfsHash) public {
        propertyDocuments[propertyId] = ipfsHash;
        emit DocumentUploaded(propertyId, ipfsHash);
    }

    function depositPayment(uint propertyId) public payable {
        require(msg.value > 0, "Payment must be greater than 0");
        payments[msg.sender] += msg.value;
        emit PaymentDeposited(msg.sender, msg.value);
    }

    function getPayment() public view returns (uint) {
        return payments[msg.sender];
    }
}
