import * as React from 'react';
import { TextBox, TextBoxProperties } from './TextBox';
import { Platform } from 'react-native';

import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp
} from 'react-native-masked-text';

export type MaskType = TextInputMaskTypeProp;
export type MaskOptions = TextInputMaskOptionProp;

export interface TextBoxMaskProperties extends TextBoxProperties {
  type: MaskType;
  options?: MaskOptions;
}

export class TextBoxMask extends React.Component<TextBoxMaskProperties> {
  render() {
    const { type, options, ...textBoxProps } = this.props;

    return (
      <TextBox
        {...textBoxProps}
        renderInput={props => {
          const { ref, ...otherProps } = props;

          return Platform.OS === 'web' ? (
            // @ts-ignore :Waiting for typing https://github.com/benhurott/react-native-masked-text/pull/74
            <TextInputMask {...otherProps} type={type} options={options} />
          ) : (
            // @ts-ignore :Waiting for typing https://github.com/benhurott/react-native-masked-text/pull/74
            <TextInputMask
              {...otherProps}
              // @ts-ignore : The component uses a different version of typing
              refInput={ref}
              type={type}
              options={options}
            />
          );
        }}
      />
    );
  }
}
