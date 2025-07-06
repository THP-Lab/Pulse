'use client';

import { ThemeCard } from '@/components/ThemeCard';
import { AnimatedText } from '@/components/AnimatedText';
import { Page } from '@/components/PageLayout';
import { Button, LiveFeedback, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { THEMES } from '@/config/themes';

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
          title="Choose Your Theme"
        />
      </Page.Header>
      
      <Page.Main className="flex flex-col items-center justify-start gap-6 mb-20 px-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            <span className="font-extrabold">Pulse</span>
          </h1>
          <AnimatedText className="mb-2" />
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
                failed: 'Error saving preference',
                pending: 'Saving...',
                success: 'Theme saved!'
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
                {isConfirming ? 'Saving...' : 'Confirm Choice'}
              </Button>
            </LiveFeedback>
          </div>
        )}

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>You can change your theme later in settings</p>
        </div>
      </Page.Main>
    </>
  );
}