import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  Image,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';

import Autolink from 'react-native-autolink';

import { deleteMessages } from '../../../../actions';
import asyncStore from '../../../../utils/asyncStore';
import { messages } from '../../../../reducers/messages';
import { mediaHost, IMAGE_FULL_SCREEN } from '../../../../constants';

import { strings } from "../../../../../locale/i18n";

class MessageContent extends PureComponent {
  state = {
    loading: false,
  };

  withText = () => {
    const { message, userID } = this.props;

    return (
      <View style={[styles.container(message.fromId,userID), styles.addShadow]}>
        <Autolink
          style={styles.messageText(message.fromId,userID)}
          text={message.content.message}
        />
      </View>
    );
  };

  withImageAttachment = () => {
    const { message, navigation, userID, deleteMessages } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(IMAGE_FULL_SCREEN,{image:message.content.attachments.photo,imageName:message.content.attachments.imageName})}
        onLongPress={() => Alert.alert(
          strings("chat.chatDelete"),
          strings("chat.chatDelQuestion"),
          [
            { text: strings("chat.chatDelete"), 
              onPress: async () => {
                deleteMessages({ chatId: message.chatId, _id: message._id }),
                await asyncStore.deleteMesInChat(`chat-${message.chatId}`,message._id)
              }
            },
            { text: strings("secondQuiz.no"), style: 'cancel' }
          ],
          { cancelable: true }
        )}
        activeOpacity={0.6}
      >
        { this.imageWithShadow[Platform.OS](message, userID) }
      </TouchableOpacity>
    );
  };

  imageWithShadow = {
    ios: (message, userID) => (
      <View style={styles.addShadow}>
        <View style={styles.attachment(message.fromId,userID)}>
          { this.imageWithLoading() }
        </View>
      </View>
    ),
    android: (message, userID) => (
      <View style={[styles.attachment(message.fromId,userID), styles.addShadow]}>
        { this.imageWithLoading() }
      </View>
    ),
  };

  imageWithLoading = () => {
    const { loading } = this.state;
    const { message } = this.props;

    return (
      <>
        {
          loading && <ActivityIndicator
            size="small"
            color="black"
            style={{ position: 'absolute', top: 75, left: 75, right: 75, bottom: 75 }}
          />
        }
        <Image 
          source={{ uri:message.content.attachments.imageName ? `${mediaHost}/${message.content.attachments.imageName}.jpg` : message.content.attachments.photo }}
          resizeMethod="resize"
          style={{ width: 150, height: 150 }}
          onLoadStart={() => this.setState({ loading: true })}
          onLoad={() => this.setState({ loading: false })}
        />
      </>
    );
  };

  withTextAndAttachment = () => {
    const { message, navigation, userID } = this.props;

    return (
      <>
        <View style={[styles.container(message.fromId,userID), styles.addShadow]}>
          <Autolink
            style={[styles.messageText(message.fromId,userID), { marginBottom: 10 }]}
            text={message.content.message}
          />

          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(IMAGE_FULL_SCREEN,{image:message.content.attachments.photo,imageName:message.content.attachments.imageName})}
              activeOpacity={0.6}
            >
              {this.imageWithLoading()}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  renderAttachment = () => {
    const { content } = this.props.message;

    if (content.attachments && content.attachments.photo) {
      return this.withImageAttachment();
    }
  };

  render() {
    const { message } = this.props;
    return (
      <>
        {
            message.content.message && message.content.attachments
            ? this.withTextAndAttachment()
            : !message.content.attachments
                ? this.withText()
                : !message.content.message
                    ? this.renderAttachment()
                    : null
        }
      </>
    );
  };
};

const styles = StyleSheet.create({
  attachment: (msgFromID,userID) => ({
    overflow: 'hidden',
    borderRadius: 15,
    borderTopLeftRadius: msgFromID === userID ? 15 : 0,
    borderTopRightRadius: msgFromID === userID ? 0 : 15,
    backgroundColor: 'white',
  }),

  messageText: (msgFromID,userID) => ({
    fontSize: 15,
    color: msgFromID === userID ? 'black' : 'black',
  }),

  container: (msgFrom ) => ({
    paddingVertical: 10,
    paddingHorizontal: 20,

    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    backgroundColor: '#f5f5f5',
  }),

  addShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});

const mapStateToProps = state => ({
  userID:state.profile.userID
});

MessageContent.propTypes = {
  message: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { deleteMessages })(withNavigation(MessageContent));