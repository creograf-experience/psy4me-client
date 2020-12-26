import React, { PureComponent } from 'react';
import {
  ScrollView,
  Animated,Easing
} from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
  SafeAreaView,
  StackActions,
  NavigationActions
} from 'react-navigation';

import { store } from '../../App';
import {
  ProfileScreen,
  FirstQuizScreen,
  SecondQuizScreen,
  ConsultantSelectingScreen,
  YourPsychScreen,
  RecordPsychScreen,
  ChooseTimeRecordPsychScreen,
  PaymentScreen,
  AllConsultationScreen,
  ConsultationScreen,
  ChatScreen,
  ConsChatScreen
} from '../screens';
import {
  PROFILE_SCREEN,
  FIRST_QUIZ_SCREEN,
  SECOND_QUIZ_SCREEN,
  PROFILE_STACK,
  SECOND_QUIZ_STACK,
  CONSULTANT_SELECTING_SCREEN,
  CONSULTANT_SELECTING_STACK,
  YOUR_PSYCH_SCREEN,
  RECORD_PSYCH_SCREEN,
  colors,
  mediaHost,
  CHOOSE_TIME_RECORD_PSYCH_SCREEN,
  PAYMENT_SCREEN,
  ALL_CONSULTATION_SCREEN,
  ALL_CONSULTATION_STACK,
  CONSULTATION_SCREEN,
  CHAT_SCREEN,
  IMAGE_FULL_SCREEN,
  CONS_CHAT_SCREEN,
  PAYMENT_WIDGET
} from '../constants';
import {
  AvatarContainer, IconContainer,
} from '../containers';
import {
  AvatarWrapper,
  DotsButtonWrapper,
} from './components';
import { moderateScale } from 'react-native-size-matters';
import ImageFullScreen from '../screens/ImageFullScreen/ImageFullScreen';
import PaymentWidget from "../screens/PaymentScreen/PaymentWidget";

class CustomDrawerContentComponent extends PureComponent {
  onDotsPress = () => {
    const { navigation } = this.props;

    navigation.closeDrawer();
  };

  render() {
    const { profile } = store.getState();
    const { userID } = profile;
    const { props } = this;
    return (
      <ScrollView>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DotsButtonWrapper
            onPress={this.onDotsPress}
          >
            <IconContainer
              name="dotsIcon"
            />
          </DotsButtonWrapper>
          <AvatarWrapper>
            <AvatarContainer
              avatar={{ uri: `${mediaHost}/client/${userID}/avatar/avatar_${userID}.jpg` }}
            />
          </AvatarWrapper>
          <DrawerItems
            {...{...props,onItemPress:(routes)=>
            {
              const isButtonInCurrentStack = routes.focused;
              const routeName = routes.route.routes ? routes.route.routes[0].routeName : routes.route.routeName;
              if (isButtonInCurrentStack) {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName })],
                });
                props.navigation.dispatch(resetAction);
              } else {
                props.navigation.navigate(routeName);
              }
            }
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const ProfileStack = createStackNavigator(
  {
    [PROFILE_SCREEN]: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    [FIRST_QUIZ_SCREEN]: {
      screen: FirstQuizScreen,
      navigationOptions: {
        header: null,
      },
    },
    [SECOND_QUIZ_SCREEN]: {
      screen: SecondQuizScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: PROFILE_SCREEN,
  },
);

const SecondQuizStack = createStackNavigator(
  {
    [SECOND_QUIZ_SCREEN]: {
      screen: SecondQuizScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: SECOND_QUIZ_SCREEN,
  },
);

const ConsultantSelectingStack = createStackNavigator(
  {
    [YOUR_PSYCH_SCREEN]: {
      screen: YourPsychScreen,
      navigationOptions: {
        header: null,
      },
    },
    [RECORD_PSYCH_SCREEN]: {
      screen: RecordPsychScreen,
      navigationOptions: {
        header: null,
      },
    },
    [CHOOSE_TIME_RECORD_PSYCH_SCREEN]:{
      screen: ChooseTimeRecordPsychScreen,
      navigationOptions: {
        header: null
      }
    },
    [PAYMENT_SCREEN]:{
      screen: PaymentScreen,
      navigationOptions: {
        header: null
      }
    },
    [PAYMENT_WIDGET]:{
      screen: PaymentWidget,
      navigationOptions: {
        header: null
      }
    },
    [CHAT_SCREEN]:{
      screen: ChatScreen,
      navigationOptions: {
        header: null
      }
    },
    [IMAGE_FULL_SCREEN]:{
      screen: ImageFullScreen
    }
  },
  {
    initialRouteName: YOUR_PSYCH_SCREEN,
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
        },
    }),
  },
);

const AllConsultationStack = createStackNavigator(
  {
    [ALL_CONSULTATION_SCREEN]:{
      screen:AllConsultationScreen,
      navigationOptions: {
        header: null
      }
    },
    [CONSULTATION_SCREEN]:{
      screen:ConsultationScreen,
      navigationOptions: {
        header: null
      }
    },
    [CONS_CHAT_SCREEN]:{
      screen:ConsChatScreen,
      navigationOptions: {
        header: null
      }
    },
    [IMAGE_FULL_SCREEN]:{
      screen: ImageFullScreen
    }
  },
  {
    initialRouteName:ALL_CONSULTATION_SCREEN,
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
        },
    })
  }
)

const MainStack = createDrawerNavigator(
  {
    [PROFILE_STACK]: {
      screen: ProfileStack,
      navigationOptions: {
        drawerLabel: 'Профиль',
        drawerIcon: (
          <IconContainer
            name="profileIcon"
          />
        ),
      },
    },
    [SECOND_QUIZ_STACK]: {
      screen: SecondQuizStack,
      navigationOptions: {
        drawerLabel: 'Изменить анкету',
        drawerIcon: (
          <IconContainer
            name="chatIcon"
          />
        ),
      },
    },
    [CONSULTANT_SELECTING_STACK]: {
      screen: ConsultantSelectingStack,
      navigationOptions: {
        drawerLabel: 'Ваш психолог',
        drawerIcon: (
          <IconContainer
            name="clientsIcon"
          />
        ),
      },
    },
    [ALL_CONSULTATION_STACK]: {
      screen: AllConsultationStack,
      navigationOptions: {
        drawerLabel: 'Консультации',
        drawerIcon: (
          <IconContainer
            name="consultationIcon"
          />
        )
      },
    }
  },
  {
    initialRouteName:PROFILE_STACK,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      labelStyle: { color: colors.textColorPrimary },
    },
  }
);

export default MainStack;
