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
import { CheckButton } from "../../../containers";
import { NewCheck } from "./NewCheck";


export const ModalDelete = ({ isVisible,closeModal,onChangeText,value,onPressSave,onPressCheck }) => (
  <Modal isVisible={isVisible}
    onBackdropPress={closeModal}
  >
    <View style={styles.modal}>
      <View style={styles.layoutHeader}>
        <Text style={{fontSize:16,fontWeight:'600'}}>Смена специалиста</Text>
      </View>
      <View style={{marginLeft:10,marginRight:10,marginBottom:10}}>
        <Text style={{textAlign:'center'}}>Напишите, пожалуйста, почему вам не понравился специалист?</Text>
      </View>
      <TextInput
        style={{height: 100,borderWidth:1,borderColor:colors.halfTransparentColorPrimary,marginLeft:10,marginRight:10,borderRadius:20,paddingLeft:10,paddingRight:5}}
        multiline
        fontSize={15}
        onChangeText={onChangeText}
        value={value}
        blurOnSubmit
      />
      <View style={{marginTop:20,marginLeft:10,marginRight:10}}>
        <NewCheck
          text='Заново заполнить анкету для подбора психолога'
          onPress={onPressCheck}
        />
      </View>
      <TouchableOpacity style={styles.layoutSaveButton} onPress={onPressSave}>
        <Text style={styles.buttonSave}>Подобрать другого</Text>
      </TouchableOpacity>
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
    fontSize: 13,
    justifyContent: "center",
    alignSelf: "center"
  }
})