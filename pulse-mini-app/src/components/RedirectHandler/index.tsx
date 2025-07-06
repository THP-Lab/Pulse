'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RedirectHandlerProps {
  children: React.ReactNode;
}

export const RedirectHandler = ({ children }: RedirectHandlerProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkRedirection = async () => {
      try {
        const stored = localStorage.getItem('pulse-user-theme-preference');
        const hasThemePreference = stored !== null;

        console.log('Current pathname:', pathname);
        console.log('Has theme preference:', hasThemePreference);

        if (!hasThemePreference) {
          if (pathname !== '/theme-choice') {
            console.log('First time user - redirecting to theme-choice');
            setShouldRedirect(true);
            router.push('/theme-choice');
            return;
          }
        } else {
          const preference = JSON.parse(stored);
          console.log('Returning user with theme:', preference.selectedTheme);
          
          if (pathname === '/home' && preference.selectedTheme) {
            console.log('Returning user accessing home - redirecting to welcome');
            setShouldRedirect(true);
            router.push('/welcome');
            return;
          }
        }

        setIsChecking(false);
      } catch (error) {
        console.error('Error checking redirection:', error);
        setIsChecking(false);
      }
    };

    checkRedirection();
  }, [pathname, router]);

  if (isChecking || shouldRedirect) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500 text-sm">
          {shouldRedirect ? 'Redirection...' : 'Vérification...'}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};