import * as React from 'react';

export interface DelayProperties {
  wait: number;
}

export interface DelayState {
  hidden: boolean;
}

export class Delay extends React.Component<DelayProperties, DelayState> {
  state: DelayState = {
    hidden: true
  };

  componentDidMount() {
    const { wait } = this.props;

    setTimeout(() => {
      this.setState({ hidden: false });
    }, wait);
  }

  render() {
    return this.state.hidden ? null : this.props.children;
  }
}
