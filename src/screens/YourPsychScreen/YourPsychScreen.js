import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, ScrollView,TouchableOpacity,Dimensions,Alert } from 'react-native';
import { ContainerWrapper, CentralHeaderWrapper, HeaderText, HeaderTextWrapper, HeaderWrapper, ScrollContentWrapper, AvatarWrapper,ButtonWrapper, ButtonText, HintPsychText, Spinner } from '../../components';
import { Header, DotsButton, SwitchButtons, AvatarContainer, TextButton, Button } from '../../containers';
import { colors,RECORD_PSYCH_SCREEN,mediaHost, SECOND_QUIZ_SCREEN, CHAT_SCREEN } from '../../constants';
import { QuizField } from '../FirstQuizScreen/containers';
import { PsychAge, Specialization,ModalDelete } from './components';
import { ActivityIndicatorWrapper, PsychContentWrapper } from '../ProfileScreen/components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { HintPsychTextWrapper } from '../SecondQuizScreen/components';
import { strings } from "../../../locale/i18n";

export default class YourPsychScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      newPsych:false,
      isVisible:false,
      token:'',
      comment:'',
      psychProfile:{},
      chat:null,
      widthWindow:null,
      activeSlide: 0,
    };
    this.fioFields = [
      {
        placeholder: strings("profile.lastName"),
        name: 'lastName',
      },
      {
        placeholder: strings("profile.firstName"),
        name: 'firstName',
      },
      {
        placeholder: strings("profile.middleName"),
        name: 'middleName',
      },
      {
        placeholder: strings("profile.gender"),
        name: 'gender',
      }
    ];
    this.extraInfo = [
      {
        placeholder: strings("profile.country"),
        name: 'country',
      },
      {
        placeholder: strings("profile.timeZone"),
        name: 'timezone',
      },
      {
        placeholder: strings("profile.language"),
        name: 'language',
      },
    ];
  }

  showModal = () => this.setState({ isVisible: true });

  hideModal = () => this.setState({ isVisible: false, comment:'', newPsych:false });

  async componentDidMount() {
    const {
      getID, getPsychs, getYourPsych, getUserChats
    } = this.props;
    const token = await AsyncStorage.getItem('jwt');
    var { width }=Dimensions.get('window');
    this.setState({widthWindow:width});
    await getUserChats(token);
    setTimeout(async () => await getYourPsych(token), 2000);
    this.setState({token});
  }

  componentDidUpdate(prevProps){
    if(prevProps.psychProfile!==this.props.psychProfile){
      this.setState({psychProfile:this.props.psychProfile})
      if(this.props.psychProfile){
        const chat=this.props.chatList.find(el=>el.receivingId===this.props.psychProfile._id && el.consultationChat===false);
        this.props.setActiveChats(chat);
        this.setState({chat})
      }
      this.setState({loading:false});
    }
  }
  
  renderYourPsych=()=>{
    const {navigation,setActiveChats,clearMessages}=this.props;
    const {psychProfile,isVisible,comment,loading,chat}=this.state;
    return (
      <ContainerWrapper>
            <Header 
              dotsButton
              title={strings("chat.chatTitle")}
              onLeftPress={()=>{navigation.openDrawer()}}
            />
            {loading 
            ? (
              <Spinner/>
            ) 
            : (
              <>
                <SwitchButtons
                  onPressRecord={()=>{setActiveChats(chat);clearMessages();navigation.navigate(RECORD_PSYCH_SCREEN,{psychProfile})}}
                  onPressChat={()=>{setActiveChats(chat);clearMessages(); navigation.navigate(CHAT_SCREEN,{psychProfile})}}
                />
                <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center',marginTop:15 }}>
                <AvatarWrapper>
                  <AvatarContainer
                    avatar={psychProfile.avatar ? { uri: `${mediaHost}/psych/${psychProfile._id}/avatar/avatar_${psychProfile._id}.jpg` } : null}
                  />
                </AvatarWrapper>
                {this.fioFields.map(({ placeholder, name }, index) => (
                  <QuizField
                    key={index}
                    type="immutable"
                    placeholder={placeholder}
                    value={psychProfile[name]}
                  />
                ))}
                <PsychAge
                  age={psychProfile.birthDay}
                />
                <Specialization
                  specList={psychProfile.troubles}
                  educations={psychProfile.educations}
                />
                {this.extraInfo.map(({ placeholder, name }, index) => (
                  <QuizField
                    key={index}
                    type="immutable"
                    placeholder={placeholder}
                    value={psychProfile[name]}
                  />
                ))}
                <View style={{marginTop:20,marginBottom:40,width: '90%',alignSelf: 'center'}}>
                  <Text style={{fontSize:16,textAlign:'center',marginBottom:20,fontWeight:'600'}}>{strings("yourPsych.badConsult")}</Text>
                  <Button
                    onPress={()=>this.setState({isVisible:true})}
                    text={strings("yourPsych.replace")}
                  />
                </View>
                <ModalDelete
                  isVisible={isVisible}
                  closeModal={()=>this.hideModal()}
                  onChangeText={comment=>this.setState({comment})}
                  value={comment}
                  onPressSave={()=>this.deletePsych()}
                  onPressCheck={()=>this.setState({newPsych:!this.state.newPsych})}
                />
              </ScrollContentWrapper>
            </>
          )}
        </ContainerWrapper>
    );
  }

  deletePsych = async() => {
    const { newPsych, comment, token } = this.state;
    const { navigation, getYourPsych,deletePsychForClient,clearActiveChats } = this.props;
    const postComment = {
      "comment":comment
    }
    this.setState({isVisible:false,loading:true});
    await deletePsychForClient(postComment,token);
    clearActiveChats();
    if ( newPsych ) {
      navigation.navigate(SECOND_QUIZ_SCREEN);
      this.setState({loading:false});
    } else {
      setTimeout(async () => await getYourPsych(token), 1000);
      this.setState({comment:'', newPsych:false})
    }
  }

  renderListPsych=()=>{
    const {widthWindow, activeSlide}=this.state;
    const {navigation,psychList}=this.props;

    return(
      <ContainerWrapper>
        <Header 
          dotsButton
          title={strings("yourPsych.psychChoice")}
          onLeftPress={()=>navigation.openDrawer()}
        />
        <View style={{flex:9}}>
          <View style={{marginTop:20,marginBottom:20}}>
            <HintPsychText>
              {strings("chat.chatTitle")}
            </HintPsychText>
          </View>
          <TouchableOpacity activeOpacity={1}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={psychList.psychList}
              renderItem={this.renderItem}
              sliderWidth={widthWindow}
              itemWidth={widthWindow}
              style={{justifyContent:'center'}}
              onSnapToItem={index => this.setActiveSlide(index)}
            />
            <Pagination
              dotsLength={psychList.psychList.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: colors.colorPrimary,
              }}
              inactiveDotStyle={{
                backgroundColor: colors.halfTransparentColorPrimary,
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
          />
          </TouchableOpacity>
        </View>
      </ContainerWrapper>
    );
  }

  renderItem = data => {
    return (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{marginBottom:10}}
        >
          <AvatarWrapper>
            <AvatarContainer
              avatar={data.item.avatar ? { uri: `${mediaHost}/psych/${data.item._id}/avatar/avatar_${data.item._id}.jpg` }: null}
            />
          </AvatarWrapper>
        </TouchableOpacity>
        <View
          style={{marginBottom:10}}
        >
          <Text style={{ textAlign: 'center' }}>{data.item.lastName}</Text>
          <Text style={{ textAlign: 'center' }}>{`${data.item.firstName} ${data.item.middleName}`}</Text>
        </View>
        
          <Button
            text={strings("yourPsych.BookApp")}
            type="secondary"
            onPress={() => {this.selectPsych(data)}}
          />
          <View style={{marginBottom:10}}/>
          {/*<Button
            text="Бесплатная помощь в чате"
            type="secondary"
            onPress={() => {}}
          />*/}
        
      </View>
  )}

  selectPsych = async(data) =>{
    const { addPsychForClient, getYourPsych } = this.props;
    const { token } = this.state;
    const couple = {
      clientID: this.props.userID,
      psychID: data.item._id,
    };
    this.setState({loading:true})
    await addPsychForClient(couple,token);
    setTimeout(async () => await getYourPsych(token), 1000);
  };

  setActiveSlide = (index) => {
    this.setState({ activeSlide: index });
  };

  render() {
    const {psychProfile}=this.state;
    
    if(psychProfile===null){
      return this.renderListPsych();
    }else {
      return this.renderYourPsych();
    }
  }
}