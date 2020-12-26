import { handleActions } from 'redux-actions';
import { 
  getAllChats,
  receiverChat,
  senderChat,
  setActiveChat,
  clearActiveChat,
  receiveMessage,
  receivePrivateMessage,
  deleteMessage,
  setActiveConsChat,
  clearActiveConsChat
} from '../actions';

const initialState = {
  chatList: [],
  activeChat: null,
  activeConsChat: null
};

export const chats = handleActions(
  {
    [getAllChats](state,{payload}){
      return {
        ...state,
        chatList:payload.chats
      }; 
    },
    [setActiveChat](state,{payload}){
      return {
        ...state,
        activeChat:payload,
      }; 
    },
    [clearActiveChat](state,{payload}){
      return {
        ...state,
        activeChat:null,
      }; 
    },
    [setActiveConsChat](state,{payload}){
      return {
        ...state,
        activeConsChat:payload,
      }; 
    },
    [clearActiveConsChat](state,{payload}){
      return {
        ...state,
        activeConsChat:null,
      }; 
    },
    [receiverChat](state,{payload}){
      return {
        ...state,
        chatList:[payload,...state.chatList],
      }; 
    },
    [senderChat](state,{payload}){
      return {
        ...state,
        chatList:[payload,...state.chatList],
        activeChat:!payload.consultationChat ? payload : null,
        activeConsChat: payload.consultationChat ? payload : null
      }; 
    },
    [deleteMessage](state,{payload}){
      const updatedList = state.chatList.map(chat => {
        if( chat._id === payload.chatId && 
           (chat.latestMessage._id === payload._id || chat.latestMessage.uuid === payload._id)
        ) {
          return { ...chat, latestMessage:payload.latestMessage ? payload.latestMessage : null }
        }
        return chat;
      });
      return {
        ...state,
        chatList:updatedList
      };
    },
    [receiveMessage](state,{payload}){
      const chat = findChat(payload.chatId, state.chatList);
      const updatedChat = {
        ...chat,
        latestMessage: payload,
      };
      const updatedList = deleteOriginalChat(updatedChat._id, state.chatList)
      return {
        ...state,
        chatList: [updatedChat, ...updatedList],
      }; 
    },
    [receivePrivateMessage](state,{payload}){
      const chat = findChat(payload.receiverMessage.chatId, state.chatList);
     
      const updatedChat = {
        ...chat,
        latestMessage: payload.receiverMessage,
      };

      const updatedList = deleteOriginalChat(updatedChat._id, state.chatList);

      return {
        ...state,
        chatList: [updatedChat, ...updatedList],
      };
    }
  },
  initialState
);

const findChat = (chatId, chatList) => 
  chatList.find(chat => chat._id === chatId);

const deleteOriginalChat = (updatedChatId, chatList) =>
  chatList.filter(chat => chat._id !== updatedChatId);