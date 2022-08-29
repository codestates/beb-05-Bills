const tokenABI = require('./abi/token.json')
const Web3 = require('web3');
const contracts = require('./env.json');
const tokenContract = contracts.TOKENCONTRACT;
let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(tokenABI, tokenContract);

// mintToken : address에게 amount만큼의 토큰 발행하는 함수
async function mintToken(amount, serverAddr, address){
const before = await myContract.methods.balanceOf(address).call();

console.log(`before send, ${before}`);

console.log(`${serverAddr} send ${amount} to ${address}`);

await myContract.methods.transfer(address,amount).send({from: serverAddr});
const after = await myContract.methods.balanceOf(address).call();
console.log(`after send, ${after}`);
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const serverAddr = accounts[0];
    const address = "0x279A23E99aCA8E6Fce459f3e0e3F36f7D2dE52cB"//accounts[1];
    const amount = 1000;

    mintToken(amount,serverAddr,address)
};

main();