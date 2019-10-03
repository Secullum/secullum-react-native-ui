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
  StyleProp
} from 'react-native';
import { isTablet } from '../modules/layout';

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
  opened: boolean;
  indexMenuOpened: number;
}

export class MenuDesktop extends React.Component<
  MenuDesktopProperties,
  MenuDesktopState
> {
  state: MenuDesktopState = {
    opened: false,
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
      submenuTitleIcon: {
        paddingTop: 15,
        paddingRight: 10
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

          if (!menuItem.submenu) {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onMenuPress(menuItem.path || '')}
                disabled={selected || menuItem.disabled}
                style={styles.itemContainer}
              >
                <Text nativeID={menuItem.nativeID} style={textStyles}>
                  {menuItem.text}
                  {menuItem.subText && (
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>
                      {menuItem.subText}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            );
          }

          const menuIsOpen = this.state.indexMenuOpened === index;

          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => this.handleParentMenuPress(index)}
                style={styles.submenuTitleContainer}
              >
                <Text
                  nativeID={menuItem.nativeID}
                  style={[styles.itemText, menuTextStyle, menuItem.textStyle]}
                >
                  {menuItem.text}
                  {menuItem.subText && (
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>
                      {menuItem.subText}
                    </Text>
                  )}
                </Text>
                <FontAwesome
                  name={menuIsOpen ? 'caret-up' : 'caret-down'}
                  style={styles.submenuTitleIcon}
                  size={20}
                />
              </TouchableOpacity>

              <View
                style={{
                  height: menuIsOpen ? 'auto' : 0,
                  overflow: 'hidden'
                }}
              >
                {menuItem.submenu.map((item, indice) => {
                  selected = isCurrentMenuPath
                    ? isCurrentMenuPath(item.path || '')
                    : false;

                  return (
                    <TouchableOpacity
                      key={indice}
                      onPress={() => {
                        onMenuPress(item.path);
                      }}
                      disabled={item.disabled}
                    >
                      <Text
                        nativeID={item.nativeID}
                        style={[
                          styles.submenuText,
                          submenuTextStyle,
                          item.textStyle,
                          selected ? styles.itemTextSelected : null,
                          item.disabled && styles.itemTextDisabled
                        ]}
                      >
                        {item.text}
                        {item.subText && (
                          <Text style={{ fontSize: 12, marginLeft: 5 }}>
                            {item.subText}
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
