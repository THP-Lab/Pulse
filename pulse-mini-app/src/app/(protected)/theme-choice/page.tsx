'use client';

import { ThemeCard } from '@/components/ThemeCard';
import { Page } from '@/components/PageLayout';
import { Button, LiveFeedback, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const THEMES = [
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

const saveThemePreference = (theme: string): void => {
  try {
    const preference = {
      selectedTheme: theme,
      isFirstTime: false,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('pulse-user-theme-preference', JSON.stringify(preference));
    console.log('Theme preference saved:', preference);
  } catch (error) {
    console.error('Error saving theme preference:', error);
  }
};

export default function ThemeChoicePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    console.log('Theme selected:', themeId);
  };

  const handleConfirmChoice = async () => {
    if (!selectedTheme) return;
    
    setIsConfirming(true);
    
    try {
      saveThemePreference(selectedTheme);
      
      console.log('Theme preference saved successfully');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/welcome');
      
    } catch (error) {
      console.error('Error saving theme preference:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Choisir votre thème"
        />
      </Page.Header>
      
      <Page.Main className="flex flex-col items-center justify-start gap-6 mb-20 px-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Bienvenue sur Pulse !
          </h1>
          <p className="text-gray-600 text-sm">
            Choisissez votre thème préféré pour personnaliser votre expérience
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {THEMES.map((theme) => (
            <ThemeCard
              key={theme.id}
              id={theme.id}
              name={theme.name}
              description={theme.description}
              icon={theme.icon}
              color={theme.color}
              gradient={theme.gradient}
              isSelected={selectedTheme === theme.id}
              onSelect={handleThemeSelect}
            />
          ))}
        </div>
        
        {selectedTheme && (
          <div className="w-full max-w-md mt-6">
            <LiveFeedback
              label={{
                failed: 'Erreur lors de la sauvegarde',
                pending: 'Sauvegarde en cours...',
                success: 'Thème sauvegardé !'
              }}
              state={isConfirming ? 'pending' : undefined}
            >
              <Button
                onClick={handleConfirmChoice}
                disabled={isConfirming}
                size="lg"
                variant="primary"
                className="w-full"
              >
                {isConfirming ? 'Sauvegarde...' : 'Confirmer mon choix'}
              </Button>
            </LiveFeedback>
          </div>
        )}

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Vous pourrez changer de thème plus tard dans les paramètres</p>
        </div>
      </Page.Main>
    </>
  );
}