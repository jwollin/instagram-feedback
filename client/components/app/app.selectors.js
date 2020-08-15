import { get } from 'lodash';
import { USER_AUTHENTICATION } from "../../constants/constants";

export const getUsersName = (state) => get(state, `${USER_AUTHENTICATION}.name`, '');
export const getUsername = (state) =>  get(state, `${USER_AUTHENTICATION}.username`, '');
export const getUserPassword = (state) =>  get(state, `${USER_AUTHENTICATION}.password`, '');
export const getUserAuthentication = (state) =>  get(state, `${USER_AUTHENTICATION}.authenticated`, false);
