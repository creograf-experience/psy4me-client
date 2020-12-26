import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { colors } from '../constants';

export const ConsultationSwitchButtons = ({onPressVideo,onPressChat}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPressVideo} style={[styles.btnLayout,onPressVideo ? null : styles.current]}>
    <View style={styles.combineButton}>
      <Image
        style={styles.videoButton}
        source={require('../../assets/images/icons/videoIcon.png')}
      />
      <Text style={{fontSize:16,color:onPressVideo ? null : colors.hintColor}}>Видео</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={onPressChat} style={[styles.btnLayout,onPressChat ? null : styles.current]}>
    <View style={styles.combineButton}>
      <Image
        style={styles.chatButton}
        source={require('../../assets/images/icons/chatIcon.png')}
      />
      <Text style={{fontSize:16,color:onPressChat ? null : colors.hintColor}}>Чат</Text>
      </View>
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
  combineButton:{
    flexDirection: 'row',
  },
  chatButton:{
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain'
  },
  videoButton:{
    width: 30,
    height: 27,
    marginRight: 7,
    resizeMode: 'contain'
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