import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
} from '../../../containers';
import {
  RadioButtonWrapper,
} from '../components';


export const RadioButton = ({ title, picked, onPress }) => (
  <RadioButtonWrapper>
    {
      picked
        ? (
          <Button
            text={title}
            type="selectedRadio"
            onPress={onPress}
          />
        ) : (
          <Button
            text={title}
            type="unselectedRadio"
            onPress={onPress}
          />
        )
    }
  </RadioButtonWrapper>
);


RadioButton.propTypes = {
  title: PropTypes.string,
  picked: PropTypes.bool,
  onPress: PropTypes.func,
};

RadioButton.defaultProps = {
  title: 'Radio',
  picked: false,
  onPress: () => {},
};
