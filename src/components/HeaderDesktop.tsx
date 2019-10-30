import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native';

export interface HeaderDesktopProperties {
  logo: ImageSourcePropType;
  title: string;
  greeting?: string;
}

export class HeaderDesktop extends React.Component<HeaderDesktopProperties> {
  static height = 60;

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.backgroundColor3,
        height: HeaderDesktop.height,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 0.6,
        shadowRadius: 20,
        shadowColor: theme.shadowColor1
      },
      logo: {
        height: 40,
        width: 40,
        marginHorizontal: 20
      },
      title: {
        color: theme.textColor4,
        fontSize: 24,
        fontFamily: 'MankSans-Medium'
      },
      greeting: {
        color: theme.textColor4,
        fontSize: 18,
        fontFamily: 'Lato-Regular',
        marginLeft: 'auto',
        marginRight: 20
      }
    });

    return styles;
  };

  render() {
    const { logo, title, greeting } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
        {greeting && (
          <Text nativeID="app-greeting-message" style={styles.greeting}>
            {greeting}
          </Text>
        )}
      </View>
    );
  }
}
