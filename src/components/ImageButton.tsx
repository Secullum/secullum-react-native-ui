import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

export interface ImageButtonProperties {
  icon: string;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  onPress: () => void;
  iconSize?: number;
  hitBoxSize?: number;
  nativeID?: string;
}

export class ImageButton extends React.Component<ImageButtonProperties> {
  render() {
    const {
      icon,
      style,
      iconColor,
      onPress,
      iconSize,
      hitBoxSize,
      nativeID
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={[styles.container, style]}
        hitSlop={
          hitBoxSize
            ? {
                top: hitBoxSize,
                bottom: hitBoxSize,
                left: hitBoxSize,
                right: hitBoxSize
              }
            : undefined
        }
      >
        <FontAwesome
          nativeID={nativeID}
          name={icon}
          size={iconSize || 20}
          color={iconColor || theme.textColor3}
        />
      </TouchableOpacity>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.borderColor1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  }
});
