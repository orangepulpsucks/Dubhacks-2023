import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.snipcal.app', // Must be unique and should correspond to domain
  appName: 'Snip-Cal',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
