// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC165.sol";

/**
 * @dev _Available since v3.1._
 */
interface IERC1155Receiver is IERC165 {
    /**
     * @dev Handles the receipt of a single ERC1155 token type. This function is
     * called at the end of a `safeTransferFrom` after the balance has been updated.
     *
     * NOTE: To accept the transfer, this must return
     * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
     * (i.e. 0xf23a6e61, or its own function selector).
     *
     * @param operator The address which initiated the transfer (i.e. msg.sender)
     * @param from The address which previously owned the token
     * @param id The ID of the token being transferred
     * @param value The amount of tokens being transferred
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
     */
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4);
}

contract ERC1155 {
    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) private _balances;

    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );

    function isContract(address account) private view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    function _msgSender() private view returns (address) {
        return msg.sender;
    }

    /**
     * @dev See {IERC1155-balanceOf}.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function balanceOf(address account, uint256 id)
        public
        view
        virtual
        returns (uint256)
    {
        require(
            account != address(0),
            "ERC1155: address zero is not a valid owner"
        );
        return _balances[id][account];
    }

    /**
     * @dev See {IERC1155-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual {
        require(
            (from == _msgSender()) || (from == address(this)),
            "ERC1155: caller is not token owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev Transfers `amount` tokens of token type `id` from `from` to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `from` must have a balance of tokens of type `id` of at least `amount`.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        uint256 fromBalance = _balances[id][from];
        require(
            fromBalance >= amount,
            "ERC1155: insufficient balance for transfer"
        );
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function _mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);

        _afterTokenTransfer(operator, address(0), to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(
            operator,
            address(0),
            to,
            id,
            amount,
            data
        );
    }

    /**
     * @dev Destroys `amount` tokens of token type `id` from `from`
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `from` must have at least `amount` tokens of token type `id`.
     */
    function _burn(
        address from,
        uint256 id,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC1155: burn from the zero address");

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, address(0), ids, amounts, "");

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }

        emit TransferSingle(operator, from, address(0), id, amount);

        _afterTokenTransfer(operator, from, address(0), ids, amounts, "");
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning, as well as batched variants.
     *
     * The same hook is called on both single and batched variants. For single
     * transfers, the length of the `ids` and `amounts` arrays will be 1.
     *
     * Calling conditions (for each `id` and `amount` pair):
     *
     * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * of token type `id` will be  transferred to `to`.
     * - When `from` is zero, `amount` tokens of token type `id` will be minted
     * for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
     * will be burned.
     * - `from` and `to` are never both zero.
     * - `ids` and `amounts` have the same, non-zero length.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    /**
     * @dev Hook that is called after any token transfer. This includes minting
     * and burning, as well as batched variants.
     *
     * The same hook is called on both single and batched variants. For single
     * transfers, the length of the `id` and `amount` arrays will be 1.
     *
     * Calling conditions (for each `id` and `amount` pair):
     *
     * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * of token type `id` will be  transferred to `to`.
     * - When `from` is zero, `amount` tokens of token type `id` will be minted
     * for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
     * will be burned.
     * - `from` and `to` are never both zero.
     * - `ids` and `amounts` have the same, non-zero length.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (isContract(to)) {
            try
                IERC1155Receiver(to).onERC1155Received(
                    operator,
                    from,
                    id,
                    amount,
                    data
                )
            returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function _asSingletonArray(uint256 element)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}

interface others {
    function transferWithMarket(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract CouponMarket is ERC1155 {
    constructor() {
        _serverAddr = msg.sender;
        CouponMint(1, 100);
        CouponMint(2, 50);
        CouponMint(3, 33);
        CouponMint(5, 20);
        CouponMint(10, 10);
        CouponMint(20, 5);
    }

    function CouponMint(uint256 discount, uint256 amount) public {
        require(
            (msg.sender == _serverAddr) || (msg.sender == address(this)),
            "this Function is only called by server"
        );
        _mint(address(this), discount, amount, "");
        _amount[discount] = _amount[discount] + amount;
        // _safeTransferFrom(msg.sender, marketContract, discount, amount, "");
    }

    address private _serverAddr;
    mapping(uint256 => uint256) private _amount;

    event Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes data,
        uint256 gas
    );

    function setServerAddr(address addr) public returns (address) {
        require(
            msg.sender == _serverAddr,
            "this Function is only called by server"
        );
        _serverAddr = addr;
        return _serverAddr;
    }

    function serverAddr() public view returns (address) {
        return _serverAddr;
    }

    function StocksByDiscount(uint256 discount) public view returns (uint256) {
        return _amount[discount];
    }

    function AllStocks()
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        uint256 balance = HowMuchKindsOfCoupons();
        uint256[] memory keys = KindsOfCoupons();
        uint256[] memory discounts = new uint256[](balance);
        uint256[] memory balances = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            discounts[i] = keys[i];
            balances[i] = _amount[keys[i]];
        }
        return (discounts, balances);
    }

    function HowMuchKindsOfCoupons() public view returns (uint256) {
        uint256 res = 0;
        for (uint256 i = 0; i <= 100; i++) {
            if (_amount[i] == 0) {
                continue;
            }
            if (_amount[i] != 0) {
                res = res + 1;
            }
        }
        return res;
    }

    function KindsOfCoupons() public view returns (uint256[] memory) {
        uint256 balance = HowMuchKindsOfCoupons();
        uint256 j = 0;
        uint256[] memory res = new uint256[](balance);
        for (uint256 i = 0; i <= 100; i++) {
            if (_amount[i] == 0) {
                continue;
            }
            res[j] = i;
            j = j + 1;
        }
        return res;
    }

    function stocksByAccount(address account)
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        uint256 balance = HowMuchKindsOfCoupons();
        uint256[] memory keys = KindsOfCoupons();
        uint256[] memory discounts = new uint256[](balance);
        uint256[] memory balances = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            uint256 _balance = balanceOf(account, keys[i]);
            if (_balance != 0) {
                discounts[i] = keys[i];
                balances[i] = _balance;
            }
        }
        return (discounts, balances);
    }

    function buyCoupon(
        uint256 discount,
        uint256 amount,
        uint256 price,
        address TokenContractAddr
    ) public payable returns (bool) {
        // address payable receiver = payable(_seller[discount]);
        // uint256 price = 70;
        // receiver.transfer(price);

        others(TokenContractAddr).transferWithMarket(
            msg.sender,
            _serverAddr,
            price
        );

        safeTransferFrom(address(this), msg.sender, discount, amount, "0x00");
        _reduceAmount(discount, amount);
        return true;
    }

    function _reduceAmount(uint256 discount, uint256 amount) private {
        _amount[discount] = _amount[discount] - amount;
    }
}
