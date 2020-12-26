import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { ContainerWrapper, CentralHeaderWrapper, HeaderText, HeaderTextWrapper, HeaderWrapper, ScrollContentWrapper, AvatarWrapper, HintText } from '../../components';
import { Header, DotsButton, SwitchButtons, Button, AvatarContainer } from '../../containers';
import { colors, YOUR_PSYCH_SCREEN, mediaHost} from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScheduleWrapper } from '../SecondQuizScreen/components';
import { TimeInput } from './components/TimeInput';
import moment from 'moment';
import { addConsultationRequest } from '../../networkers';
import { strings } from "../../../locale/i18n";

export default class ChooseTimeRecordPsychScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      psychProfile:props.navigation.state.params.psychProfile,
      soloCons:props.navigation.state.params.soloCons,
      consultPayFamily:props.navigation.state.params.consultPayFamily,
      consultPaySolo:props.navigation.state.params.consultPaySolo,
      isDatePickerVisible:false,
      chooseDate:''
    };
  }

  handleStateChange = stateProp => newValue => this.setState({ [stateProp]: newValue });
  
  recordPsych=async()=>{
    const { psychProfile, soloCons, chooseDate }=this.state;
    if(chooseDate.length===0){
      Alert.alert(strings("timeRecord.warning"),strings("timeRecord.timeChoice"));
      return;
    } else {
      const infoCons={
        psych:psychProfile._id,
        client:this.props.userID,
        date:moment(chooseDate).valueOf(),
        durationInMinutes:soloCons ? 60 : 90
      };
      const token=await AsyncStorage.getItem('jwt');
      await addConsultationRequest(infoCons,token);
      Alert.alert('',strings("timeRecord.successChoice"),[{text:'Ок', onPress:()=>{this.props.navigation.goBack();}}])
    }
  }

  render() {
    const { psychProfile, soloCons, chooseDate, isDatePickerVisible, consultPayFamily,consultPaySolo }=this.state;
    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            closeButton
            title={strings("timeRecord.timeRecordTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
            onRightPress={()=>this.props.navigation.goBack()}
          />
          <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center', marginTop:15 }}>

            <AvatarWrapper>
              <AvatarContainer
                avatar={psychProfile.avatar ? { uri: `${mediaHost}/psych/${psychProfile._id}/avatar/avatar_${psychProfile._id}.jpg` } : null}
              />
            </AvatarWrapper>

            <View style={styles.containerName }>
              <Text style={{ fontSize:14 }}>{psychProfile.lastName} {psychProfile.firstName} {psychProfile.middleName}</Text>
            </View>

            <Text style={{ fontSize:14,fontWeight:'600' }}>{strings("timeRecord.recTime")}</Text>

            { psychProfile.schedule 
              ? (psychProfile.schedule.map(el=>(
                <View style={{alignItems:'center'}} key={el._id}>
                  <HintText style={{marginTop:5}}>{el.weekDay}</HintText>
                  <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    {(el.startTime>=0 && el.startTime<=9) ? <Text style={styles.dayStyle}>0{el.startTime}:00 - </Text> : <Text style={styles.dayStyle}>{el.startTime}:00 - </Text> }
                    {(el.endTime>=0 && el.endTime<=9) ? <Text style={styles.dayStyle}>0{el.endTime}:00</Text> : <Text style={styles.dayStyle}>{el.endTime}:00</Text> }
                  </View>
                </View>))) 
              : null}

            <View style={styles.hintContainer}>
              <Text style={[styles.textHeaderStyle,{marginBottom:15}]}>{strings("timeRecord.сonvTime")}</Text>
              <TimeInput
                isVisible={ isDatePickerVisible }
                value={ chooseDate }
                toggleVisible={this.handleStateChange('isDatePickerVisible')}
                onConfirm={ this.handleStateChange('chooseDate') }
              />
              <Text style={{textAlign:'center',fontSize:12,color:colors.hintColor}}>{strings("timeRecord.alert")}</Text>
              <Text style={[styles.textHeaderStyle,{marginTop:15}]}>{strings("timeRecord.duration")}: {soloCons ? 60 : 90} {strings("allConsultations.min")}</Text>
            </View>

            <View style={{marginBottom:15,alignItems:'center'}}>
              <Text style={styles.textHeaderStyle}>{strings("timeRecord.paid")}</Text>
              <Text style={styles.textHeaderStyle}>{soloCons ? consultPaySolo : consultPayFamily} {strings("timeRecord.consultFor")} {soloCons ? 60 : 90} {strings("allConsultations.min")}</Text>
              <Text style={{fontSize:20,marginTop:5,fontWeight:'300'}}> ₽</Text>
            </View>

            <View style={{marginBottom:40}}>
              <Button
                text={strings("timeRecord.timeRecordTitle")}
                onPress={()=>this.recordPsych()}
              />
            </View>
            
          </ScrollContentWrapper>
        </View>
      </ContainerWrapper>
    );
  }
}

const styles=StyleSheet.create({
  containerName: {
    marginTop:15,
    marginBottom:15, 
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:colors.halfTransparentColorPrimary,
    width:'90%',
    alignItems:'center'
  },
  dayStyle: {
    fontSize:12
  },
  hintContainer: {
    width:'100%',
    borderRadius:35,
    backgroundColor:colors.transparentColorPrimary,
    paddingVertical:20,
    paddingHorizontal:15,
    marginVertical:20,
    alignItems:'center'
  },
  textHeaderStyle:{
    fontSize:14,
    fontWeight:'600'
  }
})