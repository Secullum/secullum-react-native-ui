import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export interface FooterProperties {
  text: string;
  logoSource: any;
}

export class Footer extends React.Component<FooterProperties> {
  static height = 48;

  render() {
    const { text, logoSource } = this.props;

    return (
      <View style={styles.container}>
        <Image source={logoSource} style={styles.logo} />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: Footer.height,
    width: Footer.height
  },
  text: {
    marginLeft: 10,
    fontFamily: 'MankSans-Medium',
    fontSize: 18
  }
});
