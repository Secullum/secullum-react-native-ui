import * as React from 'react';
import DrawerLayout from 'react-native-drawer-layout';
import { getTheme } from '../modules/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isTablet } from '../modules/layout';

import {
  BackHandler,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native';

export interface MenuProperties {
  renderLogo: () => React.ReactNode;
  menu: Array<{
    path?: string;
    text: string;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    subText?: string;
    submenu?: Array<{
      path: string;
      text: string;
      textStyle?: StyleProp<TextStyle>;
    }>;
    nativeID?: string;
  }>;
  children: React.ReactNode;
  onMenuPress: (path: string) => void;
  renderUserData?: () => React.ReactNode;
  drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open';
  currentMenuPath?: string;
  menuTextStyle?: StyleProp<TextStyle>;
  submenuTextStyle?: StyleProp<TextStyle>;
}

export interface MenuState {
  opened: boolean;
  indexMenuOpened: number;
}

export class Menu extends React.Component<MenuProperties, MenuState> {
  state: MenuState = {
    opened: false,
    indexMenuOpened: -1
  };

  drawer: DrawerLayout | null = null;

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setState({
      indexMenuOpened: this.props.menu.findIndex(
        x =>
          x.submenu != undefined &&
          x.submenu.some(y => y.path === this.props.currentMenuPath)
      )
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.opened) {
      this.close();
      return true;
    }

    return false;
  };

  open = () => {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  };

  close = () => {
    if (this.drawer) {
      this.drawer.closeDrawer();
    }
  };

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      logoContainer: {
        paddingVertical: 5,
        paddingLeft: 20,
        borderBottomColor: theme.borderColor1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      userContainer: {
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderBottomColor: theme.borderColor1,
        borderBottomWidth: 1
      },
      menuContainer: {
        paddingLeft: 20,
        flex: 1
      },
      menuText: {
        color: theme.textColor1,
        fontFamily: 'Lato-Bold',
        fontSize: isTablet() ? 20 : 16,
        paddingVertical: isTablet() ? 15 : 14
      },
      menuTextDisabled: {
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

  renderNavigationView = () => {
    const {
      renderLogo,
      menu,
      onMenuPress,
      renderUserData,
      menuTextStyle,
      submenuTextStyle
    } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>{renderLogo()}</View>

        {renderUserData ? (
          <View style={styles.userContainer}>{renderUserData()}</View>
        ) : null}

        <ScrollView style={styles.menuContainer}>
          {menu.map((menuItem, index) => {
            if (!menuItem.submenu) {
              return (
                <TouchableOpacity
                  key={index}
                  disabled={menuItem.disabled}
                  onPress={() => {
                    this.close();
                    onMenuPress(menuItem.path || '');
                  }}
                >
                  <Text
                    nativeID={menuItem.nativeID}
                    style={[
                      styles.menuText,
                      menuItem.disabled && styles.menuTextDisabled,
                      menuTextStyle,
                      menuItem.textStyle
                    ]}
                  >
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
                    style={[styles.menuText, menuTextStyle, menuItem.textStyle]}
                  >
                    {menuItem.text}
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
                  {menuItem.submenu.map((item, indice) => (
                    <TouchableOpacity
                      key={indice}
                      onPress={() => {
                        this.close();
                        onMenuPress(item.path);
                      }}
                    >
                      <Text
                        style={[
                          styles.submenuText,
                          submenuTextStyle,
                          item.textStyle
                        ]}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  render() {
    const theme = getTheme();

    return (
      <DrawerLayout
        ref={drawer => (this.drawer = drawer)}
        drawerLockMode={this.props.drawerLockMode}
        drawerBackgroundColor={theme.backgroundColor1}
        drawerWidth={isTablet() ? 450 : 300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={this.renderNavigationView}
        onDrawerOpen={() => this.setState({ opened: true })}
        onDrawerClose={() => this.setState({ opened: false })}
      >
        {this.props.children}
      </DrawerLayout>
    );
  }
}
