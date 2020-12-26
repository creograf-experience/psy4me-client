import styled from 'styled-components';
import { Animated } from 'react-native';

import { colors } from '../constants';


export const ContainerWrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const AvoidingContainerWrapper = Animated.createAnimatedComponent(
  styled.View`
    width: 100%;
    height: 100%;
    background-color: ${colors.background};
    position: absolute;
  `
);
