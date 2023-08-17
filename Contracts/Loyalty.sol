// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Loyalty{
    address public owner=0xB8Ce545c92507fAfBDAaC35E6846e94665C8cB55;
    string public programName= "LOYALTY SYSTEM";
    mapping(address => uint256) public loyaltyPoints;

    event PointsEarned(address indexed user, uint256 pointsEarned);
    event PointsRedeemed(address indexed user, uint256 pointsRedeemed);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function earnPoints(uint256 points) external {
        loyaltyPoints[msg.sender] += points;
        emit PointsEarned(msg.sender, points);
    }

    function redeemPoints(uint256 pointsToRedeem) external {
        require(loyaltyPoints[msg.sender] >= pointsToRedeem, "Not enough points");
        
        loyaltyPoints[msg.sender] -= pointsToRedeem;
        emit PointsRedeemed(msg.sender, pointsToRedeem);
    }

    function getUserPoints(address user) external view returns (uint256) {
        return loyaltyPoints[user];
    }

    function updateProgramName(string calldata newName) external onlyOwner {
        programName = newName;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
