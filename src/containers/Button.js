import React from 'react';
import PropTypes from 'prop-types';

import { ButtonText, ButtonWrapper } from '../components';
import { colors } from '../constants';


const colorSets = {
  primary: () => ({
    main: colors.colorPrimary,
    text: colors.buttonTextPrimary,
  }),
  secondary: () => ({
    main: colors.transparentColorPrimary,
    text: colors.colorPrimary,
  }),
  third: () => ({
    main: colors.translucentGreen,
    text: colors.black,
  }),
  selectedRadio: () => ({
    main: colors.selectedRadioColor,
    text: colors.buttonTextPrimary,
  }),
  unselectedRadio: () => ({
    main: colors.background,
    text: colors.textColorPrimary,
  }),
};

export const Button = ({
  type,
  text,
  onPress,
  ...otherProps
}) => (
  <ButtonWrapper
    style={{ backgroundColor: colorSets[type]().main }}
    onPress={onPress}
    {...otherProps}
  >
    <ButtonText
      style={{ color: colorSets[type]().text, textAlign: 'center' }}
    >
      {text}
    </ButtonText>
  </ButtonWrapper>
);

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  text: 'Text',
  onPress: () => {},
  type: 'primary',
};
