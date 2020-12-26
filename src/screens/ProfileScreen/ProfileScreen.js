import React, { PureComponent } from 'react';
import {AsyncStorage, ActivityIndicator, View, Button} from 'react-native';

import { ContainerWrapper, Spinner } from '../../components';
import {
  TextButton,
  AvatarContainer,
  Header,
  ExtendedField,
} from '../../containers';
import {
  ContentWrapper,
  AvatarWrapper,
  ActivityIndicatorWrapper,
  ButtonWrapper,
} from './components';
import {
  mediaHost,
  colors,
  AUTHENTICATION_STACK,
  FIRST_QUIZ_SCREEN,
  SECOND_QUIZ_SCREEN, PAYMENT_SCREEN,
} from '../../constants';
import { QuizField } from '../FirstQuizScreen/containers';
import { strings } from "../../../locale/i18n";
import WebView from "react-native-webview";


type Props = {};

export default class ProfileScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    const { userID, profile } = this.props;
    this.state = {
      userID,
      profile,
      loading: true,
      imageViewerVisible: false,
    };
    this.simpleFields = [
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
      },
      {
        placeholder: strings("profile.birthDay"),
        name: 'birthDay',
      },
      {
        placeholder: strings("profile.phone"),
        name: 'phoneMask',
      },
      {
        placeholder: strings("profile.email"),
        name: 'email',
      },
      {
        placeholder: strings("profile.country"),
        name: 'country',
      },
      {
        placeholder: strings("profile.city"),
        name: 'city',
      },
      {
        placeholder: strings("profile.language"),
        name: 'language',
      },
      {
        placeholder: strings("profile.timeZone"),
        name: 'timezone',
      },
    ];

    this.extendedFields = [
      {
        title: strings("profile.aboutMe"),
        name: 'aboutMe',
        type: 'string',
      },
      /*{
        title: 'Ваш психолог',
        name: 'psychSelection',
        type: 'string',
      },
       {
        title: 'Платежная информация',
        name: 'payInfo',
        type: 'string',
      },
      {
        title: 'Проблемы',
        name: 'troubles',
        type: 'stringArray',
      },
      {
        title: 'Психологическая помощь',
        name: 'consultingObject',
        type: 'string',
      },
      {
        title: 'Тип консультации',
        name: 'psychoHelp',
        type: 'string',
      },
      {
        title: 'Наличие депрессии',
        name: 'depression',
        type: 'string',
      },
      {
        title: 'Удобные для работы дни',
        name: 'schedule',
        type: 'schedule',
      }, */
    ];
  }

  async componentDidMount() {
    const {
      getID, getProfileData, fetchFirstQuiz, fetchSecondQuiz, getPsychs,
    } = this.props;
    const token = await AsyncStorage.getItem('jwt');
    await getID(token);
    await getProfileData(token);
    await fetchFirstQuiz(token);
    await fetchSecondQuiz(token);
    await getPsychs(token);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.userID && nextProps.profile) {
      const { userID, profile } = nextProps;
      // console.log(this.props.psychList);
      this.setState(
        {
          userID,
          profile,
        },
        () => this.setState({
          loading: false,
        })
      );
    }
  }

  onDotsPress = () => {
    const { navigation } = this.props;

    navigation.openDrawer();
  };

  handleDocumentPress = (index) => {
    this.setState({
      imageViewerVisible: true,
      // documentIndex: index,
    });
  };

  handleDocumentDismiss = () => {
    this.setState({
      imageViewerVisible: false,
    });
  };

  handleFirstQuizEditPress = () => {
    const { navigation } = this.props;

    navigation.navigate(FIRST_QUIZ_SCREEN);
  };

  handleSecondQuizEditPress = () => {
    const { navigation } = this.props;

    navigation.navigate(SECOND_QUIZ_SCREEN);
  };

  handleLogOutPress = async () => {
    const { logOut, navigation } = this.props;

    await logOut();
    navigation.navigate(AUTHENTICATION_STACK);
  };

  render() {
    const {
      userID, profile, loading,
    } = this.state;

    return (
      <ContainerWrapper>
        <Header
          dotsButton
          onLeftPress={this.onDotsPress}
          onRightPress={this.handleFirstQuizEditPress}
          rightText={strings("profile.edit")}
          title={strings("profile.profileTitle")}
        />

        {loading
          ? (
            <Spinner/>
          )
          : (
            <ContentWrapper contentContainerStyle={{alignItems: 'center'}}>
              <AvatarWrapper>
                <AvatarContainer
                  avatar={{uri: `${mediaHost}/client/${userID}/avatar/avatar_${userID}.jpg`}}
                />
              </AvatarWrapper>

              {this.simpleFields.map(({placeholder, name}, index) => (
                <QuizField
                  key={index}
                  type="immutable"
                  placeholder={placeholder}
                  value={profile[name]}
                />
              ))}

              {this.extendedFields.map(({title, name, type}, index) => (
                <ExtendedField
                  key={-index - 1}
                  title={title}
                  value={profile[name]}
                  type={type}
                  id={userID}
                  onPress={this.handleDocumentPress}
                />
              ))}

              <ButtonWrapper>
                <TextButton
                  textColor={colors.errorColor}
                  buttonText={strings("profile.quite")}
                  onPress={this.handleLogOutPress}
                />
              </ButtonWrapper>
            </ContentWrapper>
          )}

      </ContainerWrapper>
    );
  }
}

ProfileScreen.defaultProps = {};

/* <TextButton
              textColor={colors.colorPrimary}
              buttonText="Изменить личные данные"
              onPress={this.handleFirstQuizEditPress}
            />

            <TextButton
              textColor={colors.colorPrimary}
              buttonText="Изменить данные о профессии"
              onPress={this.handleSecondQuizEditPress}
            />
 */
