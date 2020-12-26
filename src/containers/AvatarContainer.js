import React from 'react';
import {
  Image,
} from 'react-native';

import {
  AvatarWrapper,
  Avatar,
} from '../components';
import { IconContainer } from './IconContainer';


export const AvatarContainer = ({ avatar }) => (
  <AvatarWrapper>
    {
      avatar ? (
        <Avatar
          source={avatar}
        />
      ) : (
        <IconContainer
          name="cameraIcon"
        />
      )
    }
  </AvatarWrapper>
);

AvatarWrapper.propTypes = {
  avatar: Image.propTypes.source,
};
