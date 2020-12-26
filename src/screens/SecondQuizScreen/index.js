import { connect } from 'react-redux';
import SecondQuizScreenComponent from './SecondQuizScreen';
import QuizDoneScreenComponent from './QuizDoneScreen';
// import PsychSelectionInfoScreenComponent from './containers/PsychSelectionInfoScreen';
import { submitQuiz /* , getPsychs */ } from './actions';
import { fetchSecondQuiz } from "../ProfileScreen/actions"


const mapStateToProps = state => ({
  fetching: state.firstQuiz.fetching,
  status: state.firstQuiz.status,
  errors: state.firstQuiz.errors,
  quiz: state.profile.secondQuiz,
  // psychs: state.psychs.psychs,
});

const mapDispatchToProps = dispatch => ({
  submitQuiz: (quiz) => {
    dispatch(submitQuiz(quiz));
  },
  fetchSecondQuiz: (token) => {
    dispatch(fetchSecondQuiz(token));
  },
  /* getPsychs: (token) => {
    dispatch(getPsychs(token));
  }, */
});

export const SecondQuizScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondQuizScreenComponent);

/* export const PsychSelectionInfoScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PsychSelectionInfoScreenComponent); */

export const QuizDoneScreen = QuizDoneScreenComponent;
