import * as React from 'react';
import DrawerLayout from 'react-native-drawer-layout';
import { getTheme } from '../modules/theme';

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
  menu: Array<{ path: string; text: string }>;
  children: React.ReactNode;
  onMenuPress: (path: string) => void;
  renderUserData: () => React.ReactNode;
  drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open';
}

export interface MenuState {
  opened: boolean;
}

export class Menu extends React.Component<MenuProperties, MenuState> {
  state: MenuState = {
    opened: false
  };

  drawer: DrawerLayout | null = null;

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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

  renderNavigationView = () => {
    const { renderLogo, menu, onMenuPress, renderUserData } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>{renderLogo()}</View>
        <View style={styles.userContainer}>{renderUserData()}</View>
        <ScrollView style={styles.menuContainer}>
          {menu.map((menuItem, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.close();
                onMenuPress(menuItem.path);
              }}
            >
              <Text style={styles.menuText}>{menuItem.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  render() {
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
  }
});
