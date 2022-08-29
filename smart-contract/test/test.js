var coupon = artifacts.require("CouponContract");
var market = artifacts.require("CouponMarket");

contract("Toekn", function () {
    it ("is_greet_works_well", async function () {
        const instance = await coupon.deployed();
        await instance.CouponMintAndList(1,1,'0xA93604131DC05b4476eBc508AB2c8F346DF5843b');

        const mar = await market.deployed();
        const response = await mar.amount(1);

        assert.equal(response, 1, "mintAndList is wrong");
    })
})