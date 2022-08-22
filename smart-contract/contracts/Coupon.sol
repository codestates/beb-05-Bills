// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Coupon is ERC1155 {
    constructor() public ERC1155("uri") {}

    function CouponMintAndList(
        uint256 discount,
        uint256 amount,
        address marketAddr
    ) public {
        _mint(msg.sender, discount, amount, "");
        safeTransferFrom(msg.sender, marketAddr, discount, amount, "0x00");
    }
}
