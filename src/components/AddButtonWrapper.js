import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { ButtonWrapper } from './ButtonWrapper';
import { colors } from '../constants';


export const AddButtonWrapper = styled(ButtonWrapper)`
  width: ${scale(100)};
  padding-vertical: null;
  height: ${scale(100)};
  background-color: ${colors.transparentColorPrimary};
  border-radius: 70;
  justify-content: space-evenly;
`;
