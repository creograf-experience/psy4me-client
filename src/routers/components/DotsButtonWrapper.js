import styled from 'styled-components';


import {
  scale,
  verticalScale,
} from 'react-native-size-matters';


export const DotsButtonWrapper = styled.TouchableOpacity`
  padding-top: ${verticalScale(30)};
  padding-horizontal: ${scale(15)};
  height: ${verticalScale(20)};
  align-self: flex-start;
`;
