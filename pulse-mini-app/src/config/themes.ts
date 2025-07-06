export interface Theme {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    gradient: string;
  }
  
  export const THEMES: Theme[] = [
    {
      id: '3',
      name: 'Gaming (GameFi)',
      description: 'Blockchain gaming & play-to-earn',
      icon: '/nft_gamefi.png',
      color: '#ef4444',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: '4',
      name: 'Artificial Intelligence (AI)',
      description: 'AI & blockchain integration',
      icon: '/artificial-intelligence_9716530.png',
      color: '#6366f1',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: '5',
      name: 'DeFi',
      description: 'Decentralized finance & protocols',
      icon: '/Defi.png',
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: '6',
      name: 'Real World Assets (RWA)',
      description: 'Tokenized real-world assets',
      icon: '/icons8-bulding-64.png',
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: '7',
      name: 'Decentralized Identifier',
      description: 'Decentralized identity & authentication',
      icon: '/Decentralized.png',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: '8',
      name: 'DePIN',
      description: 'Decentralized physical infrastructure',
      icon: '/Decentralized Finance.png',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: '9',
      name: 'Prediction Markets',
      description: 'Prediction markets & decentralized betting',
      icon: '/Crypto Prediction.png',
      color: '#8b5cf6',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      id: '10',
      name: 'Centralized Exchange (CEX)',
      description: 'Centralized exchanges & trading',
      icon: '/Ethereum.png',
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];
  
  export const getThemeById = (id: string): Theme | undefined => {
    return THEMES.find(theme => theme.id === id);
  };