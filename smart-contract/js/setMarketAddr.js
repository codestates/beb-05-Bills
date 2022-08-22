const tokenABI = require('./abi/token.json')
const Web3 = require('web3');
const tokenContract = "0xA9A2A63bECCE010158fA59633B8427f51832B209"
const serverAddr = "0x1ACa50DF5C7284a411E14c0609EA42E85f97B327"
let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(tokenABI, tokenContract);

// myContract.methods.setMarketAddr("0xF95985c40C500b8ee3e76cb99577F1bDEC70b863").send({from: serverAddr});

myContract.methods.marketAddr().call().then((el)=>{console.log(el)});