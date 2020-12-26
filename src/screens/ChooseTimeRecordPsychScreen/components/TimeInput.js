import React from 'react';
import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import momentLocale from '../../../constants/momentLocale';
import { colors } from '../../../constants';
 
export const TimeInput = ({
  onConfirm,
  value,
  toggleVisible,
  disabled,
  ...rest
}) => {
  const width=Dimensions.get('window').width-40;
  const timeFormat=moment(value).format('HH:mm')
  const dateFormat=moment(value).format('ddd, D MMMM');
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return (
    <View style={{marginBottom:15}}>
      <TouchableOpacity
        disabled={ disabled }
        onPress={ () => toggleVisible(true) }
      >
        <View pointerEvents='none' style={{backgroundColor:colors.background,width,paddingVertical:10,alignItems:'center',borderRadius:25}}>
          <TextInput 
            value={value ? timeFormat : value}
            style={{fontSize:30,fontWeight:'300'}}
          />
          <TextInput
            value={value ? dateFormat : value}
            style={{fontSize:14,fontWeight:'300'}}
          />
        </View>
      </TouchableOpacity>
      <DateTimePicker
        {...rest}
        titleIOS=""
        confirmTextIOS="Ок"
        cancelTextIOS="Отмена"
        mode="datetime"
        datePickerModeAndroid="spinner"
        timePickerModeAndroid="spinner"
        locale="ru-RU"
        date={ value ? new Date(value) : currentDate }
        onCancel={ () => toggleVisible(false) }
        onConfirm={ date => {
          onConfirm(moment(date).format());
          toggleVisible(false);
        }}
      />
    </View>
  );
}