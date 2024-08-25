// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBase.sol";

contract CoinFlip is VRFConsumerBase {
    IERC20 public token;
    uint256 public minBet;
    uint256 public maxBet;
    
    bytes32 internal keyHash;
    uint256 internal fee;
    
    mapping(bytes32 => address) public requestToSender;
    mapping(bytes32 => uint256) public requestToAmount;
    mapping(bytes32 => bool) public requestToGuess;

    event CoinFlipped(address indexed player, uint256 amount, bool guess, bool result);

    constructor(address _vrfCoordinator, address _link, address _token, bytes32 _keyHash)
        VRFConsumerBase(_vrfCoordinator, _link)
    {
        token = IERC20(_token);
        keyHash = _keyHash;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        minBet = 1 * 10 ** 18; // 1 Token
        maxBet = 100 * 10 ** 18; // 100 Tokens
    }

    function flipCoin(uint256 _amount, bool _guess) external returns (bytes32 requestId) {
        require(_amount >= minBet && _amount <= maxBet, "Bet amount out of range");
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        
        requestId = requestRandomness(keyHash, fee);
        requestToSender[requestId] = msg.sender;
        requestToAmount[requestId] = _amount;
        requestToGuess[requestId] = _guess;
        
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        bool result = randomness % 2 == 0;
        address player = requestToSender[requestId];
        uint256 amount = requestToAmount[requestId];
        bool guess = requestToGuess[requestId];
        
        if (result == guess) {
            require(token.transfer(player, amount * 2), "Reward transfer failed");
        }
        
        emit CoinFlipped(player, amount, guess, result);
        
        delete requestToSender[requestId];
        delete requestToAmount[requestId];
        delete requestToGuess[requestId];
    }
}