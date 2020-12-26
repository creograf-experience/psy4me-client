import styled from 'styled-components';

import { colors } from '../constants';


export const CheckButtonWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20;
`;

export const CheckWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


export const CheckTextWrapper = styled.View`
  flex: 5;
  justify-content: center;
`;

export const CheckBorder = styled.TouchableOpacity`
  width: 27;
  height: 27;
  border-width: 1;
  border-style: solid;
  border-color: ${colors.halfTransparentColorPrimary}
  border-radius: 10;
  align-items: center;
  justify-content: center;
`;

export const PickedCheckBorder = styled(CheckBorder)`
  background-color: ${colors.transparentColorPrimary}
`;

export const PickMark = styled.View`
  width: 13;
  height: 13;
  background-color: ${colors.colorPrimary}
  border-radius: 10;
`;
