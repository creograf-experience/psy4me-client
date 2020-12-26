import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Attachment = ({ image, resetAttachment }) => (
  <View style={styles.container}>
    <ImageBackground
      source={{uri: image.uri}}
      style={styles.image}
      imageStyle={{ borderRadius: 10 }}
    >

      <View style={styles.attachment}>
        <TouchableOpacity onPress={resetAttachment}>
          <Image
            source={require('../../../../../assets/images/icons/closeIcon.png')}
            style={{width: 15, height: 15,tintColor:'black'}}
          />
        </TouchableOpacity>
      </View>

    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  attachment: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  image: {
    width: 100,
    height: 100,
    margin: 3,
  },
});

Attachment.propTypes = {
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  resetAttachment: PropTypes.func.isRequired,
};

export default Attachment;
