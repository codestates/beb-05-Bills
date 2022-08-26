const nftABI = require('./abi/nft.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const nftContract = contracts.NFTCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(nftABI, nftContract);

// mintNFT : nft 발행
async function mintNFT(serverAddr, uri){
    await myContract.methods.mintNFT(uri).send({from: serverAddr});
    
    return true
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const serverAddr = accounts[0];
    const uri ="testuri"

    const res = await mintNFT(serverAddr,uri);
    console.log(res)
};

main();