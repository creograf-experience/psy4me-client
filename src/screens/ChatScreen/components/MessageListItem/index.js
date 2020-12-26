import React, { PureComponent, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';

import shouldGroupSameDateMsg from '../../../../utils/shouldGroupSameDateMsg';
import MessageBox from './MessageBox';
import MessageHistoryDate from './MessageHistoryDate';

class MessageListItem extends PureComponent {
  render() {
    const {
      message,
      index,
      messagesList,
      chat,
      userID
    } = this.props;

    const prevMessage = messagesList[index-1];

    return (
      <>
        <MessageHistoryDate 
          date={message.createdAt}
          index={index}
          messagesList={messagesList}
        />
        <View style={styles.container(message.fromId,userID)}>
          <MessageBox 
            message={message}
            index={index}
            messagesList={messagesList}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: (msgFromID,userID) => ({
    flexDirection: 'row',
    justifyContent:  msgFromID === userID 
    ? 'flex-end'
    : 'flex-start',
    marginHorizontal: 10,
  }),
});

const mapStateToProps = state => ({
  userID:state.profile.userID
});

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  messagesList: PropTypes.array.isRequired,
  chat: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(MessageListItem);