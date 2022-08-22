var EAToken = artifacts.require("EAToken");

module.exports = function(deployer) {
    deployer.deploy(EAToken);
};