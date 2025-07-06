import { ThemeStorage } from './theme-storage';

export class FirstTimeChecker {

  static getRedirectPath(): 'theme-choice' | 'welcome' {
    const isFirstTime = ThemeStorage.isFirstTimeUser();
    
    if (isFirstTime) {
      console.log('First time user detected - redirecting to theme choice');
      return 'theme-choice';
    } else {
      console.log('Returning user detected - redirecting to welcome');
      return 'welcome';
    }
  }

  static hasSelectedTheme(): boolean {
    const preference = ThemeStorage.getThemePreference();
    return preference !== null && preference.selectedTheme !== undefined;
  }


  static getSelectedTheme() {
    const preference = ThemeStorage.getThemePreference();
    return preference?.selectedTheme || null;
  }


  static handlePostAuthRedirect(): string {
    const redirectPath = this.getRedirectPath();
    
    if (redirectPath === 'theme-choice') {
      return '/theme-choice';
    } else {
      return '/welcome';
    }
  }
}