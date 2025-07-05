export interface UserThemePreference {
    selectedTheme: string;
    isFirstTime: boolean;
    lastUpdated: string;
  }
  
  export class RedirectLogic {
    private static readonly STORAGE_KEY = 'pulse-user-theme-preference';
  

    static isFirstTimeUser(): boolean {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored === null;
      } catch (error) {
        console.error('Error checking first time user:', error);
        return true; // Par défaut, considérer comme nouvel utilisateur
      }
    }
  

    static getThemePreference(): UserThemePreference | null {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) return null;
        
        return JSON.parse(stored) as UserThemePreference;
      } catch (error) {
        console.error('Error getting theme preference:', error);
        return null;
      }
    }
  

    static getRedirectRoute(currentPath: string): string | null {
      const isFirstTime = this.isFirstTimeUser();
      const preference = this.getThemePreference();
  
      console.log('Redirect logic:', {
        currentPath,
        isFirstTime,
        hasPreference: !!preference
      });
  

      if (isFirstTime) {
        if (currentPath !== '/theme-choice') {
          return '/theme-choice';
        }
        return null;
      }

      if (preference) {
        if (currentPath === '/home') {
          return '/welcome';
        }
      }
  
      return null;
    }
  

    static saveThemePreference(theme: string): void {
      try {
        const preference: UserThemePreference = {
          selectedTheme: theme,
          isFirstTime: false,
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preference));
        console.log('Theme preference saved:', preference);
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    }
  

    static resetPreferences(): void {
      try {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('Preferences reset');
      } catch (error) {
        console.error('Error resetting preferences:', error);
      }
    }
  }