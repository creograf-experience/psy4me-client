import React from 'react';
import { View, TouchableOpacity, TextInput, Dimensions, Text, Image, Platform, StyleSheet } from 'react-native';
import { colors } from '../../../constants';
 
export const ConsultCounter = ({
  counter,
  incrementCount,
  decrementCount
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={decrementCount}
        style={styles.containerArrow}
      >
        <Image
          source={require('../../../../assets/images/icons/arrowLeft.png')}
          style={{width:8,height:15}}
        />
      </TouchableOpacity>
      <View style={styles.containerCount}>
        <Text style={{fontSize:20,fontWeight:'300'}}>{counter}</Text>
      </View>
      <TouchableOpacity
        onPress={incrementCount}
        style={styles.containerArrow}
      >
        <Image
          source={require('../../../../assets/images/icons/arrowRight.png')}
          style={{width:8,height:15,marginTop: Platform.OS==='ios' ? 1 : 0}}
        />  
      </TouchableOpacity>
    </View>
  );
}

 const styles=StyleSheet.create({
   containerArrow:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:25,
    borderRadius:20,
    backgroundColor:colors.background
   },
   containerCount:{
    flex:1.5,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:5,
    paddingVertical:25,
    borderRadius:20,
    backgroundColor:colors.background
   },
   container:{
    marginBottom:5,
    flexDirection:'row',
    marginHorizontal:8
   }
 })