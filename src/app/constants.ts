export const COIN_FLIP_ADDRESS = '0x...' // Replace with your actual contract address

export const coinFlipABI = [
  // Your contract ABI goes here
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bool', name: '_guess', type: 'bool' },
    ],
    name: 'flipCoin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // ... other function definitions
] as const;