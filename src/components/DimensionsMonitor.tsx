import * as React from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';

export interface DimensionsMonitorProperties {
  children?: (dimensionsInfo: { isDesktop: boolean }) => React.ReactNode;
  onDimensionChange?: (isDesktop: boolean) => void;
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
    const isDesktop = this.isDesktop(window);

    this.setState({ isDesktop });

    if (this.props.onDimensionChange && isDesktop !== this.state.isDesktop) {
      this.props.onDimensionChange(isDesktop);
    }
  };

  isDesktop = (size: ScaledSize) => {
    const largura = Platform.OS === 'web' ? window.innerWidth : size.width;

    return largura >= 1024;
  };

  render() {
    if (!this.props.children) {
      return null;
    }

    return this.props.children({ isDesktop: this.state.isDesktop });
  }
}
