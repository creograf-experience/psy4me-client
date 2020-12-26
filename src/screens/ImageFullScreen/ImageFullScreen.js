import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { mediaHost } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { strings } from "../../../locale/i18n";

class ImageFullScreen extends PureComponent {
  
  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.hideUI) return { header: null };

    return {
      title: strings("fullImage.fullImageTitle"),
      headerTitleStyle: { color: 'white' },
      headerLeft:null,
      headerRight: (
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image
            source={require('../../../assets/images/icons/closeIcon.png')}
            style={{ width: 20, height: 20, tintColor:'white', marginRight:20 }}
          />
        </TouchableOpacity>
      ),
      headerTransparent: true,
      headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    };
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  }

  componentWillUnmount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar hidden />
        <TouchableWithoutFeedback onPress={() =>
          navigation.setParams({
            hideUI: navigation.state.params.hideUI ? !navigation.state.params.hideUI : true
          })
        }>
          <Image 
            source={{ uri: navigation.getParam('imageName') ? `${mediaHost}/${navigation.getParam('imageName')}.jpg` : navigation.getParam('image') }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

ImageFullScreen.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImageFullScreen;