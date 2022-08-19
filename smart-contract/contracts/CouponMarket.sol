// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface others {
    function balanceOf(address account, uint256 id)
        external
        view
        returns (uint256);

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function transferFrom(
        address spender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    // function approve(address spender, uint256 amount) external returns (bool);
}

contract CouponMarket {
    mapping(uint256 => address) private _seller;
    mapping(uint256 => uint256) private _amount;

    event Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes data,
        uint256 gas
    );

    function seller(uint256 discount) public view returns (address) {
        return _seller[discount];
    }

    function amount(uint256 discount) public view returns (uint256) {
        return _amount[discount];
    }

    function buyCoupon(
        uint256 discount,
        uint256 amount,
        uint256 price,
        address CouponContractAddr,
        address TokenContractAddr
    ) public payable returns (bool) {
        // address payable receiver = payable(_seller[discount]);
        // uint256 price = 70;
        // receiver.transfer(price);
        // others(TokenContractAddr).approve(address(this), price);

        others(TokenContractAddr).transferFrom(
            msg.sender,
            _seller[discount],
            price
        );

        others(CouponContractAddr).safeTransferFrom(
            address(this),
            msg.sender,
            discount,
            amount,
            "0x00"
        );
        _reduceAmount(discount, amount);
        return true;
    }

    function _reduceAmount(uint256 discount, uint256 amount) private {
        _amount[discount] = _amount[discount] - amount;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) public returns (bytes4) {
        _seller[id] = from;
        _amount[id] = _amount[id] + value;
        emit Received(operator, from, id, value, data, gasleft());
        return
            bytes4(
                keccak256(
                    ("onERC1155Received(address,address,uint256,uint256,bytes)")
                )
            );
    }
}
