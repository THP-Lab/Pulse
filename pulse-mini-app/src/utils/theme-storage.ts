import { ThemeType, UserThemePreference } from '@/types/theme';

const STORAGE_KEY = 'pulse-user-theme-preference';

export class ThemeStorage {

  static saveThemePreference(theme: ThemeType): void {
    try {
      const preference: UserThemePreference = {
        selectedTheme: theme,
        isFirstTime: false,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
      console.log('Theme preference saved:', theme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }

  static getThemePreference(): UserThemePreference | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const preference = JSON.parse(stored) as UserThemePreference;
      console.log('Theme preference loaded:', preference);
      return preference;
    } catch (error) {
      console.error('Error loading theme preference:', error);
      return null;
    }
  }

  static isFirstTimeUser(): boolean {
    const preference = this.getThemePreference();
    return preference === null || preference.isFirstTime;
  }

  static markAsReturningUser(): void {
    const preference = this.getThemePreference();
    if (preference) {
      preference.isFirstTime = false;
      preference.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
    }
  }


  static clearThemePreference(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Theme preference cleared');
    } catch (error) {
      console.error('Error clearing theme preference:', error);
    }
  }
}