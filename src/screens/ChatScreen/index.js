import { connect } from 'react-redux';
import ChatScreenComponent from './ChatScreen';
import { activeChatWithDefaulValue, clearMessages,clearActiveChats,clearSkips } from '../../actions';

const mapStateToProps = state => ({
  activeChat:activeChatWithDefaulValue(state),
  chatList:state.chats.chatList,
  messages: state.messages.messagesList,
});

const mapDispatchToProps = dispatch => ({
  clearMessages: () => {
    dispatch(clearMessages())
  },
  clearActiveChats: () => {
    dispatch(clearActiveChats())
  },
  clearSkips: () => {
    dispatch(clearSkips())
  }
});

export const ChatScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreenComponent);