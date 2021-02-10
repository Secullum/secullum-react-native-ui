import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { getTheme } from '../modules/theme';
import { Menu, MenuProperties } from './Menu';
import { Space } from './Space';

export type MenuDesktopProperties = MenuProperties & {
  headerHeight: number;
  renderUserData?: () => React.ReactNode;
};

export class MenuDesktop extends React.Component<MenuDesktopProperties> {
  static defaultProps = {
    headerHeight: 0
  };

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.backgroundColor1,
        height: Dimensions.get('window').height - this.props.headerHeight,
        width: 250,
        paddingHorizontal: 15,
        paddingVertical: 15,
        shadowOpacity: 0.31,
        shadowRadius: 20,
        shadowColor: theme.shadowColor1
      }
    });

    return styles;
  };

  render() {
    const { menu, onMenuPress, isCurrentMenuPath, renderUserData } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        {renderUserData ? <View>{renderUserData()}</View> : null}
        <Space />
        <Menu
          menu={menu}
          isCurrentMenuPath={isCurrentMenuPath}
          onMenuPress={onMenuPress}
        />
      </View>
    );
  }
}
