import { useState } from 'react';

const blockchains = ['Ethereum', 'Polygon', 'Solana', 'Bitcoin'];

interface BlockchainSelectorProps {
  onSelect: (blockchain: string) => void;
}

export default function BlockchainSelector({ onSelect }: BlockchainSelectorProps) {
  const [selected, setSelected] = useState('');

  const handleSelect = (blockchain: string) => {
    setSelected(blockchain);
    onSelect(blockchain);
  };

  return (
    <div>
      <h2>Select a Blockchain</h2>
      {blockchains.map((blockchain) => (
        <button
          key={blockchain}
          onClick={() => handleSelect(blockchain)}
          className={`btn ${selected === blockchain ? 'btn-primary' : 'btn-secondary'}`}
        >
          {blockchain}
        </button>
      ))}
    </div>
  );
}