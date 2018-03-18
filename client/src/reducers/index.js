import {combineReducers} from 'redux';
// as 用来改名字
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer.js';
import surveyReducer from './surveyReducer.js';

export default combineReducers ({
    auth: authReducer,
    form: reduxForm,
    surveys: surveyReducer
});
