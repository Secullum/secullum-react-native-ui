import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  StatusBar as ReactNativeStatusBar,
  StyleSheet,
  View
} from 'react-native';

export class StatusBar extends React.Component {
  static height = ReactNativeStatusBar.currentHeight || 20;

  render() {
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

const theme = getTheme();

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: theme.statusBarColor,
    height: StatusBar.height
  }
});
