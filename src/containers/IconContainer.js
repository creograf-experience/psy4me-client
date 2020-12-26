import React from 'react';
//import Image from 'react-native-remote-svg';
import { Image } from 'react-native'
import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import { IconWrapper } from '../components';

import phoneIcon from '../../assets/images/icons/phoneIcon.png';
import keyholeIcon from '../../assets/images/icons/keyholeIcon.png';
import cameraIcon from '../../assets/images/icons/cameraIcon.png';
import selectArrowIcon from '../../assets/images/icons/selectArrowIcon.png';
import vkIcon from '../../assets/images/icons/vkIcon.png';
import instagramIcon from '../../assets/images/icons/instagramIcon.png';
import facebookIcon from '../../assets/images/icons/facebookIcon.png';
import addIcon from '../../assets/images/icons/addIcon.png';
import binIcon from '../../assets/images/icons/binIcon.png';
import dotsIcon from '../../assets/images/icons/dotsIcon.png';
import profileIcon from '../../assets/images/icons/profileIcon.png';
import clientsIcon from '../../assets/images/icons/clientsIcon.png';
import consultationIcon from '../../assets/images/icons/consultationIcon.png';
import chatIcon from '../../assets/images/icons/chatIcon.png';
import closeIcon from '../../assets/images/icons/closeIcon.png';

const images = {
  phoneIcon: {
    img: phoneIcon,
    aspectRatio: 1,
  },
  keyholeIcon: {
    img: keyholeIcon,
    aspectRatio: 1,
  },
  cameraIcon: {
    img: cameraIcon,
    aspectRatio: 1,
  },
  selectArrowIcon: {
    img: selectArrowIcon,
    aspectRatio: 1,
  },
  vkIcon: {
    img: vkIcon,
    aspectRatio: 1,
  },
  instagramIcon: {
    img: instagramIcon,
    aspectRatio: 1,
  },
  facebookIcon: {
    img: facebookIcon,
    aspectRatio: 1,
  },
  addIcon: {
    img: addIcon,
    aspectRatio: 1,
  },
  binIcon: {
    img: binIcon,
    aspectRatio: 1,
  },
  dotsIcon: {
    img: dotsIcon,
    aspectRatio: 1,
  },
  profileIcon: {
    img: profileIcon,
    aspectRatio: 1,
  },
  clientsIcon: {
    img: clientsIcon,
    aspectRatio: 1,
  },
  consultationIcon: {
    img: consultationIcon,
    aspectRatio: 1,
  },
  chatIcon: {
    img: chatIcon,
    aspectRatio: 1,
  },
  closeIcon: {
    img: closeIcon,
    aspectRatio: 1
  }
};

export const IconContainer = ({
  name, size, style, active, ...otherProps
}) => {
  const image = images[name];
  const wrapperStyle = size ? { height: scale(size) } : { flex: 1 };
  const src = !active ? image.img : image.active || image.img;

  return (
    <IconWrapper style={[wrapperStyle, style]} aspectRatio={image.aspectRatio}>
      <Image
        source={src}
        style={{width:22,height:22,resizeMode:'contain'}}
        {...otherProps}
      />
    </IconWrapper>
  );
};

IconContainer.defaultProps = {
  name: 'phoneIcon',
};
