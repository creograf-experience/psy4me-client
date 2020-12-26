import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import {
  TextField,
  AuthFieldWrapper,
} from '../components';
import { IconContainer }  from './IconContainer';
import { ExclamationError } from './ExclamationError';

type Props = {}

export class AuthField extends PureComponent<Props> {
  state = {
    text: '',
  }

  handleChange = text => {
    if (text[0] === '8' || text[1] === '8') {
      text = text.replace('8', '7');
    }
    if (this.props.keyboardType === 'phone-pad') {
      if (text[0] != '+') {
        text = '+' + text;
      }
      text = text[0] + text.slice(1).replace(/[^0-9]/g, '');
    }

    this.setState({ text });
    this.props.onChange(text);
  }

  render() {
    return (
      <AuthFieldWrapper>
        {this.props.icon && <IconContainer name={this.props.icon} />}
        <TextField
          value={this.state.text}
          placeholder={this.props.placeholder}
          onChangeText={this.handleChange}
          {...this.props}
        />
        <ExclamationError error={this.props.error} />
      </AuthFieldWrapper>
    );
  }
}

AuthField.defaultProps = {
  placeholder: 'Text',
  onChange: () => {},
};
