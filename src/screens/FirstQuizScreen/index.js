import { connect } from 'react-redux';
import FirstQuizScreenComponent from './FirstQuizScreen';
import { submitQuiz } from './actions';

const mapStateToProps = state => ({
  fetching: state.firstQuiz.fetching,
  status: state.firstQuiz.status,
  errors: state.firstQuiz.errors,
  quiz: state.profile.firstQuiz,
  userID: state.profile.userID,
});

const mapDispatchToProps = dispatch => ({
  submitQuiz: (quiz) => {
    dispatch(submitQuiz(quiz));
  },
});

export const FirstQuizScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstQuizScreenComponent);
