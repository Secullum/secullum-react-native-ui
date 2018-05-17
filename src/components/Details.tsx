import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card } from './Card';
import { Space } from './Space';
import { getTheme } from '../modules/theme';

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
}

export interface DetailsProperties {
  title: string;
  lines: Array<DetailsLine>;
}

export class Details extends React.Component<DetailsProperties> {
  renderIcon = (icon: DetailsIcon, index: number) => {
    const fa = (
      <FontAwesome
        key={index}
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
    const { title, value, icons, render } = line;

    const sectionStyle = render
      ? styles.lineSectionCustomRender
      : styles.lineSection;

    const children = render ? (
      render()
    ) : (
      <>
        <Text style={styles.lineTitle}>{title}</Text>
        <View style={styles.lineValueContainer}>
          {icons && icons.map(this.renderIcon)}
          <Text style={styles.lineTitle}>{value}</Text>
        </View>
      </>
    );

    return (
      <React.Fragment key={index}>
        <Space height={3} />
        <Card>
          <Card.Section style={sectionStyle}>{children}</Card.Section>
        </Card>
      </React.Fragment>
    );
  };

  render() {
    const { title, lines } = this.props;

    return (
      <>
        <Card>
          <Card.Section>
            <Text style={styles.title}>{title}</Text>
          </Card.Section>
        </Card>
        {lines.map(this.renderLine)}
      </>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: theme.textColor1
  },
  lineSection: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45
  },
  lineSectionCustomRender: {
    padding: 0
  },
  lineTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: theme.textColor1,
    minWidth: 40,
    textAlign: 'left'
  },
  lineValueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lineValueIcon: {
    width: 25,
    textAlign: 'center'
  }
});
