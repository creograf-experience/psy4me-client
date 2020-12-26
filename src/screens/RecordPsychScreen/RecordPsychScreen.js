import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { ContainerWrapper, CentralHeaderWrapper, HeaderText, HeaderTextWrapper, HeaderWrapper, ScrollContentWrapper } from '../../components';
import { Header, DotsButton, SwitchButtons, Button } from '../../containers';
import { colors, YOUR_PSYCH_SCREEN, CHOOSE_TIME_RECORD_PSYCH_SCREEN, PAYMENT_SCREEN, CHAT_SCREEN} from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { strings } from "../../../locale/i18n";

export default class RecordPsychScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentSolo:true,
      paymentFamily:true,
      consultPaySolo:'',
      consultPayFamily:'',
      psychProfile:props.navigation.state.params.psychProfile
    };
  }
  
  render() {
    const {paymentSolo,paymentFamily,consultPaySolo,consultPayFamily,psychProfile}=this.state;
    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            title={strings("psychRecord.psychRecordTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />
          <SwitchButtons
            onPressProfilePsych={()=>this.props.navigation.navigate(YOUR_PSYCH_SCREEN)}
            onPressChat={()=>this.props.navigation.navigate(CHAT_SCREEN,{psychProfile})}
          />
          <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center',marginTop:15 }}>
            <Text style={{fontSize:16,fontWeight:'600',marginBottom:20}}>
              {strings("psychRecord.singleConsult")}
            </Text>
            <Text style={{fontSize:14,marginBottom:20}}>
              {`3000₽ / 60 ${strings("psychRecord.mins")}`}
            </Text>
            {paymentSolo
              ? (
                <Button
                  text={strings("psychRecord.buyConsult")}
                  onPress={()=>this.props.navigation.navigate(PAYMENT_SCREEN,{soloCons:true,consultPaySolo})}
                />)
              : (
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:14,marginBottom:20}}>
                    {consultPaySolo} {strings("psychRecord.consultPaid")}
                  </Text>
                  <Button
                    text={strings("timeRecord.timeRecordTitle")}
                    onPress={()=>this.props.navigation.navigate(CHOOSE_TIME_RECORD_PSYCH_SCREEN,{psychProfile,soloCons:true,consultPaySolo})}
                  />
                </View>
              )
            }
            <Text style={{fontSize:16,fontWeight:'600',marginBottom:20, marginTop:50 }}>
              {strings("psychRecord.familyConsult")}
            </Text>
            <Text style={{fontSize:14,marginBottom:20}}>
              {`4500₽ / 90 ${strings("psychRecord.mins")}`}
            </Text>
            {paymentFamily
              ? (
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:14,marginBottom:20}}>
                    {consultPayFamily} {strings("psychRecord.consultPaid")}
                  </Text>
                  <Button
                    text={strings("timeRecord.timeRecordTitle")}
                    onPress={()=>this.props.navigation.navigate(CHOOSE_TIME_RECORD_PSYCH_SCREEN,{psychProfile,soloCons:false,consultPayFamily})}
                  />
                </View>
              ) 
              : (
                <Button
                  text={strings("psychRecord.buyConsult")}
                  onPress={()=>this.props.navigation.navigate(PAYMENT_SCREEN,{soloCons:false,consultPayFamily})}
                />)
            }
          </ScrollContentWrapper>
        </View>
      </ContainerWrapper>
    );
  }
}