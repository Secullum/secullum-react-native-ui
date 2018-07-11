import * as React from 'react';
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp
} from 'react-native-masked-text';
import { TextBox, TextBoxProperties } from './TextBox';

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

          return (
            <TextInputMask
              {...otherProps}
              // Waiting for typing
              // https://github.com/benhurott/react-native-masked-text/pull/74
              // @ts-ignore
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
