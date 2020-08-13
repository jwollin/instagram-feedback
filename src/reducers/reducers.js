import { combineReducers } from 'redux';
import { listReducer, stringReducer, objectReducer, booleanReducer } from "@wecreatesoftware/redux-higher-order-reducers";
import {PROFILE, SPINNER, USER_AUTHENTICATION, USER_DATA, USERS_DATA} from "../constants/constants";

export const reducers = combineReducers({
   [USER_AUTHENTICATION]: objectReducer({
      reducerName: USER_AUTHENTICATION,
      initialState: {
         username: '',
         password: '',
         authenticated: false,
      }
   }),
   [USER_DATA]: objectReducer({
      reducerName: USER_DATA,
      initialState: {
         error: null,
         data: null,
      }
   }),
   [USERS_DATA]: objectReducer({
      reducerName: USERS_DATA,
      initialState: {
         error: null,
         data: []
      },
   }),
   [SPINNER]: booleanReducer({
      reducerName: SPINNER,
      initialState: false,
   })
});