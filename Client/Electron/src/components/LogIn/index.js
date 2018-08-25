import LogIn from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, renewToken } from '../../actions/authActions';

const mapStateToProps = (state) => {

  return {
    renewPending: state.authReducer.renewPending,
    renewSuccess: state.authReducer.renewSuccess,
    renewError: true
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    login,
    renewToken
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);