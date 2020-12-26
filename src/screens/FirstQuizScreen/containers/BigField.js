import React from 'react';
import PropTypes from 'prop-types';

import {
  PlaceholderText,
  BigTextField,
  BigFieldFrame,
  PointerHandlerWrapper,
} from '../../../components';
import { BigFieldWrapper } from '../components';


export const BigField = ({ placeholder, onChange, value }) => (
  <BigFieldWrapper activeOpacity={1}>
    <PointerHandlerWrapper pointerEvents='box-none' >
      <PlaceholderText>
        {placeholder}
      </PlaceholderText>

      <BigFieldFrame>
        <BigTextField
          multiline
          onChangeText={value => onChange(value)}
          value={value}
        />
      </BigFieldFrame>
    </PointerHandlerWrapper>
  </BigFieldWrapper>
);

BigField.propTypes = {
  placeholder: PropTypes.string,
};

BigField.defaultProps = {
  placeholder: 'Text',
};
