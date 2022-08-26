const nftABI = require('./abi/nft.json')
const Web3 = require('web3');

const contracts = require('./env.json');
const nftContract = contracts.NFTCONTRACT;

let web3 = new Web3('http://127.0.0.1:7545');
var myContract = new web3.eth.Contract(nftABI, nftContract);

// mintNFT : nft 발행
async function getNFTs(address){
    // let res = [];

    // const _balance = await myContract.methods.balanceOf(address).call();
    let _nfts = [];

    // for(let i=0;i<_balance;i++){
    //     const _id = await myContract.methods.tokenOfOwnerByIndex(address,i).call();
    //     const _uri = await myContract.methods.tokenURI(_id).call();
    //     const _nft = {
    //         tokenId:_id,
    //         uri:_uri
    //     }
    //     _nfts.push(_nft);
    // }
    const totalSupply = await myContract.methods.totalSupply().call();
    let arr = [];
		  for (let i = 1; i <= totalSupply; i++) {
		      arr.push(i);
		  }
		  
		  for (let tokenId of arr) {
		      let tokenOwner = await myContract.methods
		          .ownerOf(tokenId)
		          .call();
		      if (String(tokenOwner) === address) {
		          let tokenURI = await myContract.methods
		              .tokenURI(tokenId)
		              .call();
                      let temp = {
                        tokenId:tokenId, 
                        tokenURI:tokenURI
                      }
                      _nfts.push(temp)
		      }
		  }
    return _nfts
}

//함수 사용
async function main(){
    const accounts = await web3.eth.getAccounts();
    const address = accounts[1];

    const res = await getNFTs(address);
    console.log(res)
};

main();