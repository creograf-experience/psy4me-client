import React from 'react';
import PropTypes from 'prop-types';

import { colors } from '../constants';
import { ExclamationErrorBorder, ErrorText } from '../components';


export const ExclamationError = ({ error }) => (
  error
    ? (
      <ExclamationErrorBorder>
        <ErrorText>!</ErrorText>
      </ExclamationErrorBorder>
    ) : (
      <ExclamationErrorBorder style={{ borderColor: 'transparent'}} />
    )
);

ExclamationError.propTypes = {
  error: PropTypes.string,
}

ExclamationError.defaultProps = {
  error: '',
}
