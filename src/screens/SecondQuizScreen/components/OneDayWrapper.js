import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';


export const UnpickedDayWrapper = styled.TouchableOpacity`
  height: ${scale(30)};
  width: ${scale(30)};
  border-radius: ${scale(10)};
  align-items: center;
  justify-content: center;
`;

export const PickedDayWrapper = styled(UnpickedDayWrapper)`
  background-color: ${colors.translucentGreen};
`;
