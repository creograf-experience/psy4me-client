import styled from 'styled-components';

import { colors } from '../constants';
import { HintText } from '.';


export const ErrorText = styled(HintText)`
  color: ${colors.errorColor};
`;

export const ErrorTextAbsolute = styled(ErrorText)`
  position: absolute;
  right: 0;
  top: 0;
`;
