import React from 'react';
import {View, Text} from 'react-native';
import { QuizFieldWrapper, QuizInputWrapper } from '../../FirstQuizScreen/components';
import { PlaceholderText, Line } from '../../../components';
import moment from 'moment';
import { colors } from '../../../constants';


export const Specialization = ({specList,educations})=>{
  
  return (
    <View style={{marginTop:20,width: '90%',alignSelf: 'center'}}>
        <View style={{borderBottomWidth:1,paddingBottom:15,borderColor:colors.halfTransparentColorPrimary}}>
          <Text style={{fontSize:16,fontWeight:'600'}}>
            Специализация
          </Text>
        </View>
      
        <View style={{marginTop:15,marginBottom:20}}>
          { specList ? (specList.map(el=>(<Text key={el}>{el}</Text>)) ) : null }
        </View>

        <View style={{borderBottomWidth:1,paddingBottom:15,borderColor:colors.halfTransparentColorPrimary,marginBottom:15}}>
          <Text style={{fontSize:16,fontWeight:'600'}}>
            Образование
          </Text>
        </View>

        { educations 
          ? (educations.map(el=>(
            <View key={el._id} style={{marginBottom:15}}>
              <Text>{el.university}</Text>
              <Text>{el.specialty}</Text>
            </View>
            )))
          : null
        }
    </View>
  );
}