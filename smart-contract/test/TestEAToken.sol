pragma solidity ^0.8.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Token.sol";

contract Test {
    function test() public {
        EAToken ss = new EAToken();

        Assert.equal(ss.name(), "EAToken", "value equal test");
    }
}
