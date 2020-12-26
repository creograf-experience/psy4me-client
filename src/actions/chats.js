import { fetchAllChats } from '../networkers';
import { createAction } from 'redux-actions';

export const getAllChats = createAction('GET_ALL_CHATS');
export const receiverChat = createAction('RECEIVER_CHAT');
export const senderChat = createAction('SENDER_CHAT');
export const setActiveChat = createAction('SET_ACTIVE_CHAT');
export const clearActiveChat = createAction('CLEAR_ACTIVE_CHAT');
export const setActiveConsChat = createAction('SET_ACTIVE_CONS_CHAT');
export const clearActiveConsChat = createAction('CLEAR_ACTIVE_CONS_CHAT');

export const getUserChats = token => async (dispatch) => {
  try {
    const { chats } = await fetchAllChats(token);
    dispatch(getAllChats({chats}));
  } catch (err) {
    console.error(err);
  }
};

export const sendChatToServer = data => (dispatch, getState) => {
  const { socket } = getState().socket;
  if(!socket) return;

  socket.emit('create chat', data);
};

export const setActiveChats = chat => dispatch => (
  dispatch(setActiveChat(chat))
);

export const clearActiveChats = () => dispatch => (
  dispatch (clearActiveChat())
);

export const setActiveConsChats = chat => dispatch => (
  dispatch(setActiveConsChat(chat))
);

export const clearActiveConsChats = () => dispatch => (
  dispatch (clearActiveConsChat())
);

export const activeChatWithDefaulValue = state =>
  state.chats.activeChat || { withWho: {}, isBlocked: false, isMirrorBlocked: false };

  export const activeConsChatWithDefaulValue = state =>
  state.chats.activeConsChat || { withWho: {}, isBlocked: false, isMirrorBlocked: false };  