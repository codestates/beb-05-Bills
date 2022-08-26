const dotenv = require("dotenv");
const Web3 = require("web3");
dotenv.config();

const RPC_URL = process.env.RPC_PROVIDER;

const web3 = new Web3(RPC_URL);

module.exports = { web3 };
