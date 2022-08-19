// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract CouponContract is ERC1155 {
    constructor() public ERC1155("uri") {}

    function CouponMint(uint256 discount, uint256 amount) public {
        _mint(msg.sender, discount, amount, "");
    }
}
