import {FETCH_USER} from '../actions/types.js';



export default function(state = null, action){
    //显示状态改变
    //console.log(action);
    switch(action.type){
    case FETCH_USER:
        return action.payload || false;
    default:
        return state;
    }
}
