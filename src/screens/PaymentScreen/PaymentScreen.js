import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, ScrollView, StyleSheet } from 'react-native';
import { ContainerWrapper, CentralHeaderWrapper, HeaderText, HeaderTextWrapper, HeaderWrapper, ScrollContentWrapper, AvatarWrapper, HintText } from '../../components';
import {Header, DotsButton, SwitchButtons, Button, AvatarContainer, TextButton} from '../../containers';
import {colors, YOUR_PSYCH_SCREEN, mediaHost, PAYMENT_WIDGET} from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScheduleWrapper } from '../SecondQuizScreen/components';
import { ConsultCounter, SwitchConsult } from './components';
import { strings } from "../../../locale/i18n";
import PaymentWidget from "./PaymentWidget";

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soloCons:props.navigation.state.params.soloCons,
      consultPayFamily:props.navigation.state.params.consultPayFamily,
      consultPaySolo:props.navigation.state.params.consultPaySolo,
      counter:1
    };
  }

  handleStateChange = stateProp => newValue => this.setState({ [stateProp]: newValue });
  
  incrementCount=()=>{
    const { counter }=this.state;
    this.setState({counter:counter+1})
  };

  decrementCount=()=>{
    const { counter }=this.state;
    if(counter!==1){
      this.setState({counter:counter-1})
    }
  };

  render() {
    const { soloCons,consultPayFamily,consultPaySolo,counter }=this.state;
    const factor = soloCons ? 3000 : 4500;
    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            closeButton
            title={strings("payment.payTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
            onRightPress={()=>this.props.navigation.goBack()}
          />
          <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center', marginTop:15 }}>
            <View style={{marginVertical:15,alignItems:'center',marginHorizontal:20}}>
              <Text style={{textAlign:'center',fontSize:14}}>{`${strings("payment.balance1")}\n ${strings("payment.balance2")}\n${strings("payment.balance3")}\n ${strings("payment.balance4")}\n ${strings("payment.balance5")}`}</Text>
            </View>
            <View style={styles.hintContainer}>
              <Text style={[styles.textHeaderStyle,{marginBottom:15}]}>{strings("timeRecord.duration")}</Text>
              <SwitchConsult
                switchPress={()=>this.setState({soloCons:!soloCons})}
                soloCons={soloCons}
              />
              <View style={styles.layoutConsTime}>
                <Text style={{fontSize:13}}>{strings("payment.consultations")} {soloCons ? 60 : 90} {strings("allConsultations.min")}</Text>
              </View>
              <Text style={[styles.textHeaderStyle,{marginBottom:15}]}>{strings("payment.consultAmmount")}</Text>
              <ConsultCounter
                incrementCount={()=>{this.incrementCount()}}
                decrementCount={()=>{this.decrementCount()}}
                counter={counter}
              />
            </View>

            <View style={{marginBottom:15,alignItems:'center'}}>
              <Text style={{fontSize:20,marginTop:5,fontWeight:'300'}}>{strings("payment.cost")} {counter * factor} ₽</Text>
            </View>

            <View style={{marginBottom:15,alignItems:'center',marginHorizontal:20}}>
              <Text style={{textAlign:'center',fontSize:12,color:colors.hintColor}}>{`${strings("payment.sale1")}\n ${strings("payment.sale2")}`}</Text>
            </View>

            <View style={{marginBottom:40}}>
              <Button
                onPress={() => this.props.navigation.navigate(PAYMENT_WIDGET)}
                text={strings("payment.pay")}
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
  },
  layoutConsTime:{
    borderBottomWidth:1,
    marginVertical:15,
    width:'100%',
    alignItems:'center',
    borderBottomColor:colors.halfTransparentColorPrimary,
    paddingBottom:10
  }
})