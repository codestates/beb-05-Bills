var Coupon = artifacts.require("CouponContract");

module.exports = function(deployer) {
    deployer.deploy(Coupon);
};