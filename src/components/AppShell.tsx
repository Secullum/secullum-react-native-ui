import * as React from 'react';
import { DimensionsMonitor } from './DimensionsMonitor';
import { Header, HeaderButton } from './Header';
import { HeaderDesktop } from './HeaderDesktop';
import { MenuProperties } from './Menu';
import { MenuMobile } from './MenuMobile';
import { MenuDesktop } from './MenuDesktop';
import { getTheme } from '../modules/theme';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

export type AppShellProperties = MenuProperties & {
  logoHeader: () => React.ReactNode;
  logoMenu: ImageSourcePropType;
  greeting?: string;
  screenTitle: string;
  renderUserData?: () => React.ReactNode;
  rightButton?: HeaderButton;
};

export class AppShell extends React.Component<AppShellProperties> {
  menu: MenuMobile | null = null;

  getMobileStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        height: Dimensions.get('window').height - HeaderDesktop.height,
        // @ts-ignore: O react-native não tem auto, mas o react-native-web aceita
        overflow: 'auto'
      },
      logoImage: {
        width: 40,
        height: 250,
        marginTop: 10,
        marginBottom: 10
      },
      logoText: {
        color: theme.textColor3,
        fontFamily: 'MankSans-Medium',
        fontSize: 22,
        marginLeft: 10
      }
    });

    return styles;
  };

  getDesktopStyles = () => {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        flex: 1
      },
      content: {
        flex: 1,
        padding: 16,
        height: Dimensions.get('window').height - HeaderDesktop.height,
        // @ts-ignore: O react-native não tem auto, mas o react-native-web aceita
        overflow: 'auto'
      }
    });

    return styles;
  };

  renderMobile = () => {
    const {
      logoMenu,
      screenTitle,
      renderUserData,
      menu,
      onMenuPress,
      isCurrentMenuPath,
      children,
      rightButton
    } = this.props;

    const styles = this.getMobileStyles();

    return (
      <MenuMobile
        ref={ref => (this.menu = ref)}
        menu={menu}
        onMenuPress={onMenuPress}
        isCurrentMenuPath={isCurrentMenuPath}
        renderLogo={() => (
          <>
            <Image source={logoMenu} style={styles.logoImage} />
          </>
        )}
        renderUserData={renderUserData}
      >
        <Header
          title={screenTitle}
          leftButton={{
            nativeID: 'menu-hamburguer',
            icon: 'bars',
            onPress: () => this.menu!.open()
          }}
          rightButton={rightButton}
        />
        <View style={styles.container}>{children}</View>
      </MenuMobile>
    );
  };

  renderDesktop = () => {
    const {
      logoHeader,
      greeting,
      menu,
      onMenuPress,
      isCurrentMenuPath,
      children,
      rightButton,
      renderUserData
    } = this.props;

    const styles = this.getDesktopStyles();

    return (
      <>
        <HeaderDesktop
          logo={logoHeader}
          greeting={greeting}
          rightButton={rightButton}
        />
        <View style={styles.container}>
          <MenuDesktop
            menu={menu}
            headerHeight={HeaderDesktop.height}
            onMenuPress={onMenuPress}
            isCurrentMenuPath={isCurrentMenuPath}
            renderUserData={renderUserData}
          />
          <View nativeID="app-shell-desktop-content" style={styles.content}>
            {children}
          </View>
        </View>
      </>
    );
  };

  render() {
    return (
      <DimensionsMonitor>
        {({ isDesktop }) =>
          isDesktop ? this.renderDesktop() : this.renderMobile()
        }
      </DimensionsMonitor>
    );
  }
}
