import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";


export const ModalDoneConsultation = ({ isVisible,closeModal,onChangeText,value,onPressSave }) => (
  <Modal isVisible={isVisible}>
    <View style={styles.modal}>
      <View style={styles.layoutHeader}>
        <Text style={{fontSize:16,fontWeight:'600'}}>{strings("consultation.consultIsGone")}</Text>
      </View>

      <View style={{marginLeft:10,marginRight:10,marginBottom:10}}>
        <Text style={{textAlign:'center'}}>{strings("consultation.explanation")}</Text>
      </View>

      <TextInput
        style={styles.inputFormat}
        multiline
        fontSize={15}
        onChangeText={onChangeText}
        value={value}
        blurOnSubmit
      />
      
      <View style={[{flexDirection: 'row'},styles.layoutSaveButton]}>
        <TouchableOpacity style={{borderRightWidth:1,borderRightColor:colors.halfTransparentColorPrimary}} onPress={onPressSave}>
          <Text style={[styles.buttonSave,{paddingRight:40}]}>{strings("consultation.submit")}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.buttonSave}>{strings("firstQuiz.cancel")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles=StyleSheet.create({
  modal:{
    backgroundColor:colors.background,
    borderRadius:20
  },
  inputFormat:{
    height: 100,
    borderWidth:1,
    borderColor:colors.halfTransparentColorPrimary,
    marginLeft:10,
    marginRight:10,
    borderRadius:20,
    paddingLeft:10,
    paddingRight:5
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
    alignItems:'center',
    justifyContent:'space-around'
  },
  buttonSave:{
    fontWeight:"600",
    fontSize: 13,
    justifyContent: "center",
    padding:20
  }
})