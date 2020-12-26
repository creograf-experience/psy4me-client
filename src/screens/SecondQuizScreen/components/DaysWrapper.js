import styled from 'styled-components';

import { colors } from '../../../constants';


export const DaysWrapper = styled.View`
  flex: 5;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom-color: ${colors.halfTransparentColorPrimary};
  border-style: solid;
  border-bottom-width: 0.5;
`;
