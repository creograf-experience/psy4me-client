import { connect } from 'react-redux';
import ChooseTimeRecordPsychScreenComponent from './ChooseTimeRecordPsychScreen';

const mapStateToProps = state => ({
  userID: state.profile.userID,
});

const mapDispatchToProps = dispatch => ({
  
});

export const ChooseTimeRecordPsychScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTimeRecordPsychScreenComponent);