pragma solidity ^0.4.23;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Escrow {
    using SafeMath for uint256;

    struct Debt {
        bool finished;
        address to;
        uint256 value;
    }

    mapping(address => Debt[]) private debts;
    address private escrowWallet;
    ERC20 private erc20;

    constructor(address _escrowWallet, ERC20 _erc20) public {
        escrowWallet = _escrowWallet;
        erc20 = _erc20;
    }

    function escrow(address _to, uint256 _value) public {
        debts[msg.sender].push(Debt(false, _to, _value));
        erc20.transfer(escrowWallet, _value);
    }


    function finish(address _to, uint256 _value) public {
        Debt[] storage debt = debts[msg.sender];
        uint256 debtArraySize = debt.length;

        for(uint256 a = 0; a < debtArraySize; a ++) {
            if(debt[a].to == _to && debt[a].value == _value) {
                //erc20._transfer(escrowWallet, _to, _value);
                break;
            }
        }
    }
}
