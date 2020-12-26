import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TextField, CommonFieldFrame } from '../components';


type Props = {};

export class EmptyField extends PureComponent<Props> {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      value: value || '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      const { value } = nextProps;

      this.setState({
        value,
      });
    }
  }

  render() {
    const { onChangeText } = this.props;
    const { value } = this.state;

    return (
      <CommonFieldFrame style={{width: '100%'}}>
        <TextField
          onChangeText={onChangeText}
          value={value}
          {...this.props}
        />
      </CommonFieldFrame>
    );
  }
}


EmptyField.defaultProps = {
  onChangeText: () => {},
};
