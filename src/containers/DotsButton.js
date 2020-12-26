import React from 'react';
import PropTypes from 'prop-types';

import {
  DotsButtonWrapper,
} from '../components';
import { IconContainer } from './IconContainer';


export const DotsButton = ({ onPress }) => (
  <DotsButtonWrapper
    onPress={onPress}
  >
    <IconContainer
      name="dotsIcon"
      size={20}
    />
  </DotsButtonWrapper>
);


DotsButton.propTypes = {
  onPress: PropTypes.func,
};

DotsButton.defaultProps = {
  onPress: () => {},
};
