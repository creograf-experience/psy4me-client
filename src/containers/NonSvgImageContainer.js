import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import { ImageWrapper } from '../components';


export const NonSvgImageContainer = ({ flex, image }) => (
  <ImageWrapper style={{ flex }}>
    <Image
      style={{ width: scale(100), height: verticalScale(100) }}
      source={image}
    />
  </ImageWrapper>
);

NonSvgImageContainer.propTypes = {
  flex: PropTypes.number,
};

NonSvgImageContainer.defaultProps = {
  flex: 1,
};
