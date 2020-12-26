import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

import { ImageWrapper } from '../components';


export const ImageContainer = ({ flex, image, styleImage }) => (
  <ImageWrapper style={{ flex }}>
    <Image source={image} 
      style={styleImage}
    />
  </ImageWrapper>
);

ImageContainer.propTypes = {
  flex: PropTypes.number,
};

ImageContainer.defaultProps = {
  flex: 1,
};
