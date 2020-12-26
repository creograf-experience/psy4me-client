import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';


export const SquareFieldFrame = styled.View`
  width: ${scale(60)};
  height: ${scale(60)};
  border-color: ${colors.colorPrimary};
  border-radius: 20;
  border-style: solid;
  border-width: 1;
`;
