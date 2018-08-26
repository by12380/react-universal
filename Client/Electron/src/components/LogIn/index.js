import LogIn from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, refreshAccessToken } from '../../actions/authActions';

const mapStateToProps = (state) => {

  return {
    refreshToken: state.authReducer.sessionItems.refreshToken,
    refreshPending: state.authReducer.refreshPending,
    refreshSuccess: state.authReducer.refreshSuccess,
    refreshError: state.authReducer.refreshError,
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    login,
    refreshAccessToken
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);