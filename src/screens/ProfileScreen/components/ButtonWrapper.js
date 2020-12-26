import styled from 'styled-components';
import { verticalScale } from 'react-native-size-matters';


export const ButtonWrapper = styled.View`
  height: 100;
  padding-vertical: ${verticalScale(10)};
  align-items: center;
  justify-content: space-around;
`;
