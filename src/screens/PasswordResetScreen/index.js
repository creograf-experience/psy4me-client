import { connect } from 'react-redux';
import PasswordResetScreenComponent from './PasswordResetScreen';
import { sendCode, submitCode, submitNewPassword } from './actions';

const mapStateToProps = state => ({
  fetching: state.resetPW.fetching,
  status: state.resetPW.status,
  errors: state.resetPW.errors,
  token: state.resetPW.token,
});

const mapDispatchToProps = dispatch => ({
  sendCode: (phone) => {
    dispatch(sendCode(phone));
  },

  submitCode: (phone, code) => {
    dispatch(submitCode(phone, code));
  },

  submitNewPassword: (password, token) => {
    dispatch(submitNewPassword(password, token));
  },
});

export const PasswordResetScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetScreenComponent);
