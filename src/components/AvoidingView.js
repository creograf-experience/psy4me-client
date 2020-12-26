import styled from 'styled-components';
import { Animated } from 'react-native';


export const AvoidingView = Animated.createAnimatedComponent(
  styled.View`
    height: 0;
  `
);
