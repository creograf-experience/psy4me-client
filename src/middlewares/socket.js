import * as config from '../constants/config';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';

import {
  connectionSocket,
  disconnectionSocket,
  setSocket,
  setSocketConnection,
  receiverChat,
  senderChat,
  receiveMessage,
  loginUser,
  receivePrivateMessage,
} from '../actions';
import asyncStore from '../utils/asyncStore';

export default store => next => async action => {
  if (action.type === 'DISCONNECTION_SOCKET') {
    const { socket } = store.getState().socket;
    if(!socket) return;
    
    socket.close();

    store.dispatch(setSocket());
    store.dispatch(setSocketConnection(false));
  }

  if(action.type === 'CONNECTION_SOCKET'){
    let { socket } = store.getState().socket;
    
    if(socket) return;

    const token = await AsyncStorage.getItem('jwt');

    socket = io('http://derjava.creograf.ru');
    
    socket.on('connect', () => {
      store.dispatch(setSocketConnection(true));
      if(token) {
        socket.emit('init user',token);
      }
    });

    socket.on('dissconnect', () => {
      console.log('disconnect client');
      store.dispatch(disconnectionSocket());
    });
    
    socket.on('receive init user', user =>
      store.dispatch(loginUser(user))
    );

    socket.on('sender chat', senderChats => {
      store.dispatch(senderChat(senderChats))
    });

    socket.on('receiver chat', receiverChats =>
      store.dispatch(receiverChat(receiverChats))
    );

    socket.on('receive message', async senderMessage => {
      await asyncStore.saveMessage(senderMessage);
      store.dispatch(receiveMessage(senderMessage))
    });

    socket.on('receive private message', async receiverMessage => {
      const { activeChat,activeConsChat } = store.getState().chats;
      
      await asyncStore.saveMessage(receiverMessage);

      store.dispatch(receivePrivateMessage({receiverMessage,activeConsChat,activeChat}))
    });

    socket.on('err', msg => console.error(msg));
    store.dispatch(setSocket(socket));
  }
  return next(action);
}