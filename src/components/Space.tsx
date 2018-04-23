import * as React from 'react';
import { View } from 'react-native';

export interface SpaceProperties {
  height?: number;
  width?: number;
}

export class Space extends React.Component<SpaceProperties> {
  static defaultProps = {
    height: 16
  };

  render() {
    const { height, width } = this.props;

    return <View style={{ height, width }} />;
  }
}
