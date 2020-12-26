import React from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text
} from 'react-native';



const ratingStars = [
  {id:1, value: 1 },
  {id:2, value: 2 },
  {id:3, value: 3 },
  {id:4, value: 4 },
  {id:5, value: 5 },
];

export const NoPressRatingView = ({text,ratingValue}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={{flexDirection:'row'}}>
        {
          ratingStars.map(star=>
            <Image
              key = {star.id}
              style = {{width:30,height:30, marginRight:10}}
              source = {
                star.value<=ratingValue 
                ? require('../../../../assets/images/icons/starActive.png')
                : require('../../../../assets/images/icons/starNoActive.png')
              }
            />
          )
        }
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    marginTop:15,
    width:'100%',
    alignItems:'center'
  },
  text:{
    marginBottom:10,
    textAlign:'center'
  }
})