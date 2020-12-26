import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { BodyText, TextButtonWrapper } from '../components';
import { colors } from '../constants';


export const TextButton = ({onPress, textColor, buttonText}) => (
  <TextButtonWrapper
    onPress={onPress}
  >
    <BodyText style={{ color: textColor }}>
      {buttonText}
    </BodyText>
  </TextButtonWrapper>
);

TextButton.propTypes = {
  buttonText: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

TextButton.defaultProps = {
  buttonText: 'Text',
  textColor: colors.textColorPrimary,
  onPress: () => {},
};
