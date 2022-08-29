const tokenABI = require('./abi/token.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const tokenContract = contracts.TOKENCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(tokenABI, tokenContract);

// getTokenBalance : address의 토큰 양 조회
async function getTokenBalance(address){
    const balance = await myContract.methods.balanceOf(address).call();
    return balance;
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const user1 = "0x279A23E99aCA8E6Fce459f3e0e3F36f7D2dE52cB"//accounts[1];

    const res = await getTokenBalance(user1);
    console.log(res)
};

main();