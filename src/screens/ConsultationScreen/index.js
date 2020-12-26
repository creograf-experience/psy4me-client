import { connect } from 'react-redux';
import ConsultationScreenComponent from './ConsultationScreen';
import {setActiveConsChats} from '../../actions';

const mapStateToProps = state => ({
  activeConsChat:state.chats.activeConsChat
});

const mapDispatchToProps = dispatch => ({
  setActiveConsChats: (chat)=>{
    dispatch(setActiveConsChats(chat));
  },
});

export const ConsultationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultationScreenComponent);