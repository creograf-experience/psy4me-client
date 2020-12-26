import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../constants';


export const AvatarWrapper = styled.View`
  width: ${scale(130)};
  padding-vertical: null;
  height: ${scale(130)};
  background-color: ${colors.transparentColorPrimary};
  border-radius: ${scale(50)};
  justify-content: center;
  align-items: center;
`;
