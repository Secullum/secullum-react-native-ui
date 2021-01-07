import * as React from 'react';
import { getTheme } from '../modules/theme';
import { HeaderButton } from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { isTablet } from '../modules/layout';

export interface HeaderDesktopProperties {
  logo: () => React.ReactNode;
  greeting?: string;
  rightButton?: HeaderButton;
}

export class HeaderDesktop extends React.Component<HeaderDesktopProperties> {
  static height = 60;

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.backgroundColor2,
        height: HeaderDesktop.height,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 0.6,
        shadowRadius: 20,
        shadowColor: theme.shadowColor1
      },
      greeting: {
        color: theme.textColor2,
        fontSize: 18,
        fontFamily: 'Roboto',
        marginLeft: 'auto',
        marginRight: 20
      },
      button: {
        padding: isTablet() ? 14 : 10
      },
      counterContainer: {
        position: 'absolute',
        backgroundColor: theme.counterBackgroundColor,
        height: isTablet() ? 20 : 15,
        width: isTablet() ? 20 : 15,
        top: 5,
        left: 18,
        borderRadius: 50
      },
      counterText: {
        textAlign: 'center',
        color: theme.counterTextColor,
        fontSize: isTablet() ? 15 : 10
      },
      logoImage: {
        marginLeft: 10,
        width: 240
      }
    });

    return styles;
  };

  renderRightButton = (button: HeaderButton) => {
    const styles = this.getStyles();
    const theme = getTheme();

    const icon = (
      <>
        <FontAwesome
          nativeID={button.nativeID}
          name={button.icon}
          size={isTablet() ? 30 : 20}
          color={button.disabled ? theme.textColor1 : theme.textColor3}
        />
        {button.counter ? (
          <View style={styles.counterContainer}>
            <Text
              nativeID={`${button.nativeID}-counter`}
              style={styles.counterText}
            >
              {button.counter}
            </Text>
          </View>
        ) : null}
      </>
    );

    if (button.disabled) {
      return <View style={styles.button}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={button.onPress} style={styles.button}>
        {icon}
      </TouchableOpacity>
    );
  };

  render() {
    const { logo, greeting, rightButton } = this.props;
    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        <View style={styles.logoImage}>{logo()}</View>
        {greeting && (
          <Text nativeID="app-greeting-message" style={styles.greeting}>
            {greeting}
          </Text>
        )}
        {rightButton && this.renderRightButton(rightButton)}
      </View>
    );
  }
}
