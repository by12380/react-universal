import Profile from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { logout, fetchUser } from '../../actions/auth0';
import { removeSession } from '../../actions/authActions';

const mapStateToProps = (state) => {

  return {
    pending: state.userReducer.pending,
    success: state.userReducer.success,
    error: state.userReducer.error,
    user: state.userReducer.user,
    token: state.authReducer.sessionItems.accessToken
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    logout,
    fetchUser,
    removeSession
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);