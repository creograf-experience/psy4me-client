import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, ScrollView,FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ContainerWrapper, CentralHeaderWrapper, HeaderText, HeaderTextWrapper, HeaderWrapper, ScrollContentWrapper, PlaceholderText, CallWrapper , AvatarWrapper, ContentWrapper,ModalChangeAccept, Spinner } from '../../components';
import { Header, DotsButton, AvatarContainer, Button, ConsultationSwitchButtons } from '../../containers';
import { colors,mediaHost, ALL_CONSULTATION_SCREEN, CHOOSE_TIME_RECORD_PSYCH_SCREEN, CONS_CHAT_SCREEN } from '../../constants';
import { ActivityIndicatorWrapper } from '../ProfileScreen/components';
import moment from 'moment';
import { ButtonWrapper } from '../SecondQuizScreen/components';
import { RatingView, NoPressRatingView, ModalDoneConsultation, ModalRating } from './components';
import { completeConsultationRequest, rateConsultationRequest } from '../../networkers/consultation';
import { strings } from "../../../locale/i18n";

export default class ConsultationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      comment:'',
      isVisible:false,
      isVisibleRate: false,
      item:props.navigation.state.params.item,
      chat:props.navigation.state.params.chat,
      ratingConnect:3,
      ratingPsych:3,
    };
    this.consultStatus = {
      'Запланирована':strings("allConsultations.consultInPlan"),
      'Завершена':strings("allConsultations.consulIsDone"), 
      'Перенесена':strings("allConsultations.consultIsDelay")
    }
  }

  componentDidMount(){
    const { chat }= this.state;
    const {setActiveConsChats} = this.props;
    if(chat){
      this.setState({loading:true});
      setActiveConsChats(chat);
      this.setState({loading:false})
    }
  }

  showModal = () => this.setState({ isVisible: true });
  hideModalRate = () => this.setState({isVisibleRate: false, ratingConnect:3,ratingPsych:3});
  hideModal = () => this.setState({ isVisible: false, comment:'' });

  renderCurrentConsult=()=>{
    const {isVisible,comment,item,ratingConnect,ratingPsych,isVisibleRate}=this.state;
    return (
      <>
        <ConsultationSwitchButtons onPressChat={()=>{this.props.navigation.navigate(CONS_CHAT_SCREEN,{psychProfile:item.psych})}}/>
        <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center', marginTop:15 }}>
          <View style={{alignItems:'center',flex:8}}>
            <Text style={{marginTop:15,alignItems:'center',flex:8}} style={[(item.durationInMinutes <= 5) ? styles.alert : null]}>
                {strings("consultation.consultEnd")} {item.durationInMinutes} {strings("allConsultations.min")}
            </Text>

            <CallWrapper>
              
            </CallWrapper>

            <View style={{flexDirection: 'row', marginTop:15, marginHorizontal: 10}}>
              <Text style={{ fontSize:14 }}>{item.psych.firstName} {item.psych.lastName}</Text>
            </View>

            <ButtonWrapper>
              {
                item.date + 10800000 >= item.date
                ? <Button
                    type='third'
                    text={strings("consultation.offerTime")}
                    onPress={()=>{}}
                  />
                : <Button
                    text={strings("consultation.connect")}
                    type='third'
                    onPress={()=>{}}
                  />
              }
            </ButtonWrapper>
          </View>
            <ButtonWrapper>
              <Button
                text={strings("consultation.noApp")}
                type="secondary"
                onPress={()=>this.setState({isVisible:true})}
              />
            </ButtonWrapper>
            
            <ModalDoneConsultation
                isVisible={isVisible}
                closeModal={()=>this.hideModal()}
                onChangeText={comment=>this.setState({comment})}
                value={comment}
                onPressSave={()=>this.consultationComment()}
            />
            {/* <ModalChangeAccept
              isVisible={isVisible}
              item={item}
              onPressChange={()=>{}}
              onPressSave={()=>this.hideModal()}
            /> */}
            <ModalRating
              isVisible={isVisibleRate}
              ratingConnect={ratingConnect}
              ratingPsych={ratingPsych}
              onFinishPsychRating={(ratingPsych)=>this.setState({ratingPsych})}
              onFinishConnectRating={(ratingConnect)=>this.setState({ratingConnect})}
              closeModal={()=> this.hideModalRate()}
              onPressRate={()=>this.rateConsultation()}
            />
        </ScrollContentWrapper>
      </>
    )
  }

  consultationComment = async() => {
    const {comment,item} = this.state;
    const {navigation} = this.props;
    const postComment = {
      "comment":comment
    }
    this.setState({isVisible:false,loading:true});
    const token = await AsyncStorage.getItem('jwt');
    await completeConsultationRequest(item._id,token);
    setTimeout(()=>this.setState({isVisibleRate:true,loading:false}),1500)
  }

  rateConsultation = async () => {
    const {item,ratingPsych,ratingConnect}=this.state;
    const rate = { 
      id:item._id,
      psychRating:ratingPsych,
      connectionRating:ratingConnect
    }
    const token = await AsyncStorage.getItem('jwt');
    await rateConsultationRequest(rate,token);
    this.props.navigation.navigate(ALL_CONSULTATION_SCREEN);
  }

  renderCompleteConsult=()=>{
    const {item}=this.state
    return(
      <>
      <View style={{marginTop:15,alignItems:'center',flex:8}}>
        <AvatarWrapper>
          <AvatarContainer
            avatar={item.psych.avatar ? { uri: `${mediaHost}/psych/${item.psych._id}/avatar/avatar_${item.psych._id}.jpg` } : null}
          />
        </AvatarWrapper>
        <View style={styles.containerName }>
          <Text style={{ fontSize:14 }}>{item.psych.lastName} {item.psych.firstName} {item.psych.middleName}</Text>
        </View>
        <Text style={{fontSize:12,marginBottom:5}}>{item.durationInMinutes} {strings("allConsultations.min")}</Text>
        <Text style={{fontSize:12,color:colors.selectedRadioColor}}>{this.consultStatus[item.status]}</Text>
        <Text style={{fontSize:12,marginTop:5,color:colors.hintColor}}>{moment(item.date).format('HH:mm DD.MM.YYYY')}</Text>
        <NoPressRatingView 
          text={strings("consultation.jobEvaluation")}
          ratingValue={item.clientRating.psych}
        />
        <NoPressRatingView 
          text={strings("consultation.communEvaluation")}
          ratingValue={item.clientRating.connection}
        />
      </View>
      <ButtonWrapper>
        <Button
          text={strings("consultation.back")}
          onPress={()=>this.props.navigation.goBack()}
        />
      </ButtonWrapper>
      </>
    )
  }

  render() {
    const {loading, item}=this.state;
    return  (
      <ContainerWrapper>
        <ContentWrapper>
          <Header 
            dotsButton
            title={strings("allConsultations.consulTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />
          {loading 
            ? (<Spinner/>)
            :  item.status==='Завершена' ? this.renderCompleteConsult() : this.renderCurrentConsult()
          }
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  containerName: {
    marginTop:15,
    marginBottom:10, 
    paddingBottom:15,
    width:'90%',
    alignItems:'center'
  }
})