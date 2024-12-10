async function main() {
  const RealEstateContract = await ethers.getContractFactory(
    "YourContractName"
  ); // Replace with your contract name
  const deployedContract = await RealEstateContract.deploy();
  await deployedContract.deployed();

  console.log("Contract deployed to:", deployedContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
