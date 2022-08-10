module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      { useTransformReactJSXExperimental: true },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@common': './src/components/common',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@customtypes': './src/types',
          '@globalStyles': './src/styles/globalStyles',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@screens': './src/components/screens',
          '@store': './src/redux',
          '@themes': './src/styles/themes',
          '@utils': './src/utils',
        },
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
