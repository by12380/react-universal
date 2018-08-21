import Callback from "./component";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { loginSuccess, loginError } from '../../actions/authActions';

const mapStateToProps = (state) => {

  return {
    success: state.authReducer.success,
    error: state.authReducer.error
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    loginSuccess,
    loginError
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);