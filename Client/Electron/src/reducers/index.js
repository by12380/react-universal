import { combineReducers } from "redux";
import authReducer from './authReducer';
import userReducer from './userReducer';
import socketReducer from './socketReducer';

export default combineReducers({
    authReducer,
    userReducer,
    socketReducer
});