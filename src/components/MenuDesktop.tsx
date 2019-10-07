import * as React from 'react';
import { getTheme } from '../modules/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextStyle,
  StyleProp,
  ViewStyle
} from 'react-native';
import { isTablet } from '../modules/layout';

interface MenuDesktopItemProperties {
  text: string;
  isParent: boolean;
  path?: string;
  nativeID?: string;
  subText?: string;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  menuIsOpen?: boolean;
  onPress: () => void;
}

class MenuDesktopItem extends React.Component<MenuDesktopItemProperties> {
  static defaultProps = {
    isParent: false
  };

  getStyles = () => {
    const styles = StyleSheet.create({
      submenuTitleIcon: {
        alignItems: 'center',
        marginLeft: 'auto'
      }
    });

    return styles;
  };

  render() {
    const {
      disabled,
      containerStyle,
      textStyle,
      onPress,
      nativeID,
      text,
      subText,
      isParent,
      menuIsOpen
    } = this.props;
    const styles = this.getStyles();

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={containerStyle}
        key={nativeID}
      >
        <Text nativeID={nativeID} style={textStyle}>
          {text}
          {subText && (
            <Text style={{ fontSize: 12, marginLeft: 5 }}>{subText}</Text>
          )}
        </Text>
        {isParent && (
          <FontAwesome
            name={menuIsOpen ? 'caret-up' : 'caret-down'}
            style={styles.submenuTitleIcon}
            size={20}
          />
        )}
      </TouchableOpacity>
    );
  }
}

export interface MenuDesktopProperties {
  menu: Array<{
    path?: string;
    text: string;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    subText?: string;
    nativeID?: string;
    submenu?: Array<{
      path: string;
      text: string;
      textStyle?: StyleProp<TextStyle>;
      disabled?: boolean;
      subText?: string;
      nativeID?: string;
    }>;
  }>;
  onMenuPress: (path: string) => void;
  isCurrentMenuPath?: (path: string) => boolean;
  headerHeight: number;
  menuTextStyle?: StyleProp<TextStyle>;
  submenuTextStyle?: StyleProp<TextStyle>;
}

export interface MenuDesktopState {
  indexMenuOpened: number;
}

export class MenuDesktop extends React.Component<
  MenuDesktopProperties,
  MenuDesktopState
> {
  state: MenuDesktopState = {
    indexMenuOpened: -1
  };

  static defaultProps = {
    headerHeight: 0
  };

  componentDidMount() {
    const { isCurrentMenuPath } = this.props;

    this.setState({
      indexMenuOpened: this.props.menu.findIndex(
        x =>
          x.submenu != undefined &&
          isCurrentMenuPath != undefined &&
          x.submenu.some(y => isCurrentMenuPath(y.path || ''))
      )
    });
  }

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
        fontSize: 16,
        color: theme.textColor1
      },
      itemTextSelected: {
        color: theme.textColor2
      },
      itemTextDisabled: {
        color: theme.borderColor1
      },
      submenuText: {
        color: theme.textColor1,
        fontFamily: 'Lato-Bold',
        fontSize: isTablet() ? 20 : 16,
        paddingLeft: 20,
        paddingVertical: isTablet() ? 10 : 8
      },
      submenuTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingRight: 10
      }
    });

    return styles;
  };

  handleParentMenuPress = (index: number) => {
    this.setState({
      indexMenuOpened: this.state.indexMenuOpened === index ? -1 : index
    });
  };

  render() {
    const {
      menu,
      onMenuPress,
      isCurrentMenuPath,
      menuTextStyle,
      submenuTextStyle
    } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        {menu.map((menuItem, index) => {
          let selected = isCurrentMenuPath
            ? isCurrentMenuPath(menuItem.path || '')
            : false;

          const textStyles = [
            styles.itemText,
            selected ? styles.itemTextSelected : null,
            menuItem.disabled && styles.itemTextDisabled
          ];

          const menuIsOpen = this.state.indexMenuOpened === index;
          const isParent = menuItem.submenu != undefined;
          const textStylesParent = [
            styles.itemText,
            menuTextStyle,
            menuItem.textStyle
          ];

          return (
            <View key={index}>
              <MenuDesktopItem
                nativeID={menuItem.nativeID}
                text={menuItem.text}
                subText={menuItem.subText}
                onPress={() =>
                  menuItem.path
                    ? onMenuPress(menuItem.path)
                    : this.handleParentMenuPress(index)
                }
                containerStyle={
                  isParent ? styles.submenuTitleContainer : styles.itemContainer
                }
                textStyle={isParent ? textStylesParent : textStyles}
                isParent={isParent}
                disabled={!isParent && (selected || menuItem.disabled)}
                menuIsOpen={this.state.indexMenuOpened === index}
              />

              {menuItem.submenu && (
                <View
                  style={{
                    height: menuIsOpen ? 'auto' : 0,
                    overflow: 'hidden',
                    marginBottom: menuIsOpen ? 10 : 20
                  }}
                >
                  {menuItem.submenu.map(item => {
                    selected = isCurrentMenuPath
                      ? isCurrentMenuPath(item.path || '')
                      : false;

                    return (
                      <MenuDesktopItem
                        nativeID={item.nativeID}
                        key={item.path}
                        text={item.text}
                        subText={item.subText}
                        onPress={() => onMenuPress(item.path)}
                        textStyle={[
                          styles.submenuText,
                          submenuTextStyle,
                          item.textStyle,
                          selected ? styles.itemTextSelected : null,
                          item.disabled && styles.itemTextDisabled
                        ]}
                        disabled={item.disabled}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
