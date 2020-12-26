import React from 'react';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { AddButtonWrapper } from '../components';
import { IconContainer } from './IconContainer';
import {
  colors,
  mediaHost,
} from '../constants';


const sizes = {
  big: () => ({
    width: { width: scale(130) },
    height: { height: scale(130) },
    margin: {
      marginBottom: 50,
      marginTop: 25,
    },
    border: { borderRadius: scale(50) },
  }),
  small: () => ({
    width: { width: scale(80) },
    height: { height: scale(80) },
    border: { borderRadius: scale(30) },
  }),
  smallMargin: () => ({
    width: { width: scale(80) },
    height: { height: scale(80) },
    margin: {
      marginLeft: scale(5),
      marginRight: scale(14.5),
    },
    border: { borderRadius: scale(30) },
  }),
};

const AddButtonWrapperAnimated = Animatable.createAnimatableComponent(AddButtonWrapper);

export const AddButton = ({
    type,
    text,
    onPress,
    icon,
    image,
    animated,
    deleted,
    color,
    userID,
  }) => (
  <AddButtonWrapperAnimated
    style={[
      sizes[type]().width,
      sizes[type]().height,
      sizes[type]().margin,
      sizes[type]().border,
      color && { backgroundColor: color },
    ]}
    onPress={onPress}
    animation={
      deleted
        ? 'zoomOut'
        : animated
          ? 'pulse'
          : false
    }
    iterationCount={deleted ? 1 : 'infinite'}
  >
    { image ? (
      <Image source={{ uri: image }} style={[{ width: '100%', height: '100%' }, sizes[type]().border]} />
    ) : userID ? (
      <Image
        source={{ uri: `${mediaHost}/client/${userID}/avatar/avatar_${userID}.jpg` }}
        style={[{ width: '100%', height: '100%' }, sizes[type]().border]}
      />
    ) : (
      <IconContainer
        name={icon}
        size={20}
      />
    )
    }
  </AddButtonWrapperAnimated>
);

AddButton.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
};

AddButton.defaultProps = {
  onPress: () => {},
  type: 'primary',
};
