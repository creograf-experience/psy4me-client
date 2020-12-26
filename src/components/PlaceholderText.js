import styled from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { colors } from '../constants';

export const PlaceholderText = styled.Text`
  font-size: ${moderateScale(14)};
  font-weight: 400;
  color: ${colors.hintColor};
`;

export const PlainText = styled(PlaceholderText)`
  color: ${colors.textColorPrimary};
`;


export const LargePlainText = styled(PlainText)`
  font-size: ${moderateScale(18)};
`;
