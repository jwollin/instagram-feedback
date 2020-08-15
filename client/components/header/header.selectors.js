import { get } from 'lodash';
import { USER_AUTHENTICATION } from "../../reducers/reducers";

export const getUsersName = (state) => get(state, `${USER_AUTHENTICATION}.name`, '');
