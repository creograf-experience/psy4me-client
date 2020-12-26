import React from 'react';
import {View, Text} from 'react-native';
import { QuizFieldWrapper, QuizInputWrapper } from '../../FirstQuizScreen/components';
import { PlaceholderText, Line } from '../../../components';
import moment from 'moment';


export const PsychAge = ({age})=>{
  const moment = require('moment');
  moment.suppressDeprecationWarnings = true;
  const year=moment().diff(age,'years');
  return (
    <QuizFieldWrapper activeOpacity={1}>
      <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
        <PlaceholderText>
          Возраст
        </PlaceholderText>
        <View style={{alignItems:'flex-end',flex:1}}>
          <Text>
            {year}
          </Text>
        </View>
      </View>
      <Line/>
    </QuizFieldWrapper>
  );
}