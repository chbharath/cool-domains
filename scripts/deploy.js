const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("ninja");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
      let txn = await domainContract.register("bharath",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain bharath.ninja");
  
    txn = await domainContract.setRecord("bharath", "Am I a bharath or a ninja??");
    await txn.wait();
    console.log("Set record for bharath.ninja");
  
    const address = await domainContract.getAddress("bharath");
    console.log("Owner of domain bharath:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();