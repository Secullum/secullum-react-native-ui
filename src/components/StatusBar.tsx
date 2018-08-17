import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  StatusBar as ReactNativeStatusBar,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle
} from 'react-native';

export interface StatusBarProperties {
  style?: StyleProp<ViewStyle>;
}

export class StatusBar extends React.Component<StatusBarProperties> {
  static height = ReactNativeStatusBar.currentHeight || 20;

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.statusBar, style]}>
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
    backgroundColor: theme.statusBarColor1,
    height: StatusBar.height
  }
});
