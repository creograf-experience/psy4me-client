import styled from 'styled-components';

import { colors } from '../constants';


export const TwoFieldsWrapper = styled.View`
  margin-right: 25;
  margin-left: 25;
  margin-top: 15;
  margin-bottom: 25;
  height: 100;
  background-color: ${colors.background};
  border-radius: 30;
`;

export const ThreeFieldsWrapper = styled(TwoFieldsWrapper)`
  height: 150;
`;
