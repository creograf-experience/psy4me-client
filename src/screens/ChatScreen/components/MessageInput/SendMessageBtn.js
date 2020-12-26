import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import {
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import {
  updateMessages,
  sendChatToServer,
  sendMessageToServer,
  updateMessagesChatId,
} from '../../../../actions';
import asyncStore from '../../../../utils/asyncStore';
import { colors } from '../../../../constants';

class SendMessageBtn extends PureComponent {
  state = {
    queueMessages: [],
    firstMessage:{},
    isWaitingForChat: false,
  }

  async componentDidUpdate(prevProps) {
    const { chat, sendMessageToServer, updateMessagesChatId } = this.props;
    const { queueMessages } = this.state;

    if (chat._id && !prevProps.chat._id) {
      updateMessagesChatId(chat._id);
      if(this.state.firstMessage){
        await asyncStore.saveMessage(this.state.firstMessage)
      }
      queueMessages.length && queueMessages.map(message =>
        sendMessageToServer(
          this.createSocketMessageObject(message)
        )
      );

      this.setState({ queueMessages: [] });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.sendMessage} style={styles.inputBtn}>
        <Image
          source={require('../../../../../assets/images/icons/sent-mail.png')}
          style={{ width: 35, height: 35, tintColor:colors.background, backgroundColor:colors.hintColor,resizeMode:'contain',borderRadius:10}}
        />
      </TouchableOpacity>
    );
  }

  sendMessage = () => {
    const { isWaitingForChat } = this.state;
    const {
      chat,
      resetContent,
      updateMessages,
      sendChatToServer,
      sendMessageToServer,
      setShouldScroll,
    } = this.props;
    
    if (!this.validateNewMessageData()) return;
    
    const newMessage = this.createNewMessage();
    if (!chat._id && isWaitingForChat) {
      this.addMessageToQueue(newMessage);
    }

    if (!chat._id && !isWaitingForChat) {
      this.setState({firstMessage:newMessage});
      sendChatToServer(
        this.createSocketChatObject()
      );
      this.setState({ isWaitingForChat: true });
    }

    chat._id && sendMessageToServer(
      this.createSocketMessageObject(newMessage)
    );

    setShouldScroll(true);
    updateMessages(newMessage);
    resetContent();
  }

  addMessageToQueue = message => {
    const { queueMessages } = this.state;
    this.setState({ queueMessages: message, ...queueMessages });
  };

  createSocketMessageObject = message => {
    const { chat } = this.props;

    return {
      chatId: chat._id,
      uuid: message._id,
      mirrorId: chat.mirrorId,
      message: message.content.message && message.content.message,
      attachment: message.content.attachments
    };
  };

  createSocketChatObject = () => {
    const {
      message,
      psyshProfile
    } = this.props;

    return {
      content: {
        message: (message && message).trim(),
        type:'client',
        attachment: this.buildAttachment(),
      },
      receiver: {
        type:'psych',
        phone: psyshProfile.phoneMask,
        id:psyshProfile._id,
        consultationChat:false
      },
    };
  };

  createNewMessage = () => {
    const { message, chat, profile, userID } = this.props;

    return {
      _id: uuidv4(),
      chatId: chat && chat._id ? chat._id : null,
      createdAt: Date.now(),
      from: profile.phoneMask.slice(1),
      fromId: userID,
      content: {
        message: (message && message).trim(),
        attachments: this.buildAttachment(),
      },
    };
  };

  buildAttachment = () => {
    const image = this.attachImage();
    return image
  };

  attachImage = () => {
    const { image } = this.props;
    return image && { photo: `data:image/jpg;base64,${image.base64}` };
  };

 

  validateNewMessageData = () => {
    const { message, image} = this.props;
    return message.trim() !== '' || image;
  }
}

const styles = StyleSheet.create({
  inputBtn: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  profile:state.profile.profile,
  userID: state.profile.userID
});

SendMessageBtn.propTypes = {
  chat: PropTypes.object.isRequired,
  message: PropTypes.string,
  resetContent: PropTypes.func.isRequired,
  updateMessages: PropTypes.func.isRequired,
  sendChatToServer: PropTypes.func.isRequired,
  sendMessageToServer: PropTypes.func.isRequired,
  setShouldScroll: PropTypes.func.isRequired,
  image: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  })
};

export default connect(
  mapStateToProps,
  {
    updateMessages,
    sendChatToServer,
    sendMessageToServer,
    updateMessagesChatId,
  }
)(SendMessageBtn);
