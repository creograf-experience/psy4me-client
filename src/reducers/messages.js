import { handleActions } from 'redux-actions';
import { 
  getMessages,
  clearMessage,
  updateMessage,
  clearSkip,
  deleteMessage,
  updateMessageChatId,
  setMessage,
  receivePrivateMessage
} from '../actions';

import { messagesConfig } from '../constants';

const initialState = {
  messagesList: [],
  limit:  messagesConfig.maxLength,
  skip: 0
};

export const messages = handleActions(
  {
    [getMessages](state,{payload}){
      return {
        ...state,
        messagesList:[...payload.messages,...state.messagesList],
        skip: state.skip + state.limit
      };
    },
    [setMessage](state,{payload}){
      return {
        ...state,
        messagesList: payload,
        skip: payload.length
      };
    },
    [updateMessage](state,{payload}){
      return {
        ...state,
        messagesList: [...state.messagesList, payload],
        skip: state.skip+1,
      };
    },
    [deleteMessage](state,{payload}){
      return {
        ...state,
        messagesList: state.messagesList.filter(message => message._id !== payload._id),
        skip: state.skip > 0 ? state.skip - 1 : state.skip
      };
    },
    [updateMessageChatId](state,{payload}){
      return {
        ...state,
        messagesList: state.messagesList.map(message => {
          if(!message.chatId) {
            message.chatId = payload.chatId;
            return message;
          }
          return message
        })
      };
    },
    [receivePrivateMessage](state,{payload}){
      if (
        (payload.activeChat &&
        payload.activeChat._id === payload.receiverMessage.chatId) ||
        (payload.activeConsChat &&
          payload.activeConsChat._id === payload.receiverMessage.chatId)
      )
      {
        return {
          ...state,
          messagesList: [...state.messagesList, payload.receiverMessage],
          skip: state.skip + 1,
        };
      }
  
      return state;
    },
    [clearMessage](state,{payload}){
      return {
        ...state,
        messagesList: []
      };
    },
    [clearSkip](state,{payload}){
      return {
        ...state,
        skip:0
      }
    }
  },
  initialState
);