import * as React from 'react';
import { DimensionsMonitor } from './DimensionsMonitor';
import { Header } from './Header';
import { HeaderDesktop } from './HeaderDesktop';
import { Menu } from './Menu';
import { MenuDesktop } from './MenuDesktop';
import { getTheme } from '../modules/theme';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

export interface AppShellProperties {
  logoHeader: ImageSourcePropType;
  logoMenu: ImageSourcePropType;
  title: string;
  greeting?: string;
  screenTitle: string;
  renderUserData?: () => React.ReactNode;
  menu: Array<{
    path: string;
    text: string;
    disabled?: boolean;
    subText?: string;
  }>;
  onMenuPress: (path: string) => void;
  currentMenuPath?: string;
}

export class AppShell extends React.Component<AppShellProperties> {
  menu: Menu | null = null;

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
        height: 40,
        marginTop: 10,
        marginBottom: 10
      },
      logoText: {
        color: theme.textColor1,
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
      title,
      logoMenu,
      screenTitle,
      renderUserData,
      menu,
      onMenuPress,
      currentMenuPath,
      children
    } = this.props;

    const styles = this.getMobileStyles();

    return (
      <Menu
        ref={ref => (this.menu = ref)}
        menu={menu}
        onMenuPress={onMenuPress}
        currentMenuPath={currentMenuPath}
        renderLogo={() => (
          <>
            <Image source={logoMenu} style={styles.logoImage} />
            <Text style={styles.logoText}>{title}</Text>
          </>
        )}
        renderUserData={renderUserData}
      >
        <Header
          title={screenTitle}
          leftButton={{
            icon: 'bars',
            onPress: () => this.menu!.open()
          }}
        />
        <View style={styles.container}>{children}</View>
      </Menu>
    );
  };

  renderDesktop = () => {
    const {
      title,
      logoHeader,
      greeting,
      menu,
      onMenuPress,
      currentMenuPath,
      children
    } = this.props;

    const styles = this.getDesktopStyles();

    return (
      <>
        <HeaderDesktop title={title} logo={logoHeader} greeting={greeting} />
        <View style={styles.container}>
          <MenuDesktop
            menu={menu}
            headerHeight={HeaderDesktop.height}
            onMenuPress={onMenuPress}
            currentMenuPath={currentMenuPath}
          />
          <View style={styles.content}>{children}</View>
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
