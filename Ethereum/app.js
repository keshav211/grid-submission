
const contractAddress='0x62d92ea2573702f69d62cffe28395120b8bd2cd1';

//ABI: collection of functions and data structures that the smart contract exposes to the outside world
const contractABI=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "points",
				"type": "uint256"
			}
		],
		"name": "earnPoints",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pointsEarned",
				"type": "uint256"
			}
		],
		"name": "PointsEarned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pointsRedeemed",
				"type": "uint256"
			}
		],
		"name": "PointsRedeemed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pointsToRedeem",
				"type": "uint256"
			}
		],
		"name": "redeemPoints",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newName",
				"type": "string"
			}
		],
		"name": "updateProgramName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "loyaltyPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "programName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function main() {
	// Checking if the Ethereum provider (MetaMask) is available
	if (typeof window.ethereum !== 'undefined') {
	  // Requesting Metamask to enable accounts
	  await window.ethereum.enable();
  
	  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	  const userAccount = accounts[0];
  
	  // Creating an instance of the contract deployed on Sepolia TestNet
	  const web3 = new Web3(window.ethereum); // Create a web3 instance
	  const loyaltyContract = new web3.eth.Contract(contractABI, contractAddress);
  
	  // Displaying program name and user points
	  displayProgramName(loyaltyContract);
	  displayUserPoints(loyaltyContract, userAccount);
  
	  // Adding event listeners to buttons
	  document.getElementById('earnButton').addEventListener('click', () => earnPoints(loyaltyContract, userAccount));
	  document.getElementById('redeemButton').addEventListener('click', () => redeemPoints(loyaltyContract, userAccount));
	} else {
	  console.log('MetaMask not detected. Please install the MetaMask extension.');
	}
  }
  
async function displayProgramName(contract) {
	console.log(contract)
    const programName = await contract.methods.programName().call();
    document.getElementById('programName').textContent = programName;
}

async function displayUserPoints(contract, user) {
    const points = await contract.methods.getUserPoints(user).call();
    document.getElementById('userPoints').textContent = points;
}

async function earnPoints(contract, user) {
    await contract.methods.earnPoints(100).send({ from: user });
    displayUserPoints(contract, user);
}

async function redeemPoints(contract, user) {
    await contract.methods.redeemPoints(50).send({ from: user });
    displayUserPoints(contract, user);
}

async function  updateProgramName(contract, user) {
    await contract.methods.updateProgramName("LOYALTY REWARD PROGRAM").send({ from: user });
    displayUserPoints(contract, user);
}


  main();