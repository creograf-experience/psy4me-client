import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';


export const WeekDataWrapper = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${scale(20)};
  background-color: ${colors.background};
`;
