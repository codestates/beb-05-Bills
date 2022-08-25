const CouponABI = require('./abi/couponMarket.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const couponContract = contracts.COUPONCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(CouponABI, couponContract);

// getCouponBalance : 해당 유저가 가지고 있는 특정 할인율의 쿠폰 수 확인
async function getCouponBalance(address,discount){
    const stock = await myContract.methods.balanceOf(address,discount).call();

    return stock;
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const user1 = accounts[1];
    const discount = 1;

    const stock = await getCouponBalance(user1,discount);
    console.log(stock)
};

main();