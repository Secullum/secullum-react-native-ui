import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';

import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native';

export interface MenuItemData {
  path?: string;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  subText?: string;
  subTextStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  nativeID?: string;
}

export interface MenuItemProperties {
  menuItem: MenuItemData;
  icon?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  isCurrentMenuPath?: (path: string) => boolean;
}

export function MenuItem(props: MenuItemProperties) {
  const theme = getTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingRight: 10
    },
    text: {
      color: theme.textColor1,
      fontFamily: 'Lato-Bold',
      fontSize: isTablet() ? 20 : 16,
      paddingVertical: isTablet() ? 15 : 14
    },
    textDisabled: {
      color: theme.borderColor1
    },
    textSelected: {
      color: theme.textColor2
    },
    subText: {
      fontSize: 12,
      marginLeft: 5
    },
    icon: {
      paddingTop: 12,
      paddingRight: 10
    }
  });

  const { menuItem, icon, textStyle, onPress, isCurrentMenuPath } = props;

  const selected =
    isCurrentMenuPath != undefined &&
    menuItem.path != undefined &&
    isCurrentMenuPath(menuItem.path);

  return (
    <TouchableOpacity
      disabled={menuItem.disabled}
      style={styles.container}
      onPress={onPress}
    >
      <Text
        nativeID={menuItem.nativeID}
        style={[
          styles.text,
          menuItem.disabled && styles.textDisabled,
          selected && styles.textSelected,
          textStyle,
          menuItem.textStyle
        ]}
      >
        {menuItem.text}
        {menuItem.subText && (
          <Text style={[styles.subText, menuItem.subTextStyle]}>
            {menuItem.subText}
          </Text>
        )}
      </Text>
      {icon && <FontAwesome name={icon} style={styles.icon} size={20} />}
    </TouchableOpacity>
  );
}

export interface MenuProperties {
  menu: Array<MenuItemData & { submenu?: Array<MenuItemData> }>;
  onMenuPress: (path: string) => void;
  isCurrentMenuPath?: (path: string) => boolean;
}

export interface MenuState {
  indexMenuOpened: number;
}

export class Menu extends React.Component<MenuProperties, MenuState> {
  state: MenuState = {
    indexMenuOpened: -1
  };

  componentDidMount() {
    const { menu, isCurrentMenuPath } = this.props;

    const indexMenuOpened = menu.findIndex(
      menuItem =>
        menuItem.submenu != undefined &&
        menuItem.submenu.some(
          submenuItem =>
            isCurrentMenuPath != undefined &&
            submenuItem.path != undefined &&
            isCurrentMenuPath(submenuItem.path)
        )
    );

    this.setState({ indexMenuOpened });
  }

  handleParentMenuPress = (index: number) => {
    this.setState({
      indexMenuOpened: this.state.indexMenuOpened === index ? -1 : index
    });
  };

  handleMenuPress = (path?: string) => {
    if (path != undefined) {
      this.props.onMenuPress(path);
    }
  };

  getStyles = () => {
    const styles = StyleSheet.create({
      submenuText: {
        paddingLeft: 20,
        paddingVertical: isTablet() ? 10 : 8
      }
    });

    return styles;
  };

  render() {
    const { menu, isCurrentMenuPath } = this.props;
    const styles = this.getStyles();

    return (
      <>
        {menu.map((menuItem, menuItemIndex) => {
          const menuItemIsOpen = this.state.indexMenuOpened === menuItemIndex;

          const menuItemIcon = menuItem.submenu
            ? menuItemIsOpen
              ? 'caret-up'
              : 'caret-down'
            : undefined;

          const menuItemOnPress = () =>
            menuItem.submenu
              ? this.handleParentMenuPress(menuItemIndex)
              : this.handleMenuPress(menuItem.path);

          return (
            <View key={menuItemIndex}>
              <MenuItem
                menuItem={menuItem}
                icon={menuItemIcon}
                onPress={menuItemOnPress}
                isCurrentMenuPath={isCurrentMenuPath}
              />

              {menuItem.submenu && (
                <View
                  style={{
                    height: menuItemIsOpen ? 'auto' : 0,
                    overflow: 'hidden'
                  }}
                >
                  {menuItem.submenu.map((submenuItem, submenuItemIndex) => (
                    <MenuItem
                      key={submenuItemIndex}
                      menuItem={submenuItem}
                      textStyle={styles.submenuText}
                      onPress={() => this.handleMenuPress(submenuItem.path)}
                      isCurrentMenuPath={isCurrentMenuPath}
                    />
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </>
    );
  }
}
