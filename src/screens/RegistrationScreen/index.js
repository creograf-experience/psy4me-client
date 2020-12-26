import { connect } from 'react-redux';
import RegistrationScreenComponent from './RegistrationScreen';
import { register } from './actions';
import { connectSocket } from '../../actions';


const mapStateToProps = state => ({
  fetching: state.registration.fetching,
  status: state.registration.status,
  errors: state.registration.errors,
});

const mapDispatchToProps = dispatch => ({
  register: (phoneNumber, password) => {
    dispatch(register(phoneNumber, password));
  },
  connectSocket: ()=>{
    dispatch(connectSocket())
  }
});

export const RegistrationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationScreenComponent);
