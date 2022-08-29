const CouponABI = require('./abi/couponMarket.json')
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction

const contracts = require('./env.json');
const couponContract = contracts.COUPONCONTRACT;
const tokenContract = contracts.TOKENCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(CouponABI, couponContract);


async function buyCoupon (address,privateKey,discount,amount,price){
    const privateKey1Buffer = Buffer.from(privateKey, 'hex')
    console.log(privateKey1Buffer)
    nonce = await web3.eth.getTransactionCount(address)
    const tx = {
    nonce : nonce,
    // this could be provider.addresses[0] if it exists
    from: address, 
    // target address, this could be a smart contract address
    to: couponContract, 
    // optional if you want to specify the gas limit 
    gas: "0x218520",
    // optional if you are invoking say a payable function 
    value: "0x0",
    // this encodes the ABI of the method and the arguements
    data: myContract.methods.buyCoupon(1,1,10,tokenContract).encodeABI()
    };

    var tx_ = new Tx(tx);
    tx_.sign(privateKey1Buffer);
    var serializedTx = tx_.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);
}


function main(){
    const privateKey = "3e3eda199ec4eaf3c186186ea1bc06df16ff9bace7490c30e08796b60a61a364";
    const address = "0x279A23E99aCA8E6Fce459f3e0e3F36f7D2dE52cB";
    const discount = 1;
    const amount = 1;
    const price = 1;

    buyCoupon(address,privateKey,discount,amount,price)
}

main()