import path from 'path';
import { reactNative } from 'docz-plugin-react-native';

export default {
  title: 'secullum-react-native-ui',
  src: './docs/',
  base: '/secullum-react-native-ui/',
  typescript: true,
  plugins: [reactNative()],
  wrapper: 'docs/Wrapper.js',
  modifyBundlerConfig: config => {
    const jsRule = config.module.rules.find(rule => rule.test.test('*.js'));

    jsRule.exclude = [
      /node_modules(\/|\\)(?!(react-native-vector-icons|react-native-elevated-view|react-native-animatable|react-native-modal|react-native-modal-datetime-picker)(\/|\\)).*/
    ];

    return config;
  }
};
