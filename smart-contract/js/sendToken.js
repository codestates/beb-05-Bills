const tokenABI = require('./abi/token.json')
const Web3 = require('web3');
const tokenContract = "0x81CE980C867Bf35ed23d15086997F0A5ea99565C"
let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(tokenABI, tokenContract);

// myContract.methods.setMarketAddr("0xF95985c40C500b8ee3e76cb99577F1bDEC70b863").send({from: serverAddr});
// myContract.methods.marketAddr().call().then((el)=>{console.log(el)});
async function main(){
const accounts = await web3.eth.getAccounts();
const before = await myContract.methods.balanceOf(accounts[1]).call();
const amount = 1000;

console.log(`before send, ${before}`);

console.log(`${accounts[0]} send ${amount} to ${accounts[1]}`);

await myContract.methods.transfer(accounts[1],amount).send({from: accounts[0]});
const after = await myContract.methods.balanceOf(accounts[1]).call();
console.log(`after send, ${after}`);
}

main();