import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card } from './Card';
import { Space } from './Space';
import { getTheme } from '../modules/theme';
import { getTestID } from '../modules/test';
import { isTablet } from '../modules/layout';

export interface DetailsIcon {
  name: string;
  color: string;
  size: number;
  onPress?: () => void;
}

export interface DetailsLine {
  title?: string;
  value?: string;
  icons?: Array<DetailsIcon>;
  render?: () => React.ReactNode;
  nativeID?: string;
}

export interface DetailsProperties {
  title: string;
  titleNativeId?: string;
  lines: Array<DetailsLine>;
  lineTitleStyle?: StyleProp<TextStyle>;
  lineValueStyle?: StyleProp<TextStyle>;
}

export class Details extends React.Component<DetailsProperties> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      title: {
        fontFamily: theme.fontFamily1,
        fontSize: isTablet() ? 22 : 18,
        color: theme.textColor1
      },
      lineSection: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 45
      },
      lineSectionCustomRender: {
        padding: 0
      },
      lineText: {
        fontFamily: theme.fontFamily2,
        fontSize: isTablet() ? 18 : 14,
        color: theme.textColor1,
        minWidth: 40
      },
      lineValue: {
        textAlign: 'center'
      },
      lineTitle: {
        textAlign: 'left',
        flexShrink: 0
      },
      lineValueContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      lineValueIcon: {
        width: 25,
        textAlign: 'center'
      }
    });

    return styles;
  };

  renderIcon = (icon: DetailsIcon, index: number, lineNativeID?: string) => {
    const styles = this.getStyles();
    const iconNativeID = lineNativeID
      ? `${lineNativeID}-icon-${icon.name}`
      : icon.name;

    const fa = (
      <FontAwesome
        key={index}
        nativeID={lineNativeID && iconNativeID}
        testID={Platform.OS === 'web' ? icon.name : getTestID(iconNativeID)}
        name={icon.name}
        color={icon.color}
        size={icon.size}
        style={styles.lineValueIcon}
      />
    );

    if (icon.onPress) {
      return (
        <TouchableOpacity key={index} onPress={icon.onPress}>
          {fa}
        </TouchableOpacity>
      );
    }

    return fa;
  };

  renderLine = (line: DetailsLine, index: number) => {
    const styles = this.getStyles();

    const { lineTitleStyle, lineValueStyle } = this.props;
    const { title, value, icons, render, nativeID } = line;
    const labelNativeID = nativeID && `${nativeID}-label`;
    const valueNativeID = nativeID && `${nativeID}-value`;

    const sectionStyle = render
      ? styles.lineSectionCustomRender
      : styles.lineSection;

    const children = render ? (
      render()
    ) : (
      <>
        <Text
          nativeID={labelNativeID}
          testID={getTestID(labelNativeID)}
          style={[styles.lineText, styles.lineTitle, lineTitleStyle]}
        >
          {title}
        </Text>
        <View style={styles.lineValueContainer}>
          {icons &&
            icons.map((icon, iconIndex) =>
              this.renderIcon(icon, iconIndex, nativeID)
            )}
          <Text
            nativeID={valueNativeID}
            testID={getTestID(valueNativeID)}
            style={[styles.lineText, styles.lineValue, lineValueStyle]}
          >
            {value}
          </Text>
        </View>
      </>
    );

    return (
      <React.Fragment key={index}>
        <Space height={3} />
        <Card nativeID={nativeID}>
          <Card.Section style={sectionStyle}>{children}</Card.Section>
        </Card>
      </React.Fragment>
    );
  };

  render() {
    const { title, lines, titleNativeId } = this.props;
    const styles = this.getStyles();

    return (
      <>
        <Card>
          <Card.Section>
            <Text
              nativeID={titleNativeId}
              testID={getTestID(titleNativeId)}
              style={styles.title}
            >
              {title}
            </Text>
          </Card.Section>
        </Card>
        {lines.map(this.renderLine)}
      </>
    );
  }
}
