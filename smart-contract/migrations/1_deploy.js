const Web3 = require('web3');
let web3 = new Web3('http://127.0.0.1:7545'); 

var EAToken = artifacts.require("EAToken");
var EatNFTs = artifacts.require("EatNFTs");
var Coupon = artifacts.require("CouponContract");
var CouponMarket = artifacts.require("CouponMarket");

module.exports = async function(deployer) {
    await deployer.deploy(EAToken);

    const tokenContractInfo = await EAToken.deployed().then((el)=>{
        return {abi : el.abi,
            address: el.address}
    });

    await deployer.deploy(EatNFTs);
    await deployer.deploy(Coupon);
    await deployer.deploy(CouponMarket);

    const couponMarketInfo = await CouponMarket.deployed().then((el)=>{
        return {abi : el.abi,
            address: el.address}
    });

    const accounts = await web3.eth.getAccounts();
    const serverAddress = accounts[0]

    var tokenContract = new web3.eth.Contract(tokenContractInfo.abi, tokenContractInfo.address);
    await tokenContract.methods.setMarketAddr(couponMarketInfo.address).send({from:serverAddress});
    await tokenContract.methods.marketAddr().call().then((el)=>{console.log(`marketContractAddr = ${el}`)});
};