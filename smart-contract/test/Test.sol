pragma solidity ^0.8.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Token.sol";

contract TestSimpleStorage {
    function testSimpleStorage() public {
        EAToken token = new EAToken();

        string memory expected = "EAToken";
        Assert.equal(token.name(), expected, "value equal test");
    }
}
