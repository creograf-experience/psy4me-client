import { connect } from 'react-redux';
import ConsChatScreenComponent from './ConsChatScreen';
import { activeConsChatWithDefaulValue, clearMessages,clearActiveConsChats,clearSkips } from '../../actions';

const mapStateToProps = state => ({
  activeConsChat:activeConsChatWithDefaulValue(state),
  chatList:state.chats.chatList,
  messages: state.messages.messagesList,
});

const mapDispatchToProps = dispatch => ({
  clearMessages: () => {
    dispatch(clearMessages())
  },
  clearActiveConsChats: () => {
    dispatch(clearActiveConsChats())
  },
  clearSkips: () => {
    dispatch(clearSkips())
  }
});

export const ConsChatScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsChatScreenComponent);