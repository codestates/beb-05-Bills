const CouponABI = require('./abi/couponMarket.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const couponContract = contracts.COUPONCONTRACT;
const tokenContract = contracts.TOKENCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(CouponABI, couponContract);

// buyCoupon : address가 할인율이 discount인 쿠폰 amount장을 총 price개의 토큰을 지불하고 구매함
async function buyCoupon(address,discount,amount,price){
    await myContract.methods.buyCoupon(discount,amount,price,tokenContract).send({from: address});
    return true;
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const user1 = accounts[1];
    const discount = 1;
    const amount = 1;
    const price = 100;

    const res = await buyCoupon(user1, discount, amount, price);
    console.log(res)
};

main();