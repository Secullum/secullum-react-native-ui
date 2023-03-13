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

    const styles = StyleSheet.create({
      statusBar: {
        backgroundColor: theme.statusBarColor,
        height: getStatusBarHeight()
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
