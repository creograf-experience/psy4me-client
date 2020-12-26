import { connect } from 'react-redux';
import YourPsychScreenComponent from './YourPsychScreen';
import { getPsychs, addPsychForClient } from '../ProfileScreen/actions';
import { getYourPsych, deletePsychForClient } from './actions';
import { getUserChats,setActiveChats,clearActiveChats,clearMessages } from '../../actions';

const mapStateToProps = state => ({
  psychList: state.profile.psychList,
  psychProfile: state.profilepsych.psychProfile,
  userID: state.profile.userID,
  chatList:state.chats.chatList,
  activeChat:state.chats.activeChat
});

const mapDispatchToProps = dispatch => ({
  getPsychs: (token) => {
    dispatch(getPsychs(token));
  },
  getYourPsych: (token)=>{
    dispatch(getYourPsych(token));
  },
  addPsychForClient: (couple, token) => {
    dispatch(addPsychForClient(couple, token));
  },
  deletePsychForClient: (comment, token) => {
    dispatch(deletePsychForClient(comment,token));
  },
  getUserChats: (token)=>{
    dispatch(getUserChats(token));
  },
  setActiveChats: (chat)=>{
    dispatch(setActiveChats(chat));
  },
  clearActiveChats:()=>{
    dispatch(clearActiveChats());
  },
  clearMessages: () => {
    dispatch(clearMessages())
  },
});

export const YourPsychScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(YourPsychScreenComponent);