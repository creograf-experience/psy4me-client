import styled from 'styled-components';

import { colors } from '../constants';


export const ExclamationErrorBorder = styled.View`
  border-radius: 100;
  width: 25;
  height: 25;
  border-style: solid;
  border-width: 1;
  border-color: ${colors.errorColor};
  align-items: center;
  justify-content: center;
  margin: 15px;
`;
