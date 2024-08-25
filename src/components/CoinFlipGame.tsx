import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';      
import { coinFlipABI, COIN_FLIP_ADDRESS } from '../app/constants';

interface CoinFlipGameProps {
  blockchain: string;
}

export default function CoinFlipGame({ blockchain }: CoinFlipGameProps) {
  const [amount, setAmount] = useState('');
  const [guess, setGuess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleFlip = async () => {
    if (amount && guess !== null) {
      setIsLoading(true);
      try {
        await writeContract({
          address: COIN_FLIP_ADDRESS,
          abi: coinFlipABI,
          functionName: 'flipCoin',
          args: [parseEther(amount), guess],
        });
      } catch (error) {
        console.error('Error flipping coin:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Coin Flip Game</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to bet"
      />
      <button onClick={() => setGuess(true)}>Heads</button>
      <button onClick={() => setGuess(false)}>Tails</button>
      <button onClick={handleFlip} disabled={!amount || guess === null || isLoading || isConfirming}>
        {isLoading ? 'Preparing...' : isConfirming ? 'Confirming...' : 'Flip Coin'}
      </button>
      {isSuccess && <p>Transaction successful! Check the explorer for details.</p>}
    </div>
  );
}