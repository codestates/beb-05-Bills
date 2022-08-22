const Web3 = require('web3');
let web3 = new Web3('http://127.0.0.1:7545'); 

var EAToken = artifacts.require("EAToken");
var EatNFTs = artifacts.require("EatNFTs");
var Coupon = artifacts.require("CouponContract");
var CouponMarket = artifacts.require("CouponMarket");

module.exports = async function(deployer) {
    // 컨트랙트 배포
    await deployer.deploy(EAToken);
    await deployer.deploy(EatNFTs);
    await deployer.deploy(Coupon);
    await deployer.deploy(CouponMarket);

    // 초기 설정에 필요한 컨트랙트 정보 가져오기
    const tokenContractInfo = await EAToken.deployed().then((el)=>{
        return {abi : el.abi,
            address: el.address}
    });
    const couponMarketInfo = await CouponMarket.deployed().then((el)=>{
        return {abi : el.abi,
            address: el.address}
    });

    //서버 계정 주소 저장
    const accounts = await web3.eth.getAccounts();
    const serverAddress = accounts[0]

    //market에서 거래가 가능하도록 token 컨트랙트에서 마켓 주소 지정
    var tokenContract = new web3.eth.Contract(tokenContractInfo.abi, tokenContractInfo.address);
    await tokenContract.methods.setMarketAddr(couponMarketInfo.address).send({from:serverAddress});
    await tokenContract.methods.marketAddr().call().then((el)=>{console.log(`marketContractAddr = ${el}`)});
};