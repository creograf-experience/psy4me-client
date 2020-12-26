import styled from 'styled-components';
import { scale } from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import { colors } from '../constants';


export const CallWrapper = styled.View`
  width: ${Dimensions.get('window').width - 20};
  height: ${scale(265)};
  background-color: ${colors.transparentColorPrimary};
  justify-content: center;
  align-items: center;
  margin-top: 10;
  margin-left: 10;
  margin-right: 10;
`;
