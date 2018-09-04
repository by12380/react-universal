import LogIn from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { refreshAccessToken } from '../../actions/auth0';

const mapStateToProps = (state) => {

  return {
    refreshPending: state.authReducer.refreshPending,
    refreshSuccess: state.authReducer.refreshSuccess,
    refreshError: state.authReducer.refreshError
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    refreshAccessToken
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);