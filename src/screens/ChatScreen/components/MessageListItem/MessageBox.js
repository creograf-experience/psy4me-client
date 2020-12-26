import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';

import { deleteMessages } from '../../../../actions';

import shouldGroupSameDateMsg from '../../../../utils/shouldGroupSameDateMsg';
import formatMessageDate from '../../../../utils/formatMessageDate';

import MessageContent from './MessageContent';
import asyncStore from '../../../../utils/asyncStore';

import { strings } from "../../../../../locale/i18n";

const MessageBox = ({ message, messagesList, index, deleteMessages, userID }) => {
  const prevMessage = messagesList[index - 1];
  return (
    <View style={styles.messageBox}>
      {
        shouldGroupSameDateMsg(message, prevMessage)
          ? null
          : <Text style={styles.messageDate(message.fromId,userID)}>
              { formatMessageDate(message.createdAt) }
            </Text>
      }
      <TouchableWithoutFeedback
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
      >
        <View>
          <MessageContent message={ message } />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    maxWidth: '80%',
    margin: 5
  },

  messageDate: (msgFromID,userID) => ({
    textAlign: msgFromID === userID ? 'right' : 'left',
    color: '#a4a4a4',
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom:2
  }),
});

const mapStateToProps = state => ({
  userID:state.profile.userID
});

MessageBox.propTypes = {
  message: PropTypes.object.isRequired,
  messagesList: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { deleteMessages })(MessageBox);
