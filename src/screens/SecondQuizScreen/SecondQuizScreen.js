import React, { PureComponent } from 'react';
import {
  Alert,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import { createTransition, SlideLeft, SlideRight } from 'react-native-transition';
import { showMessage } from 'react-native-flash-message';

import { ContainerWrapper, ContentWrapper, Line } from '../../components';
import { Header } from '../../containers';
import { TransitionWrapper } from './components';
import {
  DotsContainer,
  StartScreen,
  TroubleScreen,
  ConsultInfoScreen,
  DepressionInfoScreen,
  PsychoHelpScreen,
  MedicineInfoScreen,
  WorkingStyleScreen,
  PriceInfoScreen,
  AdditionalInfoScreen,
  ScheduleScreen,
} from './containers';
import { colors, QUIZ_DONE_SCREEN, PROFILE_SCREEN } from '../../constants';
import { ConsultantSelectingScreen } from '../ProfileScreen';

import { strings } from "../../../locale/i18n";

const Transition = createTransition(SlideLeft);

export default class SecondQuizScreen extends PureComponent {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      currentScreenIndex: 0,
      errors: {},
      quiz: {
        pickedTroubles: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        consultingObject: null,
        psychoHelp: null,
        depression: false,
        medicine: false,
        workingStyle: null,
        priceObject: null,
        infoObject: null,
        psychSelection: '',
        schedule: [
          {
            weekDay: null,
            startTime: 0,
            endTime: 23,
          },
        ],
      },
    };

    this.keyboardHeight = new Animated.Value(0);

    this.screenList = [
      () => <StartScreen key={0} onChange={this.addToState} />,
      pickedTroubles => (
        <TroubleScreen
          key={1}
          onChange={value => this.addToState('pickedTroubles', value)}
          onReturn={value => this.onReturnBack('pickedTroubles', value)}
          pickedTroubles={pickedTroubles}
          secondQuiz={this.props.quiz}
        />
      ),
      consultingObject => (
        <ConsultInfoScreen
          key={2}
          onChange={value => this.addToState('consultingObject', value)}
          onReturn={value => this.onReturnBack('consultingObject', value)}
          consultingObject={consultingObject}
          secondQuiz={this.props.quiz}
        />
      ),
      psychoHelp => (
        <PsychoHelpScreen
          key={3}
          onChange={value => this.addToState('psychoHelp', value)}
          onReturn={value => this.onReturnBack('psychoHelp', value)}
          psychoHelp={psychoHelp}
          secondQuiz={this.props.quiz}
        />
      ),
      depression => (
        <DepressionInfoScreen
          key={4}
          onChange={value => this.addToState('depression', value)}
          onReturn={value => this.onReturnBack('depression', value)}
          depression={depression}
          secondQuiz={this.props.quiz}
        />
      ),
      medicine => (
        <MedicineInfoScreen
          key={5}
          onChange={value => this.addToState('medicine', value)}
          onReturn={value => this.onReturnBack('medicine', value)}
          medicine={medicine}
          secondQuiz={this.props.quiz}
        />
      ),
      workingStyle => (
        <WorkingStyleScreen
          key={6}
          onChange={value => this.addToState('workingStyle', value)}
          onReturn={value => this.onReturnBack('workingStyle', value)}
          workingStyle={workingStyle}
          secondQuiz={this.props.quiz}
        />
      ),
      priceObject => (
        <PriceInfoScreen
          key={7}
          onChange={value => this.addToState('priceObject', value)}
          onReturn={value => this.onReturnBack('priceObject', value)}
          priceObject={priceObject}
          secondQuiz={this.props.quiz}
        />
      ),
      infoObject => (
        <AdditionalInfoScreen
          key={8}
          onChange={value => this.addToState('infoObject', value)}
          onReturn={value => this.onReturnBack('infoObject', value)}
          infoObject={infoObject}
          secondQuiz={this.props.quiz}
        />
      ),
      schedule => (
        <ScheduleScreen
          key={9}
          onChange={value => this.addToState('schedule', value)}
          onAdd={value => this.onReturnBack('schedule', value)}
          onReturn={value => this.onReturnBack('schedule', value)}
          schedule={schedule}
        />
      ),
      psychSelection => (
        <ConsultantSelectingScreen
          key={10}
          navigation={this.props.navigation}
          onChange={value => this.onSubmitQuiz('psychSelection', value)}
          onAdd={value => this.onReturnBack('psychSelection', value)}
          onReturn={value => this.onReturnBack('psychSelection', value)}
          onQuizDone={this.goToQuizDoneScreen}
          psychSelection={psychSelection}
          secondQuiz={this.props.quiz}
        />
      ),
    ];

    this.nameList = [
      'start',
      'pickedTroubles',
      'consultingObject',
      'psychoHelp',
      'depression',
      'medicine',
      'workingStyle',
      'priceObject',
      'infoObject',
      'schedule',
      'psychSelection',
    ];
  }

  async componentDidMount() {
    this._isMounted = true;
    const token = await AsyncStorage.getItem('jwt');
    await this.props.fetchSecondQuiz(token);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { errors } = this.state;

    if (nextProps.fetching) {
      return;
    }

    if (nextProps.errors) {
      this.setState(
        {
          errors: {
            ...errors,
            serverError: nextProps.errors,
          },
        },
        () => showMessage({
          message: nextProps.errors,
          type: 'danger',
          backgroundColor: colors.errorColor,
        })
      );
    } else {
      this.setState(
        {
          errors: {
            ...errors,
            serverError: null,
          },
        },
        // this.goToQuizDoneScreen
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => true;

  addToState = (fieldName, value) => {
    const { currentScreenIndex, quiz } = this.state;

    Transition.show(
      this.screenList[currentScreenIndex + 1](quiz[this.nameList[currentScreenIndex + 1]])
    );

    if (value) {
      this.setState({
        quiz: {
          ...quiz,
          [fieldName]: value,
        },
      });
    }

    this.setState({
      currentScreenIndex: currentScreenIndex + 1,
    });
  };

  onReturnBack = (fieldName, value) => {
    const { quiz } = this.state;

    if (value) {
      this.setState({
        quiz: {
          ...quiz,
          [fieldName]: value,
        },
      });
    }
  };

  onSubmitQuiz = (fieldName, value) => {
    const { quiz } = this.state;
    const { pickedTroubles, schedule } = quiz;

    // if (value) {
      this.setState(
        {
          quiz: {
            ...quiz,
            [fieldName]: value,
            pickedTroubles: pickedTroubles,
            schedule: schedule.filter(day => day.weekDay),
          },
        },
        async () => {
          const { quiz } = this.state;
          const { submitQuiz } = this.props;
          await submitQuiz(quiz);
        }
      );
    // }
  };

  goToQuizDoneScreen = () => {
    const { navigation } = this.props;
    Alert.alert(strings("secondQuiz.dataIsSent1"), strings("secondQuiz.dataIsSent2"), [
      {
        text: "OK",
        onPress: () => {navigation.navigate(PROFILE_SCREEN)}
      }
    ]);
  };

  onSideMenu = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
    const { currentScreenIndex, quiz } = this.state;

    return (
      <ContainerWrapper>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <Header
              title={strings("secondQuiz.secondQuizTitle")}
              dotsButton={currentScreenIndex == 0 ? true : false}
              leftText={currentScreenIndex > 0 ? strings("consultation.back") : null}
              rightText={currentScreenIndex > 0 && currentScreenIndex !== 10 ? strings("firstQuiz.next") : null}
              onLeftPress={
                currentScreenIndex > 0
                  ? () => {
                    Transition.show(
                      this.screenList[currentScreenIndex - 1](
                        quiz[this.nameList[currentScreenIndex - 1]]
                      ),
                      SlideRight
                    );
                    this.setState({ currentScreenIndex: currentScreenIndex - 1 });
                  }
                  : () => {this.onSideMenu()}
              }
              onRightPress={
                currentScreenIndex > 0
                  ? () => {
                    Transition.show(
                      this.screenList[currentScreenIndex + 1](quiz[this.nameList[currentScreenIndex + 1]]),
                      SlideLeft,
                    );
                    this.setState({ currentScreenIndex: currentScreenIndex + 1 });
                  }
                  : () => {}
              }
            />

            <TransitionWrapper>
              <Transition>{this.screenList[0]()}</Transition>
            </TransitionWrapper>

            <Line
              style={{
                width: '90%',
                alignSelf: 'center',
              }}
            />

            <DotsContainer selectedDotIndex={currentScreenIndex} />
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </ContainerWrapper>
    );
  }
}

SecondQuizScreen.defaultProps = {
  submitQuiz: () => {},
};

SecondQuizScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};
