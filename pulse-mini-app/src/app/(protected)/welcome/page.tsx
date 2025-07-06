'use client';

import { Page } from '@/components/PageLayout';
import { Button, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getThemeById } from '@/config/themes';
import { ThemeIcon } from '@/components/ThemeIcon';

export default function WelcomePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const currentTheme = selectedTheme ? getThemeById(selectedTheme) : null;

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
            <p className="text-gray-500">Loading...</p>
          </div>
        </Page.Main>
      </Page>
    );
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Welcome!"
        />
      </Page.Header>
      
      <Page.Main className="flex flex-col items-center justify-center gap-8 mb-20 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            👋 Hello World!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Welcome back to Pulse!
          </p>
          <p className="text-sm text-gray-500">
            You are connected and verified ✅
          </p>
        </div>

        {currentTheme && (
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Your preferred theme:
            </h2>
            
            <div className={`
              bg-gradient-to-br ${currentTheme.gradient} 
              rounded-2xl p-6 text-white text-center shadow-lg
            `}>
              <div className="mb-3 flex justify-center">
                <ThemeIcon 
                  icon={currentTheme.icon} 
                  name={currentTheme.name} 
                  size={64} 
                  className="rounded-lg"
                />
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

        {!currentTheme && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-2">
              No theme selected
            </p>
            <p className="text-sm text-gray-500">
              Choose a theme to personalize your experience
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Button
            onClick={handleChangeTheme}
            size="lg"
            variant="secondary"
            className="w-full"
          >
            🎨 Change Theme
          </Button>
          
          <Button
            onClick={handleGoToHome}
            size="lg"
            variant="primary"
            className="w-full"
          >
            🏠 Go to App
          </Button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>
            You are now ready to use Pulse!
          </p>
          <p className="mt-1">
            Your session is automatically saved
          </p>
        </div>
      </Page.Main>
    </>
  );
}