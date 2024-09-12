import type { CapacitorConfig } from '@capacitor/cli';
import '@capacitor-community/safe-area'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Elios',
  webDir: 'dist',
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#000000',
      statusBarContent: 'light',
      navigationBarColor: '#000000',
      navigationBarContent: 'light',
      offset: 0,
    }
  }
};

export default config;
