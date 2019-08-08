import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';

export interface HeaderButton {
  icon: string;
  disabled?: boolean;
  counter?: number;
  onPress: () => void;
}

export interface HeaderProperties {
  title: string;
  leftButton?: HeaderButton;
  rightButton?: HeaderButton;
}

export class Header extends React.Component<HeaderProperties> {
  static defaultProps = {
    leftButtonType: 'menu'
  };

  static height = isTablet() ? 65 : 50;

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      header: {
        backgroundColor: theme.backgroundColor3,
        height: isTablet() ? 65 : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      title: {
        color: theme.textColor4,
        fontFamily: 'Lato-Bold',
        fontSize: isTablet() ? 25 : 18,
        marginHorizontal: 35
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

  renderButton = (button: HeaderButton, type: 'left' | 'right') => {
    const styles = this.getStyles();
    const theme = getTheme();

    const icon = (
      <>
        <FontAwesome
          name={button.icon}
          size={isTablet() ? 30 : 20}
          color={button.disabled ? theme.textColor1 : theme.textColor4}
        />
        {button.counter ? (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{button.counter}</Text>
          </View>
        ) : null}
      </>
    );

    const style = [
      styles.button,
      type === 'left' ? { marginRight: 'auto' } : { marginLeft: 'auto' }
    ];

    if (button.disabled) {
      return <View style={style}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={button.onPress} style={style}>
        {icon}
      </TouchableOpacity>
    );
  };

  renderButtonInvisible = (type: 'left' | 'right') => {
    const styles = this.getStyles();

    const style = [
      styles.button,
      type === 'left' ? { marginRight: 'auto' } : { marginLeft: 'auto' }
    ];

    return <View style={style} />;
  };

  render() {
    const { title, leftButton, rightButton } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.header}>
        {leftButton
          ? this.renderButton(leftButton, 'left')
          : this.renderButtonInvisible('left')}
        <Text style={styles.title}>{title}</Text>
        {rightButton
          ? this.renderButton(rightButton, 'right')
          : this.renderButtonInvisible('right')}
      </View>
    );
  }
}
