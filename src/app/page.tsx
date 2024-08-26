// /src/app/page.tsx
'use client';

import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import CoinFlipGame from '../components/CoinFlipGame';
import BlockchainSelector from '../components/BlockchainSelector';

export default function Home() {
  const [selectedBlockchain, setSelectedBlockchain] = useState('');
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const handleBlockchainSelect = (blockchain: string) => {
    setSelectedBlockchain(blockchain);
    // Switch network based on selected blockchain
    // You'll need to implement this logic using switchChain
  };

  const handleConnect = async () => {
    console.log("Connect button clicked"); // Add this line
    if (!open) {
      console.error("open function is not available");
      return;
    }
    try {
      console.log("Attempting to open Web3Modal"); // Add this line
      await open();
      console.log("Web3Modal opened successfully"); // Add this line
    } catch (error) {
      console.error('Failed to open Web3Modal', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Crypto Gambling Web App</h1>
      {!isConnected ? (
        <button onClick={handleConnect} className="btn btn-primary">
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: {address}</p>     
          <p>Current Chain ID: {chainId}</p>
          <BlockchainSelector onSelect={handleBlockchainSelect} />
          {selectedBlockchain && (
            <CoinFlipGame blockchain={selectedBlockchain} />
          )}
        </>
      )}
    </main>
  );
}
