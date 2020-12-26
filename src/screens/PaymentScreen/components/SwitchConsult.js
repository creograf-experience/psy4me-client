import React from 'react';
import { View, TouchableOpacity, TextInput, Dimensions, Text, Image, Platform, StyleSheet } from 'react-native';
import { colors } from '../../../constants';
 
export const SwitchConsult = ({
  soloCons,
  switchPress
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={soloCons ? true : false }
        onPress={switchPress}
        style={[styles.containerArrow,{backgroundColor:soloCons ? colors.colorPrimary : null}]}
      >
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:30,fontWeight:'200',color:soloCons ? colors.background : null}}>60</Text>
          <Text style={{fontSize:11,fontWeight:'300',color:soloCons ? colors.background : null}}>минут</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      disabled={!soloCons ? true : false }
        onPress={switchPress}
        style={[styles.containerArrow,{backgroundColor:!soloCons ? colors.colorPrimary : null}]}
      >
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:30,fontWeight:'200',color:!soloCons ? colors.background : null}}>90</Text>
          <Text style={{fontSize:11,fontWeight:'300',color:!soloCons ? colors.background : null}}>минут</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

 const styles=StyleSheet.create({
   containerArrow:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10,
    borderRadius:20
   },
   container:{
    marginBottom:5,
    flexDirection:'row',
    marginHorizontal:8,
    borderRadius:20,
    backgroundColor:colors.background
   }
 })