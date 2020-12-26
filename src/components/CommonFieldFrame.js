import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../constants';


export const CommonFieldFrame = styled.View`
  width: ${scale(300)};
  height: ${scale(60)};
  border-color: ${colors.colorPrimary};
  border-radius: 30;
  flex-direction: row;
  align-items: center;
  border-style: solid;
  border-width: 1;
  margin-top: 10;
  align-self: center;
  padding-horizontal: ${scale(10)};
`;

export const BigFieldFrame = styled(CommonFieldFrame)`
  width: 100%;
  align-self: center;
  height: ${scale(180)};
`;

export const SecondQuizFieldFrame = styled(CommonFieldFrame)`
  border-radius: ${scale(20)};
  border-color: ${colors.halfTransparentColorPrimary};
  margin-top: 25;
`;

export const QuizBigFieldFrame = styled(CommonFieldFrame)`
  width: 100%;
  align-self: center;
  height: ${scale(240)};
  margin-right: 15;
`;
