import * as React from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export interface DimensionsMonitorProperties {
  children: (dimensionsInfo: { isDesktop: boolean }) => React.ReactNode;
}

export interface DimensionsMonitorState {
  isDesktop: boolean;
}

export class DimensionsMonitor extends React.Component<
  DimensionsMonitorProperties,
  DimensionsMonitorState
> {
  constructor(props: DimensionsMonitorProperties) {
    super(props);

    this.state = {
      isDesktop: this.isDesktop(Dimensions.get('window'))
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionsChange);
  }

  handleDimensionsChange = ({ window }: { window: ScaledSize }) => {
    this.setState({ isDesktop: this.isDesktop(window) });
  };

  isDesktop = (size: ScaledSize) => {
    return size.width >= 1024;
  };

  render() {
    return this.props.children({ isDesktop: this.state.isDesktop });
  }
}
