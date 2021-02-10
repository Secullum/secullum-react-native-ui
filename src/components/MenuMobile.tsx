import * as React from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { Menu, MenuProperties } from './Menu';

export type MenuMobileProperties = MenuProperties & {
  children: React.ReactNode;
  drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open';
  renderLogo: () => React.ReactNode;
  renderUserData?: () => React.ReactNode;
};

export interface MenuMobileState {
  opened: boolean;
}

export class MenuMobile extends React.Component<
  MenuMobileProperties,
  MenuMobileState
> {
  state: MenuMobileState = {
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

  handleMenuPress = (path: string) => {
    this.close();
    this.props.onMenuPress(path);
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
        flexDirection: 'row'
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
      }
    });

    return styles;
  };

  renderNavigationView = () => {
    const { renderLogo, renderUserData, menu, isCurrentMenuPath } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>{renderLogo()}</View>
        {renderUserData && (
          <View style={styles.userContainer}>{renderUserData()}</View>
        )}
        <ScrollView style={styles.menuContainer}>
          <Menu
            menu={menu}
            isCurrentMenuPath={isCurrentMenuPath}
            onMenuPress={this.handleMenuPress}
          />
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
