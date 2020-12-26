import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../constants';

export const HintText = styled.Text`
  font-size: ${scale(14)};
  font-weight: 400;
  color: ${colors.hintColor};
  text-align: center;
  margin-left: 10;
  margin-right: 10;
`;

export const HintPsychText = styled(HintText)`
  font-size: ${scale(16)};
  font-weight: 500;
`;
