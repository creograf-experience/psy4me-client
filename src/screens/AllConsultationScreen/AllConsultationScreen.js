import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, ScrollView,FlatList, StyleSheet, TouchableOpacity, TouchableNativeFeedbackBase } from 'react-native';
import { ContainerWrapper, CentralHeaderWrapper, HeaderText, HeaderTextWrapper, HeaderWrapper, ScrollContentWrapper, PlaceholderText, Spinner } from '../../components';
import { Header, DotsButton} from '../../containers';
import { colors,mediaHost, CONSULTATION_SCREEN } from '../../constants';
import { AvatarList } from './components';
import { ActivityIndicatorWrapper } from '../ProfileScreen/components';
import moment from 'moment';
import { strings } from "../../../locale/i18n";

export default class AllConsultationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allConsultations:[],
      loading:true,
      refreshing:false,
      token:'',
    };
    this.consultStatus = {
      'Запланирована':strings("allConsultations.consultInPlan"),
      'Завершена':strings("allConsultations.consulIsDone"), 
      'Перенесена':strings("allConsultations.consultIsDelay")
    }
  }

  async componentDidMount() {
    const {getAllConsultation,getUserChats}=this.props;
    const token = await AsyncStorage.getItem('jwt');
    await getUserChats(token);
    await getAllConsultation(token);
    this.setState({token});
  }

  componentDidUpdate(prevProps){
    if(prevProps.allConsultations!==this.props.allConsultations){
      this.setState({allConsultations:this.props.allConsultations,loading:false,refreshing:false})
    }
  }

  onRefresh= async() => {
    const {getAllConsultation}=this.props;
    const {token}=this.state;
    this.setState({refreshing:true});
    await getAllConsultation(token)
  }

  renderItem=({item})=>{
    const chat=this.props.chatList.find(el=>el.receivingId===item.psych._id && el.consultationChat===true);
    if(item.status==='Запланирована' && item.date<new Date().getTime()){
      return(
        <View style={styles.itemContainer}>
          <View style={{ marginRight:5, flex:1 }}>
            <AvatarList
              avatar={item.psych.avatar ? { uri: `${mediaHost}/psych/${item.psych._id}/avatar/avatar_${item.psych._id}.jpg` } : null}
            />
          </View>
          <View style={{flex:3}}>
            <Text style={{fontSize:12}}>{item.psych.firstName} {item.psych.lastName}</Text>
            <Text style={{fontSize:12,marginBottom:5}}>{item.durationInMinutes} {strings("allConsultations.min")}</Text>
            <Text style={{fontSize: 12,color:colors.hintColor}}>{strings("allConsultations.noConsult")}</Text>
            <Text style={{fontSize:12,marginTop:5}}>{moment(item.date).format('HH:mm DD.MM.YYYY')}</Text>
          </View>
        </View>
      );
    }
    else {
      return(
        <TouchableOpacity style={styles.itemContainer}
          onPress={()=>{this.props.clearActiveConsChats();this.props.navigation.navigate(CONSULTATION_SCREEN,{item,chat})}}
        >
          <View style={{ marginRight:5, flex:1 }}>
            <AvatarList
              avatar={item.psych.avatar ? { uri: `${mediaHost}/psych/${item.psych._id}/avatar/avatar_${item.psych._id}.jpg` } : null}
            />
          </View>
          <View style={{flex:3}}>
            <Text style={{fontSize:12}}>{item.psych.firstName} {item.psych.lastName}</Text>
            <Text style={{fontSize:12,marginBottom:5}}>{item.durationInMinutes} {strings("allConsultations.min")}</Text>
            {item.status==='Завершена' 
              ? (
                <>
                  <Text style={{fontSize:12,color:colors.selectedRadioColor}}>{this.consultStatus[item.status]}</Text>
                  <Text style={{fontSize:12,marginTop:5,fontWeight:'600'}}>{moment(item.date).format('HH:mm DD.MM.YYYY')}</Text>
                </>
                )
              : (
                <>
                  <Text style={{fontSize: 12,color:colors.hintColor}}>{this.consultStatus[item.status]}</Text>
                  <Text style={{fontSize:12,marginTop:5}}>{moment(item.date).format('HH:mm DD.MM.YYYY')}</Text>
                </>
              ) 
            }
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {allConsultations,loading, refreshing}=this.state;
    
    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            title={strings("allConsultations.consulTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />
          {loading 
            ? (
              <Spinner/>
            ) 
            : (
              <View style={{flex:9}}>
                <FlatList
                  style={{marginTop:5}}
                  data={allConsultations}
                  renderItem={this.renderItem}
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                  keyExtractor={(item,index)=>index.toString()}
                />
              </View>
          )}
          
        </View>
      </ContainerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    flexDirection:'row',
    marginTop:5,
    marginRight:10,
    marginLeft:10,
    paddingBottom:7,
    borderBottomWidth:1,
    borderBottomColor:colors.halfTransparentColorPrimary
  }
})