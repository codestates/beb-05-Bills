pragma solidity ^0.8.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Token.sol";

contract TestSimpleStorage {
    function testSimpleStorage() public {
        ICToken ss = new ICToken();

        string memory expected = "Bill";
        Assert.equal(ss.name(), expected, "value equal test");
    }
}
