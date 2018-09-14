import Callback from "./component";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { loginSuccess, loginError, refreshTokenError } from '../../actions/authActions';
import { fetchUser } from '../../actions/auth0';

const mapStateToProps = (state) => {

  return {
    success: state.authReducer.success,
    error: state.authReducer.error,
    refreshError: state.authReducer.refreshError
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    loginSuccess,
    loginError,
    refreshTokenError,
    fetchUser
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);