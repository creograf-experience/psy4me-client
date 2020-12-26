import styled from 'styled-components';
import {
  verticalScale,
} from 'react-native-size-matters';

import {
  colors,
} from '../constants';


export const ExtendedFieldWrapper = styled.View`
  width: 90%;
  padding-vertical: ${verticalScale(10)};
  border-style: solid;
  border-bottom-width: 0.5;
  border-bottom-color: ${colors.halfTransparentColorPrimary};
`;
