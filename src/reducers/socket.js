import { handleActions } from 'redux-actions';
import {setSocketConnection,setSocket} from '../actions';

const initialState = {
  isSocketConnected: false,
  socket: null
};

export const socket = handleActions(
  {
    [setSocket](state,{payload}){
      return {
        ...state,
        socket:payload
      }
    },
    [setSocketConnection](state,{payload}){
      return {
        ...state,
        isSocketConnected:payload
      }
    }
  },
  initialState
);