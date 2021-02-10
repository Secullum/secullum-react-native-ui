import * as React from 'react';
import { getTheme } from '../modules/theme';
import { HeaderButton } from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle
} from 'react-native';
import { isTablet } from '../modules/layout';

export interface GreetingMessage {
  message: string;
  style?: StyleProp<TextStyle>;
}

export interface HeaderDesktopProperties {
  logo: () => React.ReactNode;
  title?: string;
  greeting?: GreetingMessage;
  rightButton?: HeaderButton;
  headerStyle?: StyleProp<TextStyle>;
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
      title: {
        color: theme.textColor4,
        fontSize: 24,
        fontFamily: theme.fontFamily3
      },
      greeting: {
        color: theme.textColor4,
        fontSize: 18,
        fontFamily: theme.fontFamily2,
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
          color={button.disabled ? theme.textColor1 : theme.textColor4}
          style={button.buttonStyle}
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

    const style = [styles.button];

    if (button.disabled) {
      return <View style={style}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={button.onPress} style={style}>
        {icon}
      </TouchableOpacity>
    );
  };

  render() {
    const { logo, title, greeting, rightButton, headerStyle } = this.props;
    const styles = this.getStyles();

    return (
      <View style={[styles.container, headerStyle]}>
        {logo()}
        {title && <Text style={styles.title}>{title}</Text>}
        {greeting && (
          <Text
            nativeID="app-greeting-message"
            style={[styles.greeting, greeting.style]}
          >
            {greeting.message}
          </Text>
        )}
        {rightButton && this.renderRightButton(rightButton)}
      </View>
    );
  }
}
