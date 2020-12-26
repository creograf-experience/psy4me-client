import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ActivityIndicator } from 'react-native';

import {
  FullScreenImageWrapper,
} from '../components';


export const FullScreenImage = ({
  images,
  index,
  visible,
  onCancel,
}) => (
  <FullScreenImageWrapper
    visible={visible}
    transparent
  >
    <ImageViewer
      imageUrls={images}
      index={index}
      onCancel={onCancel}
      enableSwipeDown
      loadingRender={() => <ActivityIndicator />}
      enablePreload
      saveToLocalByLongPress={false}
    />
  </FullScreenImageWrapper>
);
