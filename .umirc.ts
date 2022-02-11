import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  base: process.env.NODE_ENV === 'production' ? '/hwancchat/deeplink/' : '/',
  exportStatic: { htmlSuffix: true },
  fastRefresh: {},
  dva: {
    immer: true,
  },
});
