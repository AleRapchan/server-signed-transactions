//SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

/// @title Server Signed Transactions
/// @author Alexandre Rapchan B. Barros (BlockExplorer)
/// @notice This smart contract is used sign transactions from the server side
/// @dev Utilize setOwner function
contract MyContract {  
    
    address public owner;
    uint public storedData;
    
    constructor(){    
        owner = msg.sender;  
    }
    
  function setOwner(address newOwner) public returns (address newowner){
      require (owner == msg.sender, "onlyOwner!");
      owner = newOwner;
      return owner;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() view public returns (uint retVal) {
    return storedData;
  }
    
}