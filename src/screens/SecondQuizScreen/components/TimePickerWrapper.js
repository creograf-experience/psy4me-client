import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';


export const TimePickerWrapper = styled.TouchableOpacity`
  padding-horizontal: ${scale(25)};
  padding-vertical: ${scale(18)};
  background-color: ${colors.background};
  border-radius: ${scale(15)};
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;
