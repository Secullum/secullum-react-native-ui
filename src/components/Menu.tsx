import * as React from 'react';
import DrawerLayout from 'react-native-drawer-layout';
import { getTheme } from '../modules/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

export interface MenuProperties {
  renderLogo: () => React.ReactNode;
  menu: Array<{
    path?: string;
    text: string;
    childRoutes?: Array<{ path: string; text: string }>;
  }>;
  children: React.ReactNode;
  onMenuPress: (path: string) => void;
  renderUserData: () => React.ReactNode;
  drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open';
  actualRouteName: string;
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
          x.childRoutes != undefined &&
          x.childRoutes.some(y => y.path === this.props.actualRouteName)
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

  getStyles = (): any => {
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
        fontSize: 16,
        paddingVertical: 14
      },
      submenuText: {
        color: theme.textColor1,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        paddingLeft: 20,
        paddingVertical: 8
      },
      icon: {
        paddingTop: 15,
        paddingRight: 10
      },
      titleItem: {
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
    const { renderLogo, menu, onMenuPress, renderUserData } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>{renderLogo()}</View>
        <View style={styles.userContainer}>{renderUserData()}</View>
        <ScrollView style={styles.menuContainer}>
          {menu.map((menuItem, index) => {
            if (!menuItem.childRoutes) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.close();
                    onMenuPress(menuItem.path || '');
                  }}
                >
                  <Text style={styles.menuText}>{menuItem.text}</Text>
                </TouchableOpacity>
              );
            }

            const menuIsOpen = this.state.indexMenuOpened === index;

            return (
              <View key={index}>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.handleParentMenuPress(index);
                  }}
                >
                  <View style={styles.titleItem}>
                    <Text style={styles.menuText}>{menuItem.text}</Text>
                    <FontAwesome
                      name={menuIsOpen ? 'caret-up' : 'caret-down'}
                      style={styles.icon}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    height: menuIsOpen ? menuItem.childRoutes.length * 40 : 0
                  }}
                >
                  {menuItem.childRoutes.map((item, indice) => (
                    <TouchableOpacity
                      key={indice}
                      onPress={() => {
                        this.close();
                        onMenuPress(item.path);
                      }}
                    >
                      <Text style={styles.submenuText}>{item.text}</Text>
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
        drawerLockMode={this.props.drawerLockMode}
        ref={drawer => (this.drawer = drawer)}
        drawerBackgroundColor={theme.backgroundColor1}
        drawerWidth={300}
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
