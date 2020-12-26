import { connect } from 'react-redux';
import AuthenticationScreenComponent from './AuthenticationScreen';
import { connectSocket } from '../../actions';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  connectSocket: ()=>{
    dispatch(connectSocket())
  }
});

export const AuthenticationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationScreenComponent);
