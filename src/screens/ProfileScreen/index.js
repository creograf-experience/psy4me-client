import { connect } from 'react-redux';

import ProfileScreenComponent from './ProfileScreen';
import ConsultantSelectingScreenComponent from './ConsultantSelectingScreen';
import {
  getID,
  getProfileData,
  fetchFirstQuiz,
  fetchSecondQuiz,
  getPsychs,
  addPsychForClient,
} from './actions';
import {
  logOut,
} from '../../actions';


const mapStateToProps = state => ({
  fetching: state.profile.fetching,
  status: state.profile.status,
  errors: state.profile.status,
  userID: state.profile.userID,
  profile: state.profile.profile,
  psychList: state.profile.psychList,
});

const mapDispatchToProps = dispatch => ({
  getID: (token) => {
    dispatch(getID(token));
  },

  getProfileData: (token) => {
    dispatch(getProfileData(token));
  },

  fetchFirstQuiz: (token) => {
    dispatch(fetchFirstQuiz(token));
  },

  fetchSecondQuiz: (token) => {
    dispatch(fetchSecondQuiz(token));
  },
  getPsychs: (token) => {
    dispatch(getPsychs(token));
  },
  logOut: () => {
    dispatch(logOut());
  },
  addPsychForClient: (couple, token) => {
    dispatch(addPsychForClient(couple, token));
  },
});

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreenComponent);

export const ConsultantSelectingScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsultantSelectingScreenComponent);
