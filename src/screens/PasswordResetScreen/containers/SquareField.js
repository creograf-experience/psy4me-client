import React from 'react';
import PropTypes from 'prop-types';

import { OneCharField } from '../../../components';
import { SquareFieldFrame } from '../components';


export const SquareField = ({
    onChangeText,
    reference,
    onKeyPress,
    selectionColor,
    ...otherProps
  }) => (
  <SquareFieldFrame>
    <OneCharField
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
      ref={reference}
      selectionColor={selectionColor}
      {...otherProps}
    />
  </SquareFieldFrame>
);

SquareField.propTypes = {
  onChangeText: PropTypes.func,
  onKeyPress: PropTypes.func,
};

SquareField.defaultProps = {
  onChangeText: () => {},
  onKeyPress: () => {},
  selectionColor: 'transparent'
};
