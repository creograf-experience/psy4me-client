import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ScrollView,
  RefreshControl,
  AsyncStorage
} from 'react-native';

import {
  getAllMessages,
  clearMessages,
  clearSkips,
  setMessages,
  clearActiveConsChats
} from '../../../actions';
import asyncStore from '../../../utils/asyncStore';
import { Spinner } from '../../../components';
import MessageListItem from './MessageListItem';

class MessageList extends PureComponent {
  state = {
    refreshing: false,
    loading: false
  };

  scrollViewRef = null;

  async componentDidMount(){
    const { chat, getAllMessages, clearActiveConsChats } = this.props;
    if (!chat._id) return;
    this.setState({ loading: true });
    clearActiveConsChats();
    const initMessages = async () => {
      this.setState({ loading: true });
      const res = await getAllMessages(chat._id);

      await asyncStore.saveMessages(res.messages, chat._id);
      this.setState({ loading: false });
    };
    
    const messages = await asyncStore.getMessages(`chat-${chat._id}`);
    //if (!messages || messages.length===0) {
      await initMessages();
      this.setState({ loading: false });
      return;
    //}

    this.props.setMessages(messages);
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps) {
    const { isSocketConnected, chat, clearMessages, getAllMessages, clearSkips } = this.props;
    if (prevProps.isSocketConnected && !isSocketConnected) {
      console.log('SOCKET IS GONE');
      if (!await AsyncStorage.getItem('jwt')) return;

      this.setState({ loading: true });
      clearMessages();
      clearSkips();
      const res = await getAllMessages(chat._id);
      await asyncStore.saveMessages(res.messages, chat._id);
      this.setState({ loading: false });
    };
  }

  renderMessages = () => {
    const { messages, chat } = this.props;

    return (
      messages.map((message, index) => (
        <MessageListItem
          key={message._id}
          message={message}
          index={index}
          messagesList={messages}
          chat={chat}
        />
      ))
    );
  }

  setReference = ref => {
    const { setScrollViewRef } = this.props;

    this.scrollViewRef = ref;
    setScrollViewRef(ref);
  }

  onRefresh = async () => {
    const { chat, getAllMessages, setShouldScroll } = this.props;
    if (!chat._id) return;

    setShouldScroll(false);
    
    this.setState({ refreshing: true });
    await getAllMessages(chat._id);
    this.setState({ refreshing: false });
  }

  handleContentSizeChange = () => {
    const { shouldScroll } = this.props;
    if (shouldScroll) {
      this.scrollViewRef.scrollToEnd({ animated: false });
    }
  }

  render(){
    const { refreshing, loading } = this.state;

    if(loading) return <Spinner/>;

    return (
      <ScrollView
        contentContainerStyle={{paddingBottom:40}}
        ref={this.setReference}
        onContentSizeChange={this.handleContentSizeChange}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        }
        keyboardDismissMode="on-drag"
      >
        {this.renderMessages()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messagesList,
  isSocketConnected: state.socket.isSocketConnected,
});

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  chat: PropTypes.object.isRequired,
  setScrollViewRef: PropTypes.func.isRequired,
  shouldScroll: PropTypes.bool.isRequired,
  getAllMessages: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  clearSkips: PropTypes.func.isRequired,
  clearActiveConsChats: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getAllMessages, clearMessages, clearSkips, setMessages, clearActiveConsChats })(MessageList);