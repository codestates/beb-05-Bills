const nftABI = require('./abi/nft.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const nftContract = contracts.NFTCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(nftABI, nftContract);

// sendNFT : from에 있는 nft를 to에 전송
async function sendNFT(from,to,tokenId){
    await myContract.methods.safeTransferFrom(from,to,tokenId).send({from: from});
    
    return true
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    const to = accounts[1]
    const tokenId = 1;

    const res = await sendNFT(from,to,tokenId);
    console.log(res)
};

main();