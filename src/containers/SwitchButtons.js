import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { colors } from '../constants';
import { Line } from '../components';

export const SwitchButtons = ({onPressRecord,onPressProfilePsych,onPressChat}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPressProfilePsych} style={[styles.btnLayout,onPressProfilePsych ? null : styles.current]}>
      <Text style={{fontSize:16,color:onPressProfilePsych ? null : colors.hintColor}}>Профиль</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressRecord} style={[styles.btnLayout,onPressRecord ? null : styles.current]}>
      <Text style={{fontSize:16,color:onPressRecord ? null : colors.hintColor}}>Записаться</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressChat} style={[styles.btnLayout,onPressChat ? null : styles.current]}>
      <Text style={{fontSize:16,color:onPressChat ? null : colors.hintColor}}>Чат</Text>
    </TouchableOpacity>
  </View>
);

const styles=StyleSheet.create({
  btnLayout:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    paddingTop:7,
    paddingBottom:7
  },
  current:{
    borderBottomWidth:3,
    borderColor:colors.hintColor
  },
  container:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    borderBottomWidth:1,
    borderColor:colors.halfTransparentColorPrimary
  }
})