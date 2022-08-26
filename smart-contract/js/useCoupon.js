const CouponABI = require('./abi/couponMarket.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const couponContract = contracts.COUPONCONTRACT;
const tokenContract = contracts.TOKENCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(CouponABI, couponContract);

// useCoupon : address가 할인율이 discount인 쿠폰 amount장을 사용함.
async function useCoupon(address,discount,amount,serverAddr){
    await myContract.methods.safeTransferFrom(address,serverAddr, discount,amount,"0x00").send({from:address});
    return true;
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const serverAddr = accounts[0]
    const user1 = accounts[1];
    const discount = 1;
    const amount = 1;

    const res = await useCoupon(user1, discount, amount, serverAddr);
    console.log(res)
};

main();