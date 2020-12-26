import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reactotron from './reactotronConfig';

import combinedReducers from './src/store';

import { RootScreen } from './src/screens';

import socketMiddleware from './src/middlewares/socket';

//ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

export const store = Reactotron.createStore(combinedReducers, {}, applyMiddleware(ReduxThunk, socketMiddleware));

console.disableYellowBox = true;


export default class App extends Component {
  state = {
    isReady: false,
  };

  loadAsync = async () => {
    await Font.loadAsync({});
    await Asset.loadAsync([
      require('./assets/images/logos/logo.png'),
      require('./assets/images/icons/addIcon.png'),
      require('./assets/images/icons/binIcon.png'),
      require('./assets/images/icons/cameraIcon.png'),
      require('./assets/images/icons/chatIcon.png'),
      require('./assets/images/icons/clientsIcon.png'),
      require('./assets/images/icons/consultationIcon.png'),
      require('./assets/images/icons/dotsIcon.png'),
      require('./assets/images/icons/facebookIcon.png'),
      require('./assets/images/icons/instagramIcon.png'),
      require('./assets/images/icons/keyholeIcon.png'),
      require('./assets/images/icons/phoneIcon.png'),
      require('./assets/images/icons/profileIcon.png'),
      require('./assets/images/icons/selectArrowIcon.png'),
      require('./assets/images/icons/vkIcon.png'),
      require('./assets/images/icons/closeIcon.png'),
      require('./assets/images/icons/arrowLeft.png'),
      require('./assets/images/icons/arrowRight.png'),
      require('./assets/images/icons/starActive.png'),
      require('./assets/images/icons/starNoActive.png'),
      require('./assets/images/icons/videoIcon.png'),
      require('./assets/images/icons/add-document.png'),
      require('./assets/images/icons/sent-mail.png')
    ]);
  };

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <RootScreen />
      </Provider>
    );
  }
}
