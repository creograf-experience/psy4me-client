import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { RatingView } from './RatingView'
import { colors } from '../../../constants';

import { strings } from "../../../../locale/i18n";

export const ModalRating = ({ isVisible, closeModal, onPressRate, ratingConnect, ratingPsych, onFinishPsychRating, onFinishConnectRating  }) => (
  
  <Modal 
    isVisible={isVisible}
    onBackdropPress={closeModal}
  >
    <View style={styles.modal}>
      <View style={styles.layoutHeader}>
        <Text style={{fontSize:16,fontWeight:'600'}}>{strings("consultation.Rate")}</Text>
      </View>
      <View style={{marginLeft:10,marginRight:10,marginBottom:10}}>
        <RatingView
            text={strings("consultation.jobRate")} rating={ratingPsych} onFinishRating={onFinishPsychRating}
        />
        <RatingView
            text={strings("consultation.commRate")} rating={ratingConnect} onFinishRating={onFinishConnectRating}
        />
      </View>
      <TouchableOpacity onPress={onPressRate}>
        <View style={[{flexDirection: 'row', justifyContent: 'space-around'},styles.layoutSaveButton]}>
            <Text style={styles.buttonSave}>{strings("consultation.Rate1")}</Text>
        </View>
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
    color: "#4ebfcf",
    fontSize: 13,
    justifyContent: "center",
    alignSelf: "center"
  }
})