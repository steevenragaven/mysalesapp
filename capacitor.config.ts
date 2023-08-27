import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sales',
  webDir: 'www',
  plugins: {
    '@capacitor-community/google-maps': {
      API_KEY_FOR_ANDROID: 'YOUR_GOOGLE_MAPS_ANDROID_API_KEY'
    }
  }
};

export default config;
