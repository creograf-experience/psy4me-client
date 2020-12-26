import styled from 'styled-components';

import { colors } from '../../../constants';


export const UnselectedDot = styled.View`
  height: 10;
  width: 10;
  border-style: solid;
  border-width: 1;
  border-color: ${colors.colorPrimary};
  border-radius: 100;
`;

export const SelectedDot = styled(UnselectedDot)`
  height: 12;
  width: 12;
  background-color: ${colors.colorPrimary};
`;
