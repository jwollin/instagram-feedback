import { get } from 'lodash';
import { USER_PROFILE_DATA } from "../../reducers/reducers";

export const getUsersName = (state) => get(state, `${USER_PROFILE_DATA}.name`, '');
export const getUsername = (state) =>  get(state, `${USER_PROFILE_DATA}.username`, '');
export const getUserPassword = (state) =>  get(state, `${USER_PROFILE_DATA}.password`, '');
export const getUserAuthentication = (state) =>  get(state, `${USER_PROFILE_DATA}.authenticated`, false);
