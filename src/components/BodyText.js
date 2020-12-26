import styled from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { colors } from '../constants';

export const BodyText = styled.Text`
  font-size: ${moderateScale(16)};
  font-weight: 700;
  color: ${colors.buttonTextPrimary};
`;

export const BlueBodyText = styled(BodyText)`
  color: ${colors.colorPrimary};
`;
