
export type ThemeType = 'ia' | 'defi' | 'gaming' | 'identity' | 'art' | 'social';

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface UserThemePreference {
  selectedTheme: ThemeType;
  isFirstTime: boolean;
  lastUpdated: string;
}

export const THEMES: Theme[] = [
  {
    id: 'ia',
    name: 'Intelligence Artificielle',
    description: 'IA, Machine Learning & Technologies du futur',
    icon: '🤖',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'defi',
    name: 'DeFi',
    description: 'Finance décentralisée & Cryptomonnaies',
    icon: '💰',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Jeux vidéo, Métaverse & Divertissement',
    icon: '🎮',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'identity',
    name: 'Identité Numérique',
    description: 'Vérification, Authentification & Sécurité',
    icon: '🆔',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'art',
    name: 'Art & NFT',
    description: 'Création digitale, NFT & Expression artistique',
    icon: '🎨',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'social',
    name: 'Social',
    description: 'Communautés, Réseaux & Interactions',
    icon: '🌐',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600'
  }
];