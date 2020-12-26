import React, { PureComponent } from 'react';
import {
  AsyncStorage,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  ActivityIndicatorWrapper,
  AvatarWrapper,
  PsychWrapper,
  PsychContentWrapper,
} from './components';
import { HintPsychText } from '../../components';
import {
  Button,
  AvatarContainer,
} from '../../containers';
import { HintPsychTextWrapper, ButtonWrapper } from '../SecondQuizScreen/components';
import { colors, mediaHost, PROFILE_SCREEN } from '../../constants';
import { strings } from "../../../locale/i18n";

export default class ConsultantSelectingScreenComponent extends PureComponent {
  constructor(props) {
    super(props);
    //const { psychList } = this.props.psychList;
    this.state = {
      loading: true,
      psychList:[],
      disabled: false,
      psychSelection: this.props.psychSelection,
      psych: {},
      widthWindow: null,
      secondQuiz: this.props.secondQuiz,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    const { psychSelection, secondQuiz } = this.state;

    this.setState({
      psychSelection: secondQuiz ? secondQuiz.psychSelection : psychSelection,
    });
  }

  async componentDidMount() {
    const {
      getID, getProfileData, getPsychs, psychList, profile,
    } = this.props;
    var {width}=Dimensions.get('window');
    this.setState({widthWindow:width});
    const token = await AsyncStorage.getItem('jwt');
    await getID(token);
    await getProfileData(token);
    await getPsychs(token);
    const psychsArray = Object.values(psychList);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const personalPsych = psychsArray.find(
      psych => psych._id === profile.personalPsych
    );
    if (personalPsych) this.setState({ psych: personalPsych });
    this.dataFetch();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.psychList) {
      const { psychList } = nextProps.psychList;
      // console.log(this.props.psychList);
      this.setState(
        {
          psychList,
        },
        () => this.setState({
          loading: false,
        })
      );
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

    const { onReturn } = this.props;
    const { psychSelection } = this.state;

    onReturn(psychSelection);
  }

  dataFetch = () => {
    this.setState({ loading: true });
    const { psychList } = this.props.psychList;
    psychList.map((item) => {
      item.isSelect = false;
      item.selectedClass = styles.list;
      return item;
    });
    this.setState({
      loading: false,
      psychList,
    });
  }

  FlatListItemSeparator = () => <View style={styles.line} />;

  selectItem = (data) => {
    const { onAdd } = this.props;
    const { psychList, psychSelection } = this.state;
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;
    const index = psychList.findIndex(
      item => data.item._id === item._id
    );
    psychList[index] = data.item;
    this.setState({
      psychList,
      psychSelection: data.item,
    });
    onAdd(data.item);
    Alert.alert(strings("profile.psychChosen"),this.getPsychName(data.item),[
      {text: "Ок",onPress:()=>this.onPress()}
    ]);
    
  }

  renderItem = data => {
    return (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          // style={[data.item.selectedClass]}
          activeOpacity={1}
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate(PROFILE_SCREEN);
          }}
        >
          <AvatarWrapper>
            <AvatarContainer
              avatar={data.item.avatar ? { uri: `${mediaHost}/psych/${data.item._id}/avatar/avatar_${data.item._id}.jpg` } : null}
            />
          </AvatarWrapper>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
        >
          <Text style={{ textAlign: 'center' }}>{data.item.lastName}</Text>
          <Text style={{ textAlign: 'center' }}>{`${data.item.firstName} ${data.item.middleName}`}</Text>
        </TouchableOpacity>
        <ButtonWrapper>
          <Button
            disabled={this.state.disabled}
            text={strings("yourPsych.BookApp")}
            type="secondary"
            onPress={() => this.selectItem(data)}
          />
          <View style={{marginBottom:10}}/>
          {/*<Button
            disabled={this.state.disabled}
            text="Бесплатная помощь в чате"
            type="secondary"
            onPress={() => this.selectItem(data)}
          />*/}
        </ButtonWrapper>
      </View>
  )}

  getPsychName = psych => `${psych.lastName} ${psych.firstName[0]}. ${psych.middleName[0]!==undefined ? psych.middleName[0]+'.' : ''}`;

  onPress = () => {
    const { onChange, onQuizDone } = this.props;
    const { psychSelection } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    onChange(psychSelection);
    onQuizDone();
  };

  handleBackPress = () => true;

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addPsychForClient = async (data) => {
    const { psychList } = this.state;
    const { userID } = this.props;
    const token = await AsyncStorage.getItem('jwt');
    /* const psy = psychList.map((item) => {
      const psychID = item._id;
      return psychID;
    }); */
    // data.item.isSelect = !data.item.isSelect;
    // data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;
    const index = psychList.findIndex(
      item => data.item._id === item._id
    );
    // console.log(data.item);
    psychList[index] = data.item;
    this.setState({
      psychList,
    });
    const couple = {
      clientID: userID,
      psychID: data.item._id,
    };
    // console.log(this.state.psychList);
    if (psychList[index]) {
      this.addPsychForClient(couple, token);
    }
  };

  render() {
    const {
      psychList,
      disabled,
      loading,
      widthWindow
      // psychSelection,
    } = this.state;
    // const { navigation } = this.props;
    // const { psychList } = this.props;
    return loading ? (
      <ActivityIndicatorWrapper>
        <ActivityIndicator size="large" color={colors.colorPrimary} />
      </ActivityIndicatorWrapper>
    ) : (
      <PsychWrapper>
        <HintPsychTextWrapper>
          <HintPsychText>
            {strings("psychRecord.psychRecordTitle")}
          </HintPsychText>
        </HintPsychTextWrapper>
        <PsychContentWrapper>
          <TouchableOpacity activeOpacity={1}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={psychList}
              renderItem={this.renderItem}
              sliderWidth={widthWindow}
              itemWidth={widthWindow}
              style={{justifyContent:'center'}}
            />
          </TouchableOpacity>
        </PsychContentWrapper>
        <Button
          style={{ marginBottom: 20 }}
          disabled={disabled}
          text={strings("secondQuiz.save")}
          type="primary"
          onPress={this.onPress}
        />
      </PsychWrapper>
    );
  }
}

ConsultantSelectingScreenComponent.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};

ConsultantSelectingScreenComponent.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

const styles = StyleSheet.create({
  selected: {
    backgroundColor: colors.selectedRadioColor,
  },
  list: {
    backgroundColor: colors.colorPrimary,
  },
});

/* <BottomButtonWrapper>
            <Button
              text="Перейти в профиль"
              type="primary"
              onPress={() => {
                navigation.navigate(PROFILE_SCREEN);
              }}
            />
          </BottomButtonWrapper> */
/* <ContainerWrapper>
        <ContentWrapper>
          <Header
            title="Список консультантов"
          />
          <Card>
            {
              psychList.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    title={`${item.lastName} ${item.firstName[0]}. ${item.middleName[0]}.`}
                    // title={item.lastName + item.firstName[0] + item.middleName[0]}
                    subtitle={item.email}
                  />
                );
              })
            }
          </Card>
          <FlatList
       data={psychList}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={item => this.renderItem(item)}
         keyExtractor={item => item._id.toString()}
           extraData={this.state}
         />
      */
