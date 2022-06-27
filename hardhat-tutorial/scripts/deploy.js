const { ethers } = require('hardhat');
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require('../constant');

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    'FakeNFTMarketplace'
  );
  const fakeNFTMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNFTMarketplace.deployed();

  console.log('FakeNFTMarketplace deployed to: ', fakeNFTMarketplace.address);

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory('CryptoDevsDao');
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNFTMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther('1'),
    }
  );
  await cryptoDevsDAO.deployed();

  console.log('CryptoDevsDAO deployed to:', cryptoDevsDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
