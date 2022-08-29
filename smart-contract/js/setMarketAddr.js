const tokenABI = require('./abi/token.json')
const Web3 = require('web3');
const tokenContract = "0xA524DFCD5950b96724bC7BE0392fB23B4738e021"
let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(tokenABI, tokenContract);

// myContract.methods.setMarketAddr("0xF95985c40C500b8ee3e76cb99577F1bDEC70b863").send({from: serverAddr});
// myContract.methods.marketAddr().call().then((el)=>{console.log(el)});
async function main(){
const accounts = await web3.eth.getAccounts();

console.log(accounts[0], accounts[1])

await myContract.methods.transfer(accounts[1],1000).send({from: accounts[0]});
const balanceOf = await myContract.methods.balanceOf(accounts[1]).call();
console.log(balanceOf);
}

main();