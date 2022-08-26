const CouponABI = require('./abi/couponMarket.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const couponContract = contracts.COUPONCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(CouponABI, couponContract);

// getAllCouponBalance : 해당 유저가 가지고 있는 쿠폰 총량 확인
async function getAllCouponBalance(address){
let res = [];
const stock = await myContract.methods.stocksByAccount(address).call();

for(let i=0;i<stock[0].length;i++){
    if(stock[0][i]==0){
        continue;
    }
    const temp = {
        discount : stock[0][i],
        amount : stock[1][i]
    }
    res.push(temp);
}

return res;
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const user1 = accounts[1];

    const stock = await getAllCouponBalance(user1);
    console.log(stock)
};

main();