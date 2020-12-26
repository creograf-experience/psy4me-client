import React, { PureComponent } from 'react';

import {
  TouchableInputWrapper,
  PointerHandlerWrapper,
  RightAlignedInput
} from '../components';


type Props = {};

export class RightAlignedField extends PureComponent<Props> {
  state = {
    text: '',
  }

  handleChange = text => {
    if (this.props.keyboardType === 'number-pad') {
      text = text.replace(/[^0-9]/g, '');
    } else if (this.props.keyboardType === 'default') {
      text = text.replace(/[^a-zа-я\-\s]/gi, '');
    }

    this.setState({ text });
    this.props.onChange(text);
  }

  focus = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  assignRef = inputRef => {
    if (inputRef) {
      this.inputRef = inputRef;
    }
  }

  render() {
    return (
      <TouchableInputWrapper
        activeOpacity={1}
        onPress={this.focus}
      >
        <PointerHandlerWrapper pointerEvents="none">
          <RightAlignedInput
            value={this.state.text}
            ref={inputRef => this.assignRef(inputRef)}
            onChangeText={this.handleChange}
            {...this.props}
          />
        </PointerHandlerWrapper>
      </TouchableInputWrapper>
    );
  }
}

RightAlignedField.defaultProps = {
  keyboardType: 'default',
}
