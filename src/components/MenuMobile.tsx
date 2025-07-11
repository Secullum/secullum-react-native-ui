import * as React from 'react';
import {
  BackHandler,
  NativeEventSubscription,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
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

  backButtonHandlerSubscription: NativeEventSubscription | null = null;
  drawer: DrawerLayout | null = null;

  componentDidMount() {
    this.backButtonHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton
    );
  }

  componentWillUnmount() {
    if (this.backButtonHandlerSubscription) {
      this.backButtonHandlerSubscription.remove();
    }
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
        paddingLeft: 10,
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
        // When closing the app, we encountered the error 'useInsertionEffect must not schedule updates',
        // because we were trying to update the state during the component render cycle. To avoid this,
        // a setTimeout was introduced with a small delay (enough time to complete the render) before executing other functions.
        // Related issue on GitLab: 11635
        onDrawerClose={() =>
          setTimeout(() => this.setState({ opened: false }), 1)
        }
      >
        {this.props.children}
      </DrawerLayout>
    );
  }
}
