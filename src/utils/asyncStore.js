import { AsyncStorage } from 'react-native';
import { messagesConfig } from '../constants';

async function saveMessage(msg) {
  try {
    const messages = await getMessages(`chat-${msg.chatId}`);

    if(!messages){
      await AsyncStorage.setItem(`chat-${msg.chatId}`, JSON.stringify([msg]));
      return;
    }

    let newMessages = [];

    if(messages.length < messagesConfig.maxLength) {
      newMessages = JSON.stringify([...messages,msg]);
    } else {
      newMessages = JSON.stringify([...messages.slice(1),msg]);
    }

    await AsyncStorage.setItem(`chat-${msg.chatId}`,newMessages);
  } catch (err) {
    console.warn(err);
  }
}

async function saveMessages(messages, chatId) {
  try {
    const messagesJSON = JSON.stringify(messages);
    await AsyncStorage.setItem(`chat-${chatId}`,messagesJSON);
  } catch (err) {
    console.warn(err)
  }
}

async function getMessages(itemId) {
  try {
    const messages = await AsyncStorage.getItem(itemId);
    return JSON.parse(messages);
  } catch (err) {
    console.warn(err)
  }
}

async function deleteMesInChat(chatId,mesId) {
  try {
    const messages = await AsyncStorage.getItem(chatId);
    const deleteMes = JSON.parse(messages).filter(el=>el._id!==mesId);
    const messagesJSON = JSON.stringify(deleteMes);
    await AsyncStorage.setItem(chatId,messagesJSON);
  } catch (err) {
    console.warn(err)
  }
}

export default {
  saveMessage,
  saveMessages,
  getMessages,
  deleteMesInChat
};