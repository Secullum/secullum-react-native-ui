import * as React from 'react';
import ElevatedView from 'react-native-elevated-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { getTestID } from '../modules/test';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
  Platform
} from 'react-native';

export interface CardHeaderProperties {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  nativeID?: string;
  numberOfLines?: number;
  onHelpPress?: () => void;
  children?: React.ReactNode;
}

export class CardHeader extends React.Component<CardHeaderProperties> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        padding: 16
      },
      title: {
        color: theme.textColor1,
        fontFamily: theme.fontFamily1,
        fontSize: isTablet() ? 22 : 18,
        marginRight: 10
      },
      help: {
        position: 'absolute',
        right: 5,
        top: 5
      },
      helpIcon: {
        fontSize: isTablet() ? 24 : 20,
        color: '#6d819c'
      }
    });

    return styles;
  };
  render() {
    const {
      title,
      titleStyle,
      onHelpPress,
      nativeID,
      containerStyle,
      numberOfLines
    } = this.props;

    const styles = this.getStyles();

    return (
      <View
        nativeID={nativeID}
        testID={getTestID(nativeID)}
        style={[styles.container, containerStyle]}
      >
        <Text style={[styles.title, titleStyle]} numberOfLines={numberOfLines}>
          {title}
        </Text>
        {onHelpPress && (
          <TouchableOpacity onPress={onHelpPress} style={styles.help}>
            <FontAwesome name="question-circle" style={styles.helpIcon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export class CardFooter extends React.Component<ViewProps> {
  render() {
    const { children, nativeID, ...otherProps } = this.props;

    return (
      <View
        nativeID={nativeID}
        testID={getTestID(nativeID)}
        style={[cardFooterStyles.container]}
        {...otherProps}
      >
        {children}
      </View>
    );
  }
}

export class CardSection extends React.Component<ViewProps> {
  render() {
    const { children, style, nativeID, ...otherProps } = this.props;

    return (
      <View
        nativeID={nativeID}
        testID={getTestID(nativeID)}
        style={[cardSectionStyles.container, style]}
        {...otherProps}
      >
        {children}
      </View>
    );
  }
}

export class CardModal extends React.Component<ViewProps> {
  render() {
    const { children, style, ...otherProps } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[{ padding: 16 }, style]}
        {...otherProps}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

export interface CardProperties extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export class Card extends React.Component<CardProperties> {
  static Header = CardHeader;
  static Section = CardSection;
  static Footer = CardFooter;
  static Modal = CardModal;

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        borderRadius: 3,
        backgroundColor: theme.backgroundColor1,
        shadowOpacity: 0.15,
        shadowRadius: 5
      },
      cardChild: {
        borderTopColor: theme.borderColor1,
        borderTopWidth: 1
      }
    });

    return styles;
  };

  render() {
    const { children, style, ...otherProps } = this.props;

    const styles = this.getStyles();

    const childrenMapped = React.Children.map(children, (child, index) => {
      if (index === 0 || !child) {
        return child;
      }

      return (
        <>
          <View style={styles.cardChild} />
          {child}
        </>
      );
    });

    return Platform.OS == 'web' ? (
      <View style={[styles.container, style]} {...otherProps}>
        {childrenMapped}
      </View>
    ) : (
      <ElevatedView
        elevation={5}
        // @ts-ignore : The component uses a different version of typing
        style={[styles.container, style]}
        {...otherProps}
      >
        {childrenMapped}
      </ElevatedView>
    );
  }
}

const cardSectionStyles = StyleSheet.create({
  container: {
    padding: 16
  }
});

const cardFooterStyles = StyleSheet.create({
  container: {
    padding: 16
  }
});
