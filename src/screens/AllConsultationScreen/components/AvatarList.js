import React from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

import {
  Avatar,
} from '../../../components';
import { IconContainer } from '../../../containers/IconContainer';
import {colors} from '../../../constants';

export const AvatarList = ({ avatar }) => (
  <View style={styles.avatarView}>
    {
      avatar ? (
        <Image
          style={{width:70,height:70,borderRadius:25}}
          source={avatar}
        />
      ) : (
        <View style={{alignItems:'center'}}>
          <IconContainer
            name="cameraIcon"
          />
        </View>
      )
    }
  </View>
);

const styles=StyleSheet.create({
  avatarView:{
    height: 70,
    backgroundColor: colors.transparentColorPrimary,
    width:70,
    borderRadius: 25,
    justifyContent: 'center',
  }
})