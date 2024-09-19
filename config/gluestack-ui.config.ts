// gluestack-ui.config.ts

import {createConfig} from '@gluestack-style/react';
import {componentsConfig} from '@gluestack-ui/config';

export const config = createConfig({
  tokens: {
    colors: {
      primary0: '#ffffff',
      primaryM: '#2E3192',
      secondary: '#29ABE2',
      secondaryLight: '#3647A0',
      linear: '#ffffffa3',
    },
  },
  aliases: undefined,
});

type Config = typeof config;
type Components = typeof componentsConfig;

declare module '@gluestack-ui/themed' {
  interface UIConfig extends Config {}
  interface UIComponents extends Components {}
}
