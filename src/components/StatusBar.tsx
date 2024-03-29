import * as React from 'react';
import {
  StatusBar as ReactNativeStatusBar,
  StyleSheet,
  View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getTheme } from '../modules/theme';

interface Props {
  extraHeight: number;
}
export class StatusBar extends React.Component<Props> {
  static height = getStatusBarHeight();

  getStyles = () => {
    const theme = getTheme();
    const { extraHeight } = this.props;

    const styles = StyleSheet.create({
      statusBar: {
        backgroundColor: theme.statusBarColor,
        height: getStatusBarHeight() + extraHeight
      }
    });

    return styles;
  };

  static defaultProps = {
    extraHeight: 0
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
