const express = require("express");
const router = express.Router();
const { Coupon } = require("../models/coupon");
const { Wallet } = require("../models");
const { couponContract, tokenContract } = require("../utils/contractHandler");
const { tokenAddress } = require("../constants/");

const CHAIN_ID = process.env.CHAIN_ID;

router.get("/", async (req, res, next) => {
  try {
    const coupons = await Coupon.findAll({
      where,
      order: [["discount", "DESC"]],
    });
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:discount", async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({
      where: { discount: req.params.discount },
    });
    if (!coupon) {
      return res.status(403).send("존재하지 않는 쿠폰입니다.");
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/buy/:discount", async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ where: { UserId: req.user.id } });
    const address = wallet.address;
    const coupon = await Coupon.findOne({
      where: { discount: req.params.discount },
    });
    if (!coupon) {
      return res.status(403).send("존재하지 않는 쿠폰입니다.");
    }
    if (coupon.amount == 0) {
      return res.status(403).send("존재하지 않는 쿠폰입니다.");
    }
    couponContract.methods
      .buyCoupon(
        coupon.discount,
        coupon.amount,
        coupon.price,
        tokenAddress[CHAIN_ID]
      )
      .send();
    coupon.amount -= 1;
    wallet.balance = await tokenContract.methods.balanceOf(address).call();
    return res.status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:userId", async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ where: { UserId: req.params.id } });
    const address = wallet.address;
    const { couponKind, amount } = await couponContract.methods
      .stocksByAccount(address)
      .call();
    const couponOwned = [];
    for (let i = 0; i < couponKind.length - 1; i++) {
      couponOwned.push({ discount: couponKind[i], amount: amount[i] });
    }
    res.status(200).json(couponOwned);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
