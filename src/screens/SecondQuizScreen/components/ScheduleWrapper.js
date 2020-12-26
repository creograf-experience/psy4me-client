import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';


export const ScheduleWrapper = styled.View`
  width: 100%;
  height: ${scale(200)};
  border-radius: ${scale(35)};
  background-color: ${colors.transparentColorPrimary};
  padding-vertical: ${scale(20)};
  padding-horizontal: ${scale(15)};
  margin-vertical: ${scale(20)};
  align-items: center;
`;
