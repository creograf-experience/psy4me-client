import React, { PureComponent } from 'react';

import {
  PlaceholderText,
  PointerHandlerWrapper,
  ErrorTextAbsolute,
  ExtraFieldWrapper,
} from '../components';
import {
  EmptyField,
} from '.';


type Props = {};

export class ExtraField extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      text: value || '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      const { value } = nextProps;

      this.setState({
        text: value,
      });
    }
  }

  handleChange = text => {
    if (this.props.keyboardType === 'number-pad') {
      text = text.replace(/[^0-9]/g, '');
    }

    this.setState({ text });
    this.props.onChange(text);
  };

  render() {
    var { placeholder, keyboardType, maxLength } = this.props;
    var { text } = this.state;

    return (
      <ExtraFieldWrapper activeOpacity={1}>
        <ErrorTextAbsolute>{this.props.error}</ErrorTextAbsolute>
        <PointerHandlerWrapper pointerEvents='box-none' >
          <EmptyField
            placeholder={placeholder}
            onChangeText={this.handleChange}
            keyboardType={keyboardType}
            value={text}
            maxLength={maxLength}
          />
        </PointerHandlerWrapper>
      </ExtraFieldWrapper>
    );
  }
}

ExtraField.defaultProps = {
  placeholder: 'Text',
};
