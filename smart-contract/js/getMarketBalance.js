const CouponABI = require('./abi/couponMarket.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const couponContract = contracts.COUPONCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(CouponABI, couponContract);

// getMarketBalance : 상점에 있는 쿠폰 재고 확인
async function getMarketBalance(){
let res = [];
const stock = await myContract.methods.AllStocks().call();

for(let i=0;i<stock[0].length;i++){
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

    const stock = await getMarketBalance();
    console.log(stock)
};

main();