import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import moment from 'moment';
import { colors } from '../constants';
import { Button } from "../containers";


export const ModalChangeAccept = ({ isVisible,onPressChange,item,onPressSave  }) => (
  <Modal isVisible={isVisible}
  >
    <View style={styles.modal}>
    <View style={styles.layoutHeader}>
        <Text style={{fontSize:16,fontWeight:'600'}}>Подтвердите перенос</Text>
      </View>
      <View style={{marginLeft:10,marginRight:10,marginBottom:10}}>
        <Text style={{textAlign:'center'}}>Специалист предложил перенести консультацию на {moment(item.date).format('HH:mm')} в {item.client.schedule.weekDay} {moment(item.date).format(' DD.MM.YYYY')}  </Text>
      </View>
      <View style={styles.layoutSaveButton}>
        <Button
           onPress={onPressSave}
           text="Подтвердить"
        />
        <View style={{marginTop:5}}>
          <Button
            onPress={onPressChange}
            type="secondary"
            text="Предложить другое время"
          />
        </View>  
      </View>
    </View>
  </Modal>
);

const styles=StyleSheet.create({
  modal:{
    backgroundColor:colors.background,
    borderRadius:20
  },
  layoutHeader:{
    backgroundColor:colors.background,
    paddingBottom:10,
    paddingTop:20,
    marginBottom:10,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    alignItems:'center'
  },
  layoutSaveButton:{
    borderTopWidth:1,
    borderTopColor:colors.halfTransparentColorPrimary,
    marginTop:20,
    paddingBottom:20,
    paddingTop:20,
    alignItems:'center'
  },
  buttonSave:{
    fontWeight:"600",
    color: "#4ebfcf",
    fontSize: 13,
    justifyContent: "center",
    alignSelf: "center"
  },
  layoutChangeButton:{
    borderTopWidth:1,
    borderTopColor:colors.transparentColorPrimary,
    marginTop:20,
    paddingBottom:20,
    paddingTop:20,
    alignItems:'center'
  },
  buttonChange:{
    color: "#4ebfcf",
    fontWeight:"600",
    fontSize: 13,
    justifyContent: "center",
    alignSelf: "center"
  }
})