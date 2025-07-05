'use client';

import { Page } from '@/components/PageLayout';
import { Button, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Configuration des thèmes (répétée pour l'instant)
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

export default function WelcomePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Charger le thème sélectionné au montage du composant
  useEffect(() => {
    const loadThemePreference = () => {
      try {
        const stored = localStorage.getItem('pulse-user-theme-preference');
        if (stored) {
          const preference = JSON.parse(stored);
          setSelectedTheme(preference.selectedTheme);
          console.log('Theme loaded:', preference.selectedTheme);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Trouver les détails du thème sélectionné
  const currentTheme = THEMES.find(theme => theme.id === selectedTheme);

  const handleChangeTheme = () => {
    router.push('/theme-choice');
  };

  const handleGoToHome = () => {
    router.push('/home');
  };

  if (isLoading) {
    return (
      <Page>
        <Page.Main className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Chargement...</p>
          </div>
        </Page.Main>
      </Page>
    );
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Bienvenue !"
        />
      </Page.Header>
      
      <Page.Main className="flex flex-col items-center justify-center gap-8 mb-20 px-4">
        {/* Message principal */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            👋 Hello World !
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Bon retour sur Pulse !
          </p>
          <p className="text-sm text-gray-500">
            Vous êtes connecté et vérifié ✅
          </p>
        </div>

        {/* Affichage du thème sélectionné */}
        {currentTheme && (
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Votre thème préféré :
            </h2>
            
            <div className={`
              bg-gradient-to-br ${currentTheme.gradient} 
              rounded-2xl p-6 text-white text-center shadow-lg
            `}>
              <div className="text-4xl mb-3">
                {currentTheme.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {currentTheme.name}
              </h3>
              <p className="text-sm opacity-90">
                {currentTheme.description}
              </p>
            </div>
          </div>
        )}

        {/* Si pas de thème trouvé */}
        {!currentTheme && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-2">
              Aucun thème sélectionné
            </p>
            <p className="text-sm text-gray-500">
              Choisissez un thème pour personnaliser votre expérience
            </p>
          </div>
        )}

        {/* Boutons d'actions */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Button
            onClick={handleChangeTheme}
            size="lg"
            variant="secondary"
            className="w-full"
          >
            🎨 Changer de thème
          </Button>
          
          <Button
            onClick={handleGoToHome}
            size="lg"
            variant="primary"
            className="w-full"
          >
            🏠 Accéder à l'app
          </Button>
        </div>

        {/* Informations supplémentaires */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>
            Vous êtes maintenant prêt à utiliser Pulse !
          </p>
          <p className="mt-1">
            Votre session est automatiquement sauvegardée
          </p>
        </div>
      </Page.Main>
    </>
  );
}