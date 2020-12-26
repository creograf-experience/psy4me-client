import styled from 'styled-components';

import { colors } from '../../../constants';


export const BinWrapper = styled.View`
  flex: 1;
  border-style: solid;
  border-left-width: 0.5;
  border-left-color: ${colors.halfTransparentColorPrimary}
  align-items: center;
  justify-content: center;
`;
