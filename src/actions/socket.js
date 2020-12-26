import { createAction } from "redux-actions";

export const connectionSocket = createAction('CONNECTION_SOCKET');
export const disconnectionSocket = createAction('DISCONNECTION_SOCKET');

export const setSocketConnection = createAction('SET_SOCKET_CONNECTION');
export const setSocket = createAction('SET_SOCKET');

export const connectSocket = () => dispatch => {
  dispatch(connectionSocket());
}  

export const disconnectSocket = () => dispatch => {
  dispatch(disconnectionSocket());
}  
