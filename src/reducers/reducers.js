import { combineReducers } from 'redux';
import { listReducer, stringReducer, objectReducer, booleanReducer } from "@wecreatesoftware/redux-higher-order-reducers";

export const USER_PROFILE_DATA = 'USER_PROFILE_DATA';
export const USERNAME = 'USERNAME';
export const SPINNER = 'SPINNER';


export const reducers = combineReducers({
   [USER_PROFILE_DATA]: objectReducer({
      reducerName: USER_PROFILE_DATA,
      initialState: {
         username: '',
         password: '',
         name: '',
         authenticated: false,
      }
   }),
   [SPINNER]: booleanReducer({
      reducerName: SPINNER,
      initialState: false,
   }),
   [USERNAME]: objectReducer({
      reducerName: USERNAME,
      initialState: {
         username: ''
      }
   })
});