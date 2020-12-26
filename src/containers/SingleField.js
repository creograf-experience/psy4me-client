import React, { PureComponent } from 'react';


import {
  IconContainer,
  ExclamationError,
} from '.';
import {
  TextField,
  CommonFieldFrame,
} from '../components';


type Props = {}

export class SingleField extends PureComponent<Props> {
  state = {
    text: this.props.value || '',
  }

  handleChange = text => {
    if (text[0] === '8' || text[1] === '8') {
      text = text.replace('8', '7');
    }
    if (this.props.keyboardType === 'phone-pad') {
      if (text[0] !== '+') {
        text = '+' + text;
      }
      text = text[0] + text.slice(1).replace(/[^0-9]/g, '');
    }

    this.setState({ text });
    this.props.onChange(text);
  }

  render() {
    return (
      <CommonFieldFrame>
        {this.props.icon && <IconContainer name={this.props.icon} />}
        <TextField
          value={this.state.text}
          placeholder={this.props.placeholder}
          onChangeText={this.handleChange}
          {...this.props}
        />
        <ExclamationError error={this.props.error} />
      </CommonFieldFrame>
    );
  }
}

SingleField.defaultProps = {
  placeholder: 'Text',
  onChange: () => {},
};
