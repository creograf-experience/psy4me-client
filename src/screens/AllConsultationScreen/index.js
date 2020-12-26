import { connect } from 'react-redux';
import AllConsultationScreenComponent from './AllConsultationScreen';
import { getAllConsultation } from './actions';
import { getUserChats,clearActiveConsChats } from '../../actions';

const mapStateToProps = state => ({
  allConsultations: state.consultations.allConsultations,
  chatList:state.chats.chatList,
  activeConsChat:state.chats.activeConsChat
});

const mapDispatchToProps = dispatch => ({
  getAllConsultation: (token)=>{
    dispatch(getAllConsultation(token));
  },
  getUserChats: (token)=>{
    dispatch(getUserChats(token));
  },
  clearActiveConsChats:()=>{
    dispatch(clearActiveConsChats());
  }
});

export const AllConsultationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllConsultationScreenComponent);