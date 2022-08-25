const dotenv = require("dotenv");
const {
  tokenAbi,
  tokenAddress,
  nftAbi,
  nftAddress,
  couponAbi,
  couponAddress,
} = require("../constants");
dotenv.config();

const CHAIN_ID = process.env.CHAIN_ID;
const MANAGER_ADDRESS = process.env.MANAGER_ADDRESS;

module.exports = async (web3) => {
  const tokenContract = await new web3.eth.Contract(tokenAbi, tokenAddress, {
    from: MANAGER_ADDRESS,
    to: tokenAddress[CHAIN_ID],
    gasLimit: 3000000,
  });
  const nftContract = await new web3.eth.Contract(nftAbi, nftAddress, {
    from: MANAGER_ADDRESS,
    to: nftAddress[CHAIN_ID],
    gasLimit: 3000000,
  });
  const couponContract = await new web3.eth.Contract(couponAbi, couponAddress, {
    from: MANAGER_ADDRESS,
    to: couponAddress[CHAIN_ID],
    gasLimit: 3000000,
  });
  return tokenContract, nftContract, couponContract;
};
