import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export interface MenuDesktopProperties {
  menu: Array<{ path: string; text: string }>;
  onMenuPress: (path: string) => void;
  currentMenuPath?: string;
  headerHeight: number;
}

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
        paddingVertical: 25,
        shadowOpacity: 0.31,
        shadowRadius: 20,
        shadowColor: theme.shadowColor1
      },
      itemContainer: {
        marginBottom: 20
      },
      itemText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: theme.textColor1
      },
      itemTextSelected: {
        color: theme.textColor2
      }
    });

    return styles;
  };

  render() {
    const { menu, onMenuPress, currentMenuPath } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        {menu.map(menuItem => {
          const selected = menuItem.path === currentMenuPath;

          const textStyles = [
            styles.itemText,
            selected ? styles.itemTextSelected : null
          ];

          return (
            <TouchableOpacity
              key={menuItem.path}
              onPress={() => onMenuPress(menuItem.path)}
              disabled={selected}
              style={styles.itemContainer}
            >
              <Text style={textStyles}>{menuItem.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
