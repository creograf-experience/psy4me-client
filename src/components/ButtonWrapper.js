import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../constants';
import { BodyText } from './BodyText';


export const ButtonWrapper = styled.TouchableOpacity`
  width: ${scale(300)};
  padding-vertical: ${scale(20)};
  align-items: center;
  justify-content: center;
  background-color: ${colors.colorPrimary};
  border-radius: ${scale(20)};
  border-style: solid;
  border-width: 1;
  border-color: ${colors.halfTransparentColorPrimary};
  align-self: center;
`;

export const ButtonText = styled(BodyText)``;
