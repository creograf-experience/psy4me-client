import { createAction } from "redux-actions";
import { fetchMessages } from "../networkers";
import { AsyncStorage } from "react-native";
import { ConsultInfoScreenWrapper } from "../screens/SecondQuizScreen/components";

export const getMessages = createAction('GET_MESSAGES');
export const setMessage = createAction('SET_MESSAGE');
export const clearMessage = createAction('CLEAR_MESSAGE');
export const updateMessage = createAction('UPDATE_MESSAGE');
export const updateMessageChatId = createAction('UPDATE_MESSAGE_CHAT_ID')
export const deleteMessage = createAction('DELETE_MESSAGE');
export const receiveMessage = createAction('RECEIVE_MESSAGE');
export const receivePrivateMessage = createAction('RECEIVE_PRIVATE_MESSAGE');
export const clearSkip = createAction('CLEAR_SKIP');

export const getAllMessages = chatId => async(dispatch, getState) => {
  try {
    const { limit, skip } = getState().messages;
    const token = await AsyncStorage.getItem('jwt');
    const res = await fetchMessages(chatId,limit,skip,token);
    res.messages.sort((a,b)=>a.createdAt>b.createdAt ? 1 : -1)
    dispatch(getMessages(res));
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const sendMessageToServer = data => (dispatch, getState) => {
  const { socket } = getState().socket;
  if(!socket) return;

  socket.emit('create message', data);
};

export const deleteMessages = data => (dispatch, getState) => {
  const { messagesList } = getState().messages;
  const prevMessage = messagesList[messagesList.length - 2];

  dispatch(deleteMessage({
    _id: data._id,
    chatId: data.chatId,
    latestMessage: prevMessage
  }));

  const { socket } = getState().socket;
  if(!socket) return;

  socket.emit('delete message', data);
};

export const updateMessages = message => dispatch => (
  dispatch(updateMessage(message))
);

export const updateMessagesChatId = chatId => dispatch => (
  dispatch(updateMessageChatId({chatId}))
);

export const clearMessages = () => dispatch => (
  dispatch(clearMessage())
);

export const clearSkips = () => dispatch => (
  dispatch(clearSkip())
);

export const setMessages = messages => dispatch => (
  dispatch(setMessage(messages))
);