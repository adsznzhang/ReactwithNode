import axios from 'axios';
import {FETCH_USER} from './types.js';


export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

//返回一个对象，拥有type属性
export const submitSurvey = (values,history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

  //navigate在前端
  history.push('/surveys');

  dispatch({type:FETCH_USER, payload: res.data});
};
