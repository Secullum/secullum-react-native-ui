import * as Device from 'expo-device';
import * as React from 'react';
import {
  StatusBar as ReactNativeStatusBar,
  StyleSheet,
  View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getTheme } from '../modules/theme';

export class StatusBar extends React.Component {
  static height = getStatusBarHeight();

  getStyles = () => {
    const theme = getTheme();

    const dynamicHeight = () => {
      const deviceId = Device.modelId;

      // When is Android or Web, the modelId is null
      // So we return the status bar height.
      if (deviceId == null) {
        return getStatusBarHeight();
      }

      const iPhoneId = deviceId.substring(6, 8);

      // Dynamic Island is available on iPhone 14 Pro and 14 Pro max
      // Here´s a list os iPhone´s IDs: https://www.theiphonewiki.com/wiki/Models
      if (iPhoneId < 15) return getStatusBarHeight();

      return getStatusBarHeight() + 25;
    };

    const styles = StyleSheet.create({
      statusBar: {
        backgroundColor: theme.statusBarColor,
        height: dynamicHeight()
      }
    });

    return styles;
  };

  render() {
    const styles = this.getStyles();

    return (
      <View style={styles.statusBar}>
        <ReactNativeStatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
      </View>
    );
  }
}
