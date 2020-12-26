import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {
  HeaderText,
  HeaderWrapper,
  HeaderTextWrapper,
  RightHeaderWrapper,
  CentralHeaderWrapper,
  LeftHeaderWrapper,
  Line,
} from '../components';
import { DotsButton } from './DotsButton';
import { TextButton } from './TextButton';
import { colors } from '../constants';


export const Header = ({
  title,
  leftText,
  onLeftPress,
  rightText,
  onRightPress,
  dotsButton,
  closeButton
}) => (
  <HeaderWrapper>
    <HeaderTextWrapper>
      <LeftHeaderWrapper>
        {
          dotsButton
            ? (
              <DotsButton
                onPress={onLeftPress}
              />
            ) : (
              <TextButton
                buttonText={leftText}
                onPress={onLeftPress}
                textColor={colors.colorPrimary}
              />
            )
        }
      </LeftHeaderWrapper>
      <CentralHeaderWrapper>
        <HeaderText
          size="h4"
        >
          {title}
        </HeaderText>
      </CentralHeaderWrapper>
      <RightHeaderWrapper>
        {closeButton 
          ? (
            <TouchableOpacity
              onPress={onRightPress}
            >
              <Image
                source={require('../../assets/images/icons/closeIcon.png')}
                style={{width:15,height:15,marginBottom:10}}
              />
            </TouchableOpacity>  
          )
          : (
            <TextButton
              buttonText={rightText}
              onPress={onRightPress}
              textColor={colors.colorPrimary}
            />
          )
          }
      </RightHeaderWrapper>
    </HeaderTextWrapper>

    <Line />
  </HeaderWrapper>
);

Header.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
};

Header.defaultProps = {
  title: 'Title',
  leftText: '',
  rightText: '',
  onLeftPress: () => {},
  onRightPress: () => {},
};
