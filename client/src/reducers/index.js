import {combineReducers} from 'redux';
// as 用来改名字
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer.js';

export default combineReducers ({
    auth: authReducer,
    form: reduxForm
});
